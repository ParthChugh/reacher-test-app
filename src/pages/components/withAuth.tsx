

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLocalStorage } from "../helpers";
import { LOCAL_STORAGE_KEY } from "../constants";
import Sidebar from "../components/Sidebar";
import { getMeInfo } from "../store/auth";
import { useAppDispatch, useAppSelector } from "../hooks";
import { PATH } from "../constants/path";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Wrapper = (props: P) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        const access_token = getLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
        const refresh_token = getLocalStorage(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
        //const token = localStorage.getItem('accessToken');
        if (!(access_token || refresh_token)) {
          console.log("No token found, redirecting to login page");
          navigate(PATH.auth.login, {replace: true});
        } 
        else if (auth.meInfo.admin_password !== undefined && auth.meInfo.admin_password !== "" && auth.meInfo.customer_id) { // If the user is admin and there is a current customer_id
          setIsLoading(false);
        }
        else {
          await dispatch(getMeInfo()); // Verify token validity and get user info
          setIsLoading(false);
        }
      };

      checkAuth();
    }, []);

    // If user authenticated, render the wrapped component
    if (isLoading || auth.loading) return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
      </div>
    );
    
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <WrappedComponent {...props} />
            </div>
          </main>
        </div>
      </div>
    );
  };

  return Wrapper;
};

export default withAuth;
