

import React, { useState } from 'react';
import { Input, Modal, Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../hooks';
import { clearSelectedStoreId, createShop, setSelectedStoreName } from '../store/shops';
import TextError from './forms/TextError';
import WelcomeModal from './WelcomeModal';
import { clearSubscriptions } from '../store/subscriptions';

interface ShopModalProps {
    placeHolder?: string;
    isInitialShop?: boolean;
}

const ShopModal: React.FC<ShopModalProps> = ({
    placeHolder = "i.e. Beary Fun Shop",
    isInitialShop = false,
}) => {
    const auth = useAppSelector((state) => state.auth);
    const shops = useAppSelector((state) => state.shops);
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(isInitialShop);
    const [shopName, setShopName] = useState("");
    const [error, setError] = useState("");
    const shopAmount = shops.shops.length;
    const [shopRegion, setShopRegion] = useState("US");

    const regionOptions = [
        { label: 'Global', value: 'GLOBAL' },
        { label: 'United Kingdom', value: 'UK' },
        { label: 'United States', value: 'US' },
    ];

    const handleRegionChange = (e) => {
        setShopRegion(e);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setShopName("");
        setOpen(false);
    };

    const handleConditionalCancel = () => {
        if (!isInitialShop) {
            handleCancel();
        }
    };

    const handleOk = async () => {
        if (!shopName.trim()) {
            setError("Shop name cannot be empty.");
            return;
        }
        if (shops.shops.length > 0 && shops.shops.some((shop) => shop.status === "payment_pending")) {
            setError("You already have a shop with payment pending status, you cannot create a new shop until the subscription is completed.");
            return;
        }
        console.log("Clearing selected store id");
        dispatch(clearSelectedStoreId());
        console.log("Setting selected store name without a storeID", shopName.trim());
        dispatch(setSelectedStoreName(shopName.trim()));
        const payload = {
            customer_id: auth.meInfo.customer_id,
            shop_name: shopName.trim(),
            shop_region: shopRegion,
        };
        console.log('Creating shop on shop modal, setted selected store name without retriving ID', shopName);
        await dispatch(createShop(payload));
        dispatch(clearSubscriptions());
        setShopName("");
        setOpen(shopAmount < shops.shops.length);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <>
            {!isInitialShop && <button
                className="automation-add-new-button-bg hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition duration-300 ease-in-out"
                onClick={handleOpen}
            >
                Add New Shop
            </button>}
            <Modal
                open={open}
                footer={null}
                onCancel={handleConditionalCancel}
            >
                <h1 className="text-2xl font-bold text-black mb-3">Create New Shop</h1>
                <h3 className="text-lg font-semibold text-black mb-2">Shop Name</h3>
                <Input 
                    size="large" 
                    placeholder={placeHolder}
                    value={shopName}
                    onChange={e => {
                        setShopName(e.target.value);
                        setError("");
                    }}
                />
                {error && <TextError>{error}</TextError>}
                <h3 className="text-lg font-semibold text-black mb-3 mt-2">Shop Region</h3>
                <Select
                    size="large" // Ant Design uses 'large' instead of 'lg'
                    onChange={(value) => handleRegionChange(value)} // Ant Design passes the value directly, not the event
                    placeholder="Selected Region" // Equivalent to the label
                    value={shopRegion}
                    style={{ minWidth: 200 }} // Optional, adjust width if needed
                    >
                    {regionOptions.map((option) => (
                        <Select.Option key={option.value} value={option.value}>
                        {option.label}
                        </Select.Option>
                    ))}
                </Select>
                <div className={`flex ${isInitialShop ? 'justify-end' : 'justify-between'} mb-4 w-full mt-8`}>
                    {!isInitialShop && <button
                        className=" bg-black hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline"
                        onClick={handleCancel}
                    >
                        Back
                    </button>}

                    <button
                        className="automation-add-new-button-bg hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition duration-300 ease-in-out"
                        onClick={handleOk}
                    >
                        Create Shop
                    </button>
                </div>
            </Modal>
            <WelcomeModal isInitialOpen={isInitialShop} />
        </>
    );
};

export default ShopModal;