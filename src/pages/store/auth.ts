 

import { setLocalStorage, thunkAction } from '../helpers';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import clientService from '../helpers/client';
import { Api } from '../constants/api';
import { LOCAL_STORAGE_KEY } from '../constants';

interface MeInfo {
	id: string;
	name: string;
	email: string;
	customer_id: string;
	admin_password: string;
	tier: string;
	stripe_customer_id: string;
}

const initialState = {
	isLogin: false,

	loading: false,

	invalidLogin: false,

	meInfo: {} as MeInfo,
};

const AuthSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		resetInvalidLogin(state) {
			state.invalidLogin = false;

			return state;
		},
		logout(state) {
			localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
			localStorage.removeItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
			return state;
		},
		clearMeInfo(state) {
			state.meInfo = {} as any
			return state;
		},
		changeCustomerId(state, action) {
			state.meInfo.customer_id = action.payload.customer_id;
			state.meInfo.stripe_customer_id = action.payload.stripe_customer_id;
			return state;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(postLogin.fulfilled, (state, action) => {
			state.loading = false;
			state.isLogin = true;
			state.meInfo = {} as MeInfo;
			setLocalStorage(
				LOCAL_STORAGE_KEY.ACCESS_TOKEN,
				action.payload?.access_token,
			);
			setLocalStorage(
				LOCAL_STORAGE_KEY.REFRESH_TOKEN,
				action.payload?.refresh_token,
			);
			return state;
		});
		builder.addCase(getMeInfo.fulfilled, (state, action) => {
			state.loading = false;
			state.isLogin = true;
			state.meInfo = action.payload;
			return state;
		});
		builder.addCase(postLogin.rejected, (state, action) => {
			state.loading = false;

			// @ts-ignore
			if (action.payload?.message === 'error.inactiveEmail') {
				state.invalidLogin = true;
			}

			return state;
		});
		builder.addMatcher(
			isAnyOf(
				postLogin.pending,
				getMeInfo.pending,
				postRefreshToken.pending,
			),
			(state) => {
				state.loading = true;

				return state;
			},
		);
		builder.addMatcher(
			isAnyOf(
				getMeInfo.rejected,
				postRefreshToken.rejected,
			),
			(state, payload: any) => {
				state.loading = false;

				if (payload?.payload?.statusCode === 401) {
					state.isLogin = false;
					state.meInfo = {} as MeInfo;
					localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
					localStorage.removeItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
				}

				return state;
			},
		);
	},
});

export const postLogin = createAsyncThunk(
	'auth/login',
	thunkAction((payload: any) => {
		return clientService.post(Api.auth.login, payload);
	}),
);


export const getMeInfo = createAsyncThunk(
	'auth/getMeInfo',
	thunkAction(async (_, { dispatch }) => {
		const { data } = await clientService.post(Api.auth.me, );
		return data;
	}),
);

export const postRefreshToken = createAsyncThunk('auth/postRefreshToken', thunkAction(async (param: any) => {
	return await clientService.post(Api.auth.refreshToken, param);
}));


export const { resetInvalidLogin, logout, clearMeInfo, changeCustomerId } = AuthSlice.actions;
export default AuthSlice.reducer;
