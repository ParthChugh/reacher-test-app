// This component is to edit an existing shop name, given its old name and id.
// It will open a modal to edit the shop name.
// It will update the shop name in the database and the store slice state if it is the currently selected shop.


import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { archiveShop } from '../../store/shops';
import { RiDeleteBin2Line } from 'react-icons/ri';

interface DeleteShopModalProps {
    shopId: number;
    oldShopName: string;
}

const DeleteShopModal: React.FC<DeleteShopModalProps> = ({
    shopId,
    oldShopName,
    }) => {
    const shops = useAppSelector((state) => state.shops);
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
    const [currentlySelected, setCurrentlySelected] = useState(false);

    useEffect(() => {
        setCurrentlySelected(shops.selectedStoreId === shopId);
    }, [shops.selectedStoreId, shopId]);

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const handleOk = async () => {
        console.log("Archiving shop with shop id ", shopId, " on DeleteShopModal");
        await dispatch(archiveShop({shop_id: shopId})); 
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

  return (
    <>
        <button
            className="flex items-center justify-center p-2 bg-red-400 hover:bg-red-600 text-white font-semibold rounded-md transition duration-300 ease-in-out"
            onClick={handleOpen}
        >
            <RiDeleteBin2Line size={24} />
        </button>
        <Modal
            open={open}
            footer={null}
            onCancel={handleCancel}
        >
        <h1 className="text-2xl font-bold text-black mb-3">Delete Shop</h1>
        {currentlySelected ? <h3 className='text-lg font-semibold text-red-700 mb-2'> You can not delete the currently viewed shop. Please select a new shop first and try again!</h3> : <h3 className="text-lg font-semibold text-black mb-2">Deleting <span className='text-blue-700' > {oldShopName} </span></h3>}

        <div className={`flex justify-between mb-4 w-full mt-8`}>
            <button
              className="bg-black hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline"
              onClick={handleCancel}
            >
              Back
            </button>

            <button
              className={`
              ${
                currentlySelected ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-400 hover:bg-red-600'
              } text-white font-semibold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline`}            
              onClick={handleOk}
              disabled={currentlySelected}
            >
              Delete
            </button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteShopModal;