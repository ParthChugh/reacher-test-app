

import React, { useEffect, useState } from 'react';
import TextField from '../../components/forms/TextField';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateContentGuideSetting, updateMessageSettings } from '../../store/assistant';
import { Button, Card, Upload, message } from 'antd';
import type { UploadProps } from 'antd';
import CustomFileInput from './CustomFileInput';
import ProductSpecificContentGuide from './ProductSpecificContentGuide';
import { MdTipsAndUpdates } from 'react-icons/md';

const props: UploadProps = {
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', // requires an upload url, we will handle this later, focus on how to link images with the content guide 
    accept: '.png, .jpg, .jpeg',
    beforeUpload: (file) => {
      const isPNG = file.type === 'image/png';
      const isPDF = file.type === 'application/pdf';
      if (!isPNG && !isPDF) {
        message.error(`${file.name} is not a PNG or PDF file`);
      }
      return (isPNG || isPDF) || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      console.log("Upload Info: ", info.fileList);
    },
};
  
interface MessageSettingsProps {
    askCreatorToRequestSampleProp: string;
    sendReminderMessageToCreateContentProp: string;
    multiProductGuideMessageProp: string;
    defaultContentGuideProp: any;
    productSpecificContentGuidesProp: any;
}

const MessagesSettings: React.FC<MessageSettingsProps> = ({
    askCreatorToRequestSampleProp,
    sendReminderMessageToCreateContentProp,
    multiProductGuideMessageProp,
    defaultContentGuideProp,
    productSpecificContentGuidesProp,
}) => {
    const [askCreatorToRequestSample, setAskCreatorToRequestSample] = useState(askCreatorToRequestSampleProp);
    const [sendReminderMessageToCreateContent, setSendReminderMessageToCreateContent] = useState(sendReminderMessageToCreateContentProp);
    const genericMultipleProductGuideMessage = multiProductGuideMessageProp;
    const [isLoading, setIsLoading] = useState(false);
    const shops = useAppSelector((state) => state.shops);
    const assistant = useAppSelector((state) => state.assistant);
    const dispatch = useAppDispatch();

    // Default content guide message handlers
    const [emptyProductIdEntry, setEmptyProductIdEntry] = useState(defaultContentGuideProp);
    const [file, setFile] = useState(null);
    const [saveDefaultContentGuideEnabled, setsaveDefaultContentGuideEnabled] = useState(false);
    const [defaultContentGuideSaving, setDefaultContentGuideSaving] = useState<boolean>(false);
    
    const [previouslyUploadedFileName, setPreviouslyUploadedFileName] = useState(
        defaultContentGuideProp && defaultContentGuideProp.file_name ? defaultContentGuideProp.file_name : ""
    );

    const handleDefaultContentGuideChange = (value: string) => {
        console.log("Default Content Guide Message:", value);
        setEmptyProductIdEntry(prevEntry => ({ ...prevEntry, message: value }));
        setsaveDefaultContentGuideEnabled(true);
    };

    const handleFileChange = (event) => {
        const newFile = event.target.files[0];
        setFile(newFile);
        console.log("File: ", newFile);
        setsaveDefaultContentGuideEnabled(true);
    };

    // ToDo: Implement the previously uploaded file interactions if needed
    const handlePreviouslyUploadedFileDelete = () => {
        console.log("Previously uploaded file:", emptyProductIdEntry["file_name"]);
        setPreviouslyUploadedFileName(null);
        setsaveDefaultContentGuideEnabled(true);
    };

    const handleDeleteFile = () => {
        setFile(null);
        console.log("File deleted");
        setsaveDefaultContentGuideEnabled(true);
    };

    const handleDefaultContentGuideSave = async () => {
        setDefaultContentGuideSaving(true);
    
        const formData = new FormData();
        formData.append("shop_id", shops.selectedStoreId.toString());
    
        const productContentGuide = message ? {
            product_id_list: emptyProductIdEntry?.product_id_list || [],
            file_name: file ? file.name : "",
            message: emptyProductIdEntry?.message || "",
        } : {
            message: "",
            file_name: "",
            product_id_list: []
        };
    
        formData.append("product_content_guide", JSON.stringify(productContentGuide));
    
        if (file) {
            formData.append("file", file);
        }
    
        console.log("Default Content Guide saving FormData:", productContentGuide);
    
        try {
            await dispatch(updateContentGuideSetting(formData));
            console.log("Default Content Guide saved:", message);
            setsaveDefaultContentGuideEnabled(false);
        } catch (error) {
            console.error("Error saving Default Content Guide:", error);
            setsaveDefaultContentGuideEnabled(true);
        } finally {
            setDefaultContentGuideSaving(false);
            setPreviouslyUploadedFileName(file ? file.name : "");
            setFile(null);
        }
    };

    // Content guides with product ID handlers
    const initialContentGuides = (productSpecificContentGuidesProp && productSpecificContentGuidesProp.length > 0)
        ? productSpecificContentGuidesProp.map(guide => ({
            productIDs: guide.product_id_list,
            contentGuide: guide.message,
            file_name: guide.file_name
    })) : [{ productIDs: [], contentGuide: "", file_name: "" }];
    
    const [contentGuides, setContentGuides] = useState(initialContentGuides);

    /*const handleAddContentGuide = (index: number, field: string, value: string) => {
        const newContentGuides = [...contentGuides];
        newContentGuides[index][field] = value;
        setContentGuides(newContentGuides);
    };*/  // Will be used if batch upload is needed
    
    const addNewContentGuide = () => {
        setContentGuides([...contentGuides, { productIDs: [], contentGuide: '', file_name: '' }]);
    };

    const removeContentGuide = (index: number) => {
        const newContentGuides = contentGuides.filter((_, i) => i !== index);
        setContentGuides(newContentGuides);
    };    

    const handleSave = () => {
        console.log("Saving message settings...");
        dispatch(updateMessageSettings({
            shop_id: shops.selectedStoreId,
            followup_messages: {
            "Ask Creator to Request Sample" : askCreatorToRequestSample,
            "Send Reminder Message": sendReminderMessageToCreateContent,
            "Multi Product Guide Message": genericMultipleProductGuideMessage,
        }
        }));
    };

    const handleSendReminderMessageToCreateContentChange = (value: string) => {
        console.log("Reminder to Create Content:", value);
        setSendReminderMessageToCreateContent(value);
    };

    useEffect(() => {
        if(assistant.messageSettingsUpdating === true){
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    } , [assistant.messageSettingsUpdating]);

    return (
        <div className="ml-6 text-gray-800">
          <label className="block text-sm font-medium text-black mb-2 flex items-center">
            <MdTipsAndUpdates className="mr-2" /> Tips and Tricks
          </label>       
          <div className="bg-white border border-ant-input-border rounded-lg col-span-1 mb-5 inline-block">
            <span className="flex text-md text-black italic before:content-['●'] before:mr-2 p-2 mr-2">
            The message in the “Reminder to Create Content” box will be sent to creators in the Content Pending stage.
            </span>
            <span className="flex text-md text-black italic before:content-['●'] before:mr-2 p-2 mr-2">
            The message in the “Default Content Guide Message” box will be sent to creators in the Shipped stage. The Default Content Guide is for products that you don not have a specific guide for. If you leave this message blank, creators that have been shipped a product without a specific guide will not receive any content guide.
            </span>
            <span className="flex text-md text-black italic before:content-['●'] before:mr-2 p-2 mr-2">
            New Content Guides are for products that you have created a specific guide. You can link multiple product IDs to this content guide!
            </span>
            <span className="flex text-md text-black italic before:content-['●'] before:mr-2 p-2 mr-2">
            For content guides, you may only upload images of .png, .jpeg, or .jpg formats.
            </span>
            <span className="flex text-md text-black italic before:content-['●'] before:mr-2 p-2 mr-2">
            Remember to click “Save” for each guide you create!
            </span>
          </div>
            {/*<h5 className="font-semibold text-lg text-blue-600 mb-4 mt-4">Ask Creator to Request Sample:</h5>
            <div className="mb-8 bg-blue-50 p-6 rounded-xl shadow-lg transition duration-300 ease-in-out hover:shadow-xl hover:scale-105">
                <TextField
                    disabled={false}
                    maxLength={2000}
                    initialValue={askCreatorToRequestSample}
                    placeholder="Type your message here..."
                    handleChangeOnFormik={(value) => handleAskCreatorToRequestSampleChange(value)}
                    minimum_rows={3}
                    className="w-full h-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>*/}
            <h5 className="font-semibold text-lg text-blue-600 mb-4 mt-4">Reminder to Create Content:</h5>
            <div className="mb-8 bg-blue-50 p-6 rounded-xl shadow-lg transition duration-300 ease-in-out hover:shadow-xl hover:scale-105">
                <TextField
                    disabled={false}
                    maxLength={2000}
                    initialValue={sendReminderMessageToCreateContent}
                    placeholder="Type your message here..."
                    handleChangeOnFormik={(value) => handleSendReminderMessageToCreateContentChange(value)}
                    minimum_rows={3}
                    className="w-full h-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <div className="flex justify-end">
                <button 
                onClick={() => {handleSave()}}
                className="w-100 bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
                disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
                            </svg>
                            Saving...
                        </div>
                    ) : "Save"}
                </button>
            </div>
            {/* New Section: Content Guides */}
            <h5 className="font-semibold text-lg text-blue-600 mb-4 mt-4">Content Guides:</h5>
            <Card className="mb-8 bg-blue-50 rounded-xl shadow-lg transition duration-300 ease-in-out hover:shadow-xl hover:scale-105">
                <h6 className="font-semibold text-md text-blue-600 mb-4">Default Content Guide Message:</h6>
                <TextField
                    disabled={false}
                    maxLength={2000}
                    initialValue={defaultContentGuideProp && defaultContentGuideProp.message ? defaultContentGuideProp.message : ""}
                    placeholder="Type your default content guide message here..."
                    handleChangeOnFormik={(value) => handleDefaultContentGuideChange(value)}
                    minimum_rows={3}
                    className="w-full h-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                />
                <CustomFileInput
                handleFileChange={handleFileChange}
                handleDeleteFile={handleDeleteFile}
                handlePreviouslyUploadedFileDelete={handlePreviouslyUploadedFileDelete}
                fileName={file ? file.name : null}
                previouslySavedFileName={previouslyUploadedFileName ? previouslyUploadedFileName : null}
                handleSave={handleDefaultContentGuideSave}
                saveEnabled={saveDefaultContentGuideEnabled}
                actionStatus={defaultContentGuideSaving ? "saving" : "idle"}
                />
            </Card>
            {contentGuides.map((guide, index) => (
                <ProductSpecificContentGuide
                    key={index}
                    index={index}
                    guide={guide}
                    removeContentGuide={removeContentGuide}
                    // handleAddContentGuide={handleAddContentGuide}
                    uploadProps={props}
                />
            ))}
            <Button type="dashed" onClick={addNewContentGuide} className="mb-8">
                Add New Content Guide
            </Button>
        </div>
    );
};

export default MessagesSettings;