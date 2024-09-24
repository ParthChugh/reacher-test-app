// This component is to edit an existing shop name, given its old name and id.
// It will open a modal to edit the shop name.
// It will update the shop name in the database and the store slice state if it is the currently selected shop.


import React, { useState } from 'react';
import { Input, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSelectedStoreName, updateShopName } from '../../store/shops';
import TextError from '../../components/forms/TextError';

interface UpdateShopNameModalProps {
    placeHolder?: string;
    shopId: number;
    oldShopName: string;
  }

const UpdateShopNameModal: React.FC<UpdateShopNameModalProps> = ({
    placeHolder = "i.e. Beary Fun Shop",
    shopId,
    oldShopName,
    }) => {
    const shops = useAppSelector((state) => state.shops);
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
    const [shopName, setShopName] = useState("");
    const [error, setError] = useState("");

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setShopName("");
        setOpen(false);
    };

    const handleOk = async () => {
        if (!shopName.trim()) {
            setError("Shop name cannot be empty.");
            return;
        }
        if (shops.selectedStoreId === shopId) {
            console.log("Name of the selected shop will be changed");
            dispatch(setSelectedStoreName(shopName.trim()));
        }
        console.log("Updating shop name, ", shopName.trim(), " with shop id ", shopId, " on UpdateShopNameModal");
        await dispatch(updateShopName({ shop_id: shopId, shop_name: shopName.trim() }));
        setShopName(""); 
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

  return (
    <>
        <button
            className="bg-blue-400 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-md transition duration-300 ease-in-out"
            onClick={handleOpen}
        >
            Edit Name
        </button>
        <Modal
            open={open}
            footer={null}
            onCancel={handleCancel}
        >
        <h1 className="text-2xl font-bold text-black mb-3">Edit Shop Name</h1>
        <h3 className="text-lg font-semibold text-black mb-2">Editing <span className='text-blue-700' > {oldShopName} </span> Name </h3>
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
        <div className={`flex justify-between mb-4 w-full mt-8`}>
            <button
              className=" bg-black hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline"
              onClick={handleCancel}
            >
              Back
            </button>

            <button
              className="bg-blue-400 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-md transition duration-300 ease-in-out"
              onClick={handleOk}
            >
              Edit
            </button>
        </div>
      </Modal>
    </>
  );
};

export default UpdateShopNameModal;