

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsLightningChargeFill } from "react-icons/bs";
import { MdAddShoppingCart } from "react-icons/md";
import { GrLineChart, GrHelpBook } from "react-icons/gr";
import { PiLightbulbFilamentFill } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa6";
import { FaUsers } from 'react-icons/fa';
import { HiOutlineLogout } from "react-icons/hi";
import { RiUser2Fill } from "react-icons/ri";
import { IoMdMailUnread } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { changeCustomerId, logout } from "../store/auth";
import { PATH } from "../constants/path";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Modal } from 'antd';
import SidebarSelector from "./SidebarSelector";
import { adminChangedCustomer, setSelectedStoreId } from "../store/shops";
import { FaBrain } from "react-icons/fa";
import { resetAssistantTables } from "../store/assistant";
import { resetMessagedCreators } from "../store/statistics";
import { clearSubscriptions } from "../store/subscriptions";

const menuItems = [
  {
    id: "shopmanagement",
    label: "Manage Shops",
    path: "/shopmanagement",
    icon: <MdAddShoppingCart size={20} />,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: <GrLineChart size={20} />,
  },
  {
    id: "automations",
    label: "Automations",
    path: "/automations",
    icon: <BsLightningChargeFill size={20} />,
  },
  {
    id: "aiassistant",
    label: "AI Assistant",
    path:"/aiassistant",
    icon: <FaBrain size={20} />,
    tier: "beta"
  },
  {
    id: "emailautomations",
    label: "Email Automations",
    path: "/email-automations",
    icon: <IoMdMailUnread size={20} />,
  }
];

const crmItems = [
  {
    id: "mycreators",
    label: "My Creators",
    path: "/my-creators",
    icon: <FaRegUser size={20} />,
  },
  {
    id: "groups",
    label: "Groups",
    path: "/groups",
    icon: <FaUsers size={20} />,
  }
]

