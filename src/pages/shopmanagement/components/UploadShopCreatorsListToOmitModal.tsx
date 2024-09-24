// This component is to edit an existing shop name, given its old name and id.
// It will open a modal to edit the shop name.
// It will update the shop name in the database and the store slice state if it is the currently selected shop.


import React, {  useState } from 'react';
import {  Modal } from 'antd';
import Papa from 'papaparse';
import { MdTipsAndUpdates } from 'react-icons/md';
import { Upload, message } from "antd";
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../hooks';
import {  uploadCreatorsListToOmit } from '../../store/shops';
const { Dragger } = Upload;


interface UploadShopCreatorsListToOmitModalProps {
    placeHolder?: string;
    shopId: number;
    oldShopName: string;
    creators_to_omit: string[];
  }

const UploadShopCreatorsListToOmitModal: React.FC<UploadShopCreatorsListToOmitModalProps> = ({
    shopId,
    oldShopName,
    creators_to_omit,
    }) => {
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [creatorsToOmitFile, setCreatorsToOmitFile] = useState<File | null>(null);
    const [omitError, setOmitError] = useState<string | null>(null);
    const [creatorsToOmitList, setCreatorsToOmitList] = useState<string[]>(creators_to_omit); // ToDo add initial list as props

    const beforeUpload = (
        file: File,
        setFile: React.Dispatch<React.SetStateAction<File | null>>,
        setList: React.Dispatch<React.SetStateAction<string[]>>,
        setError: React.Dispatch<React.SetStateAction<string | null>>,
      ) => {
        setFile(null);
        setList([]);
        handleFileChange(file, setFile, setList, setError, );
        return false; // Return false to prevent automatic upload
    };

    const handleFileChange = (
        file: File,
        setFile: React.Dispatch<React.SetStateAction<File | null>>,
        setList: React.Dispatch<React.SetStateAction<string[]>>,
        setError: React.Dispatch<React.SetStateAction<string | null>>,
      ) => {
        setError(null); // Clear any previous error
        Papa.parse(file, {
          header: true,
          complete: (results) => {
            const names = results.data.map((row: any) => row.creator_name).filter((name: string) => name);
            if (names.length === 0) {
              setError("The file structure is incorrect. Make sure it contains a 'creator_name' column.");
            } else {
              setList(names);
            }
          },
          error: (error) => {
            setError(`File parsing failed: ${error.message}`);
            message.error(`File parsing failed: ${error.message}`);
          }
        });
        setFile(file);
        return false; // Prevent automatic upload
    };

    const handleFileRemove = (
        setFile: React.Dispatch<React.SetStateAction<File | null>>,
        setList: React.Dispatch<React.SetStateAction<string[]>>,
        setError: React.Dispatch<React.SetStateAction<string | null>>,
      ) => {
        setFile(null);
        setList([]);
        setError(null);
    };

    const handleDeleteList = (
        setFile: React.Dispatch<React.SetStateAction<File | null>>,
        setList: React.Dispatch<React.SetStateAction<string[]>>,
      ) => {
        setFile(null);
        setList([]);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        // handleFileRemove(setCreatorsToOmitFile, setCreatorsToOmitList, setOmitError);
        setOpen(false);
    };

    const handleOk = async () => {
        setLoading(true);
        console.log('Clicked OK button');
        console.log('Shop ID:', shopId);
        console.log('Creators to omit:', creatorsToOmitList);
        // Call the API to update the creators to omit list
        const payload = {
            shop_id: shopId,
            creators_to_omit: creatorsToOmitList,
        };
        await dispatch(uploadCreatorsListToOmit(payload));
        setLoading(false);
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleDeleteOutlined = async () => {
        setLoading(true);
        console.log("Delete button clicked");
        setCreatorsToOmitList([]);
        setCreatorsToOmitFile(null);
        setOmitError(null);
        await dispatch(uploadCreatorsListToOmit({
            shop_id: shopId,
            creators_to_omit: []
        }));
        setLoading(false);
    }

  return (
    <>
        <button
            className="bg-blue-400 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-md transition duration-300 ease-in-out"
            onClick={handleOpen}
        >
            Upload Creators
        </button>
        <Modal
            open={open}
            footer={null}
            onCancel={handleCancel}
        >
        <h1 className="text-2xl font-bold text-black mb-3">Upload Creators To Omit</h1>
        <h3 className="text-lg font-semibold text-black mb-2">Uploading creators for the shop: <span className='text-blue-700' > {oldShopName} </span></h3>
        <label className="block text-sm font-medium text-black mb-2 flex items-center">
            <MdTipsAndUpdates className="mr-2" /> Tips and Tricks
          </label>
          <div className="bg-white border border-ant-input-border rounded-lg col-span-1 mb-5 inline-block">
            <span className="flex text-md text-black italic before:content-['●'] before:mr-2 p-2 mr-2">
              Click&nbsp;<a href="https://docs.google.com/spreadsheets/d/1QNNMFCO_IxfRWVmYPZSRjaZWYS0gG0peOgDcBm6u8Ws/edit?gid=0#gid=0" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">here</a>&nbsp;to see the sample file. Please submit your files accordingly.
            </span>
            <span className="flex text-md text-black italic before:content-['●'] before:mr-2 p-2 mr-2">
              Below, you can find an image of the sample file format:
            </span>
            <div className="ml-4">
            <img
              src="/SampleCreatorNameSheet.png"
              alt="Sample File Format"
              style={{ width: '150px', height: '300px' }}
            />
            </div>
          </div>
        <label className="block text-blue-700 text-sm font-bold mb-2" htmlFor="creatorsToOmit">
        Creators to Omit (CSV only)
        </label>
        <>
            <Dragger
                name="creatorsToOmit"
                accept=".csv"
                multiple={false}
                beforeUpload={(file) => beforeUpload(file, setCreatorsToOmitFile, setCreatorsToOmitList, setOmitError)}
                onRemove={() => handleFileRemove(setCreatorsToOmitFile, setCreatorsToOmitList, setOmitError)}
                fileList={creatorsToOmitFile ? [creatorsToOmitFile] : []}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            >
                <p className="ant-upload-drag-icon">
                <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag CSV file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single CSV file upload. The file should start with "creator_name".</p>
            </Dragger>
            {omitError && (
                <div className="mt-2 text-red-600">
                {omitError}
                </div>
            )}
            {creatorsToOmitList.length > 0 && (
                <>
                <div className="mt-4 max-h-40 overflow-auto">
                    <h3 className="text-md font-semibold">Creators to Omit:</h3>
                    <ul className="list-disc pl-5">
                    {creatorsToOmitList.map((name, index) => (
                        <li key={index}>{name}</li>
                    ))}
                    </ul>
                </div>
                <button
                    type="button"
                    className="mt-2 bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                    onClick={() => handleDeleteOutlined()}
                >
                    <DeleteOutlined />
                </button>
                </>
            )}
        </>
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
            {loading ? (
                <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
                    </svg>
                    Uploading...
                </div>
            ) : "Upload"}
            </button>
        </div>
      </Modal>
    </>
  );
};

export default UploadShopCreatorsListToOmitModal;