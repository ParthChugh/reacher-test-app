import React, { useState } from 'react';
import { Card, Button, message } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import AddToListAntD from './AddToListAntD';
import TextField from '../../components/forms/TextField';
import CustomFileInput from './CustomFileInput';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { removeContentGuideSetting, updateContentGuideSetting } from '../../store/assistant';

interface ProductSpecificContentGuideProps {
    index: number;
    guide: any;
    removeContentGuide: (index: number) => void;
    // handleAddContentGuide: (index: number, field: string, value: string) => void; Will be used if batch upload is implemented
    uploadProps: UploadProps;
}

const ProductSpecificContentGuide: React.FC<ProductSpecificContentGuideProps> = ({
    index,
    guide,
    removeContentGuide,
    // handleAddContentGuide, 
    uploadProps
}) => {
    const [productIDs, setProductIDs] = useState(guide.productIDs);
    const [contentGuide, setContentGuide] = useState(guide.contentGuide);
    const [previousFileName, setPreviousFileName] = useState(guide.file_name);
    const [saveContentGuideEnabled, setSaveContentGuideEnabled] = useState(false);
    const [file, setFile] = useState(null);
    const [contentGuideActionStatus, setContentGuideActionStatus] = useState("idle");
    const [productIdEditted, setProductIdEditted] = useState(false);
    const [previousProductIDs, setPreviousProductIDs] = useState(guide.productIDs);
    const shops = useAppSelector((state) => state.shops);
    const dispatch = useAppDispatch();

    const handlePreviouslyUploadedFileDelete = () => {
        console.log("Previously uploaded file deleted");
        setPreviousFileName(null);
        setSaveContentGuideEnabled(true);
    };

    const handleProductIDsChange = (value) => {
        setProductIDs(value);
        console.log("Product IDs: ", value);
        setSaveContentGuideEnabled(true);
        setProductIdEditted(true);
    };

    const handleFileChange = (event) => {
        const newFile = event.target.files[0];
        setFile(newFile);
        console.log("File: ", newFile);
        setSaveContentGuideEnabled(true);
    };

    const handleDeleteFile = () => {
        setFile(null);
        console.log("File deleted");
        setSaveContentGuideEnabled(true);
    };

    const handleContentGuideMessageChange = (value:string) => {
        setContentGuide(value);
        console.log("Content Guide Message: ", value, "with index: ", index);
        setSaveContentGuideEnabled(true);
    };

    const handleContentGuideSave = async () => {
        setContentGuideActionStatus("saving");
    
        const formData = new FormData();
        formData.append("shop_id", shops.selectedStoreId.toString());
    
        const productContentGuide = {
            product_id_list: productIDs || [],
            file_name: file ? file.name : "",
            message: contentGuide || "",
        }
    
        formData.append("product_content_guide", JSON.stringify(productContentGuide));
    
        if (file) {
            formData.append("file", file);
        }
    
        console.log("Default Content Guide saving FormData:", productContentGuide);

        if (contentGuide === "") {
            message.error("Please fill in the content guide before saving");
            setContentGuideActionStatus("idle");
            return;
        }
        if (productIDs.length === 0) {
            message.error("Please add at least one product ID before saving");
            setContentGuideActionStatus("idle");
            return;
        }

        console.log("Product ID change detected: ", productIDs, previousProductIDs);

        if (productIdEditted && previousProductIDs.length > 0) {
            handleContentGuideRemove(previousProductIDs, true);
        }
    
        try {
            await dispatch(updateContentGuideSetting(formData));
            console.log("Default Content Guide saved:", message);
            setSaveContentGuideEnabled(false);
            setPreviousProductIDs(productIDs);
            setProductIdEditted(false);
        } catch (error) {
            console.error("Error saving Default Content Guide:", error);
            setSaveContentGuideEnabled(true);
        } finally {
            setContentGuideActionStatus("idle");
            setPreviousFileName(file ? file.name : "");
            setFile(null);
        }
    };

    const handleContentGuideRemove = async (value, deleteBackground) => {
        if (!deleteBackground) {
            setContentGuideActionStatus("deleting");
        }
        
        const formData = new FormData();
        formData.append("shop_id", shops.selectedStoreId.toString());
        formData.append("product_id_list", JSON.stringify(value));

        console.log("Removing content guide with FormData:", formData);

        try {
            await dispatch(removeContentGuideSetting(formData));
            console.log("Default Content Guide removed:", message);
            setSaveContentGuideEnabled(false);
            if(!deleteBackground){
                console.log("Removing content guide with index: ", index);
                removeContentGuide(index); // This will remove the content guide from UI
            }
        } catch (error) {
            console.error("Error removing Default Content Guide:", error);
            setSaveContentGuideEnabled(true);
        } finally {
            setContentGuideActionStatus("idle");
        }
    };

    return (
        <Card key={index} className="mb-8 bg-blue-50 rounded-xl shadow-lg transition duration-300 ease-in-out hover:shadow-xl hover:scale-105 relative">
            <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={() => handleContentGuideRemove(productIDs, false)}
                className="absolute top-2 right-2"
            />
            <h6 className="font-semibold text-md text-blue-600 mb-4">Add New Content Guide:</h6>
            <AddToListAntD 
                listItems={productIDs}
                onChange={(value) => handleProductIDsChange(value)}
                label="Product IDs"
                placeHolder="Enter Product ID"
                className='placeholder:text-gray-400 placeholder:opacity-100 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white'
            />
            <TextField
                    disabled={false}
                    maxLength={2000}
                    initialValue={contentGuide}
                    placeholder="Type your message here..."
                    handleChangeOnFormik={(value) => handleContentGuideMessageChange(value)}
                    minimum_rows={3}
                    className="w-full h-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
            />
            <CustomFileInput
                handleFileChange={handleFileChange}
                handleDeleteFile={handleDeleteFile}
                fileName={file ? file.name : null}
                previouslySavedFileName={previousFileName}
                saveEnabled={saveContentGuideEnabled}
                handleSave={handleContentGuideSave}
                handlePreviouslyUploadedFileDelete={handlePreviouslyUploadedFileDelete}
                actionStatus={contentGuideActionStatus}
            />
        </Card>
    );
};

export default ProductSpecificContentGuide;