const Sidebar: React.FC = () => {
  const pathName = useLocation().pathname;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const shops = useAppSelector((state) => state.shops);
  const admin = useAppSelector((state) => state.admin);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = async () => {
    dispatch(logout());
    await navigate(PATH.auth.login, {replace: true});
  };

  const handleNavigate = (getMenuItem: any) => {
    navigate(getMenuItem.path);
  };

  const handleStoreIdChange = (value:any) => {
    dispatch(setSelectedStoreId(value)); // To change the current shop id
    dispatch(resetAssistantTables()); // To signal that the store id changed for the assistant store
    dispatch(resetMessagedCreators()); // To signal that the store id changed for the statistics store
  }

  const handleCustomerChange = (value: any) => {
    const customersList = admin.customersList;
    const customer = customersList.find((customer) => customer.customer_id === value);
    let customer_id = value;
    let stripe_customer_id = null;
    if (!customer){
      return;
    }
    else {
      if (customer.stripe_customer_id === null) {
        return;
      }
      stripe_customer_id = customer.stripe_customer_id;
    }
    const payload = {
      customer_id,
      stripe_customer_id
    }
    console.log("Changing selected customer. New customer id:", customer_id, "New stripe customer id:", stripe_customer_id);
    dispatch(changeCustomerId(payload)); // To change the current customer id
    dispatch(clearSubscriptions()); // To signal that the customer id changed for the assistant store
    dispatch(adminChangedCustomer()); // To set selected shopid to null and reset the shop list
  }
  
  return (
    <div className="flex-shrink-0 w-64 bg-white flex flex-col relative rounded-r-xl shadow-md space-between ">
      {/* Company logo */}
      <div className="overflow-y-auto overflow-x-hidden">
        <div className="p-4 flex justify-center items-center mt-10">
        <img
          src="/reacherlogo.png"
          alt="Reacher Logo"
          width="150"
          height="50"
          onClick={() => navigate(PATH.shopManagement)}
          style={{ cursor: 'pointer' }}  // Optional: To indicate it's clickable
        />
        </div>
        {/* Selectors */}
        { !admin.isLoading && admin.isAdmin &&
          <div className="flex items-center justify-center mb-4 px-4">
              <SidebarSelector
                options={admin.customersList.map((customer) => ({ value: customer.customer_id, label: customer.name }))} 
                value={parseInt(auth.meInfo.customer_id, 10)}
                onChange={(value) => handleCustomerChange(value)}
                placeHolder="Choose Customer1"
               />
          </div>

        }
        { shops.loadSuccess && shops.selectedStoreId &&
          <div className="flex items-center justify-center mb-4 px-4">
              <SidebarSelector
                options={shops.shops.map((shop) => ({ value: shop.shop_id, label: shop.shop_name }))} 
                value={shops.selectedStoreId}
                onChange={(value) => handleStoreIdChange(value)}
                placeHolder="Choose Shop"
               />
          </div>
        }
        {/* Navigation buttons */}
        <nav className="flex flex-col items-center space-y-2 mx-2">
          {menuItems.filter(menuItem => 
            !menuItem.tier || (auth.meInfo?.tier && menuItem.tier === auth.meInfo.tier)
          ).map((menuItem, index) => (
            <div
              onClick={() => handleNavigate(menuItem)}
              key={`menu-items-${index}`}
              id={`menu-items-${index}`}
              className={`w-full text-sm rounded-md group relative cursor-pointer flex items-center gap-6 py-3 px-8 duration-300 ease-in-out hover:menuItem-active
            ${
              pathName === "/"
                ? menuItem.id === "dashboard" && "menuItem-active"
                : (pathName === menuItem.path ? "menuItem-active": "")
            }
            `}
            >
              {menuItem.icon}
              {menuItem.label}
            </div>
          ))}
        </nav>
        <div>
          <div className="mt-16 mb-2 text-black/50 font-semibold px-8">
            <h1>CRM</h1>
          </div>
          {crmItems.map((value) => (
            <Link
              id={`crm-${value.path}`}
              to={value.path}
              className={`w-full text-sm rounded-md group relative cursor-pointer flex items-center gap-6 py-3 px-8 duration-300 ease-in-out hover:menuItem-active mx-2 ${pathName === value.path ? "menuItem-active": ""}`}
            >
              {value.icon}
              {value.label}
            </Link>
          ))}
        </div>
        <div className="mt-16 mb-2 text-blue-500 font-semibold px-8">
          <h1>Support</h1>
        </div>
        {/* update later to support button clicking */}
        <Link
          to="https://reacherapp.com/contact"
          target="_blank"
          className={`w-full text-sm rounded-md group relative cursor-pointer flex items-center gap-6 py-3 px-8 duration-300 ease-in-out hover:menuItem-active mx-2`}
        >
          <PiLightbulbFilamentFill size={20} />
          Contact Reacher
        </Link>
        {/* Modal */}
        <button
          className="w-full text-sm rounded-md group relative cursor-pointer flex items-center gap-6 py-3 px-8 duration-300 ease-in-out hover:menuItem-active mx-2"
          onClick={openModal}
        >
          <GrHelpBook size={20} />
          Tutorial
        </button>
        <Modal
          open={isModalOpen}
          footer={null}
          onCancel={closeModal}
          width={640}
          transitionName=""
          maskClosable={false}
        >
          <h1 className="text-2xl font-bold text-black mb-3">Welcome to Tutorials!</h1>
          <h3 className="text-lg font-semibold text-black mb-4">
              You can find our tutorial video below. If you have any questions, please contact us at <span className='text-blue-700'>team@reacherapp.com</span> with your customer ID.
          </h3>
          <div className="flex justify-center mb-4">
              <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/VsPPXJKp-Vk?si=LpxM8VpW8Lo1waq8"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-64 sm:h-80 md:h-96 lg:h-[450px]"
              ></iframe>
          </div>
          <div className={`flex justify-end mb-4 w-full mt-4`}>
              <button
                className="automation-add-new-button-bg hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition duration-300 ease-in-out"
                onClick={closeModal}
              >
                OK!
              </button>
          </div>
        </Modal>
        {/* My Account */}
        <Link
          to="/myaccount"
          className={`w-full text-sm rounded-md group relative cursor-pointer flex items-center gap-6 py-3 px-8 duration-300 ease-in-out hover:menuItem-active mx-2`}
        >
          <RiUser2Fill size={20} />
          My Account
        </Link>

      </div>
      <div className="mt-auto border-gray-200 mx-6">
        {auth.meInfo?.email && (
          <Link to="/myaccount">
          <div className={`w-full py-3 px-8 duration-300 flex flex-col`}>
            <span className="font-bold text-md text-blue-500">{auth.meInfo?.name}</span>
            <span className="text-sm text-gray-800">{auth.meInfo?.email}</span>
          </div>
          </Link>
        )}
        <div
          className={`w-full border-t text-sm text-red-500 group relative cursor-pointer flex items-center gap-6 py-3 px-8 duration-300 ease-in-out hover:menuItem-active `}
          onClick={handleLogout}
        >
          <HiOutlineLogout size={20} />
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
