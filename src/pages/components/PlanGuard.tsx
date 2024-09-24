
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import withAuth from './withAuth';
import withShop from './withShop';
import { useAppSelector } from '../hooks';

const PlanGuard = ({ children }) => {
  const navigate = useNavigate();
  const shops = useAppSelector((state) => state.shops);

  // Logic to determine if the user has a valid plan
  const selectedShop = shops.shops.find(shop => shop.shop_id === shops.selectedStoreId);
  const userHasPlan = !(selectedShop && selectedShop.status === "payment_pending");

  useEffect(() => {
    if (!userHasPlan) {
      navigate('/select-plan', { replace: true });
    }
  }, [userHasPlan]);

  return userHasPlan ? children : null;
};

export default withAuth(withShop(PlanGuard));