

import axios from 'axios';
import { getLocalStorage, setLocalStorage } from '../helpers';
import { LOCAL_STORAGE_KEY } from '../constants';
import {jwtDecode}  from "jwt-decode"; // Corrected import for jwt-decode
import dayjs from 'dayjs';

interface IDecoded {
  sub: string;
  iat: number;
  exp: number;
}

const baseURL = "https://reacher-server-staging.redbeach-f212be71.centralus.azurecontainerapps.io/"

console.log('development status: ', process.env.NODE_ENV);
console.log('baseURL', baseURL);

const clientService = axios.create({
  baseURL,
});

clientService.interceptors.request.use((config) => {
  const token = getLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // Only set content-type if it's not already set (FormData will set its own content-type)
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
  }
  return config;
});

clientService.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const originalRequest = error.config;
      const refreshToken = getLocalStorage(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
      const { logout, postRefreshToken } = require("../store/auth");
      const store = require("../store");

      if (!refreshToken) {
        store.dispatch(logout());
      } else {
        const decoded: IDecoded = jwtDecode(refreshToken);
        if (decoded.exp && dayjs.unix(decoded.exp).isAfter(dayjs())) {

          const res = await store.dispatch(postRefreshToken({ refreshToken })).unwrap();
          if (res && res.code === 200) {
            clientService.defaults.headers.common["Authorization"] = `Bearer ${res.accessToken}`;
            setLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN, res.accessToken);
            originalRequest.headers['Authorization'] = `Bearer ${res.accessToken}`;
            return clientService(originalRequest);
          } else {
            store.dispatch(logout());
          }
        } else {
          store.dispatch(logout());
        }
      }
    }
    return Promise.reject(error);
  }
);

export default clientService;
