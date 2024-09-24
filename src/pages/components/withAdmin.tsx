

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getAllCustomers, setAdmin } from "../store/admin";

const withAdmin = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Wrapper = (props: P) => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);
    const admin = useAppSelector((state) => state.admin);

    useEffect(() => {
        if (!auth.loading && auth.isLogin && auth.meInfo.customer_id) {
          if (auth.meInfo.admin_password !== undefined && auth.meInfo.admin_password !== "" && !admin.isAdmin ){
                console.log("Setting admin from withAdmin", auth.meInfo.admin_password);
                dispatch(setAdmin(true));
            } else if(admin.isAdmin && !admin.isLoading && !admin.customerListSuccess){
                console.log("Fetching customers list from withAdmin");
                dispatch(getAllCustomers({ password: auth.meInfo.admin_password}));
            }
        }
    }, [admin.isAdmin]);
    
    return (
      <div>
        <WrappedComponent {...props} />
      </div>
    );
  };

  return Wrapper;
};

export default withAdmin;
