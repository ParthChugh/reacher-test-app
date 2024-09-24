// This wrapper will make sure there is a selectedShopId before rendering the component if it is already set in session storage.
// Moreover, this component will decide whether to open the shop modal or not based on the shops slice state.
// ToDo: After a refresh, it is capable of setting the selected storeID, but it lacks about the selected store name.


import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getShopsList, setSelectedStoreId } from "../store/shops";
import ShopModal from "./ShopModal";

const withShop = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Wrapper = (props: P) => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);
    const shops = useAppSelector((state) => state.shops);
    const [initialShop, setInitialShop] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        const tempShopId = localStorage.getItem('tempShopId');
        if (tempShopId) {
          await dispatch(getShopsList({ customer_id: auth.meInfo.customer_id }));
          dispatch(setSelectedStoreId(parseInt(tempShopId, 10)));
          console.log("Set selected store id from tempShopId", tempShopId);
          // Don't remove tempShopId here
        } else {
          const storedStoreIdStr = sessionStorage.getItem('selectedStoreId');
          if (storedStoreIdStr !== undefined && storedStoreIdStr !== null) {
            try {
              const storedStoreId = JSON.parse(storedStoreIdStr);
              if (storedStoreId !== null) {
                await dispatch(getShopsList({ customer_id: auth.meInfo.customer_id }));
                dispatch(setSelectedStoreId(storedStoreId));
                console.log("Got selected store id from session storage", storedStoreId);
              }
            } catch (error) {
              console.error("Error parsing JSON from sessionStorage", error);
            }
          }
        }
      }

      if (!auth.loading && auth.isLogin && auth.meInfo.customer_id && !shops.isFetching && (!shops.loadSuccess || !shops.creatorsLoadSuccess)) {
        console.log("Fetching shops list from withShop", auth.meInfo.customer_id);
        const payload = {
          customer_id: auth.meInfo.customer_id,
        };
        dispatch(getShopsList(payload));
      }
      else if(auth.isLogin && !shops.isFetching && shops.shops.length !== 0 && !shops.selectedStoreId && !shops.selectedStoreName) {
        console.log("Setting selected store id as the first shop from withShop", shops.shops[0].shop_id);
        dispatch(setSelectedStoreId(shops.shops[0].shop_id));
      }
      else if(auth.isLogin && !shops.isFetching && shops.shops.length !== 0 && !shops.selectedStoreId && shops.selectedStoreName) {
        console.log("Setting selected store id with given name from withShop", shops.selectedStoreName);
        dispatch(setSelectedStoreId(shops.shops.find((shop) => shop.shop_name === shops.selectedStoreName)?.shop_id));
      }
      else if(auth.isLogin && !shops.isFetching && shops.shops.length === 0) {
        console.log("Initial shop modal will be opened from withShop");
        setInitialShop(true);
      }

      fetchData();
    }, [auth, shops.loadSuccess, shops.creatorsLoadSuccess]);

    return (
      <div>     
        <WrappedComponent {...props} />
        { initialShop && <ShopModal isInitialShop={true} /> }
      </div>
    );
  };

  return Wrapper;
};

export default withShop;