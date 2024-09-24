

import React, { useEffect, useRef, useState } from 'react';
import { GrHelpBook } from 'react-icons/gr';
import StatusAssistantTable from './components/StatusAssistantTable';
import { Modal, Tabs } from 'antd';
import MessagesSettings from './components/MessagesSettings';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getMessageSettings } from '../store/assistant';
import Layout from './layout';


const AIAssistant = () => {
    const [sendContentGuide, setSendContentGuide] = useState([]);
    const [askCreatorToRequestSample, setAskCreatorToRequestSample] = useState("");
    const [sendReminderMessageToCreateContent, setSendReminderMessageToCreateContent] = useState("");
    const [multiProductGuideMessage, setMultiProductGuideMessage] = useState("");
    const [emptyProductIdEntry, setEmptyProductIdEntry] = useState({});
    const [productSpecificContentGuides, setProductSpecificContentGuides] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const iframeRef = useRef(null);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        // Clear the src to stop the video
        if (iframeRef.current) {
            iframeRef.current.src = "";
        }
    };

    useEffect(() => {
        if (isModalOpen && iframeRef.current) {
            // Set the src when the modal is opened
            iframeRef.current.src = "https://www.loom.com/embed/5132501a7e224c2696c062fd68a4df93?sid=e8aa2591-6254-4450-99ad-62dbe6ca9e12";
        }
    }, [isModalOpen]);

    const shops = useAppSelector((state) => state.shops);
    const assistant = useAppSelector((state) => state.assistant);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (shops.selectedStoreId && assistant.messageSettingsLoading === false && assistant.messageSettingsLoadCompleted === false) {
            console.log("Fetching message settings with shopID:", shops.selectedStoreId);
            dispatch(getMessageSettings({
                shop_id: shops.selectedStoreId,
            }));
        } else if (assistant.messageSettingsLoading === false && assistant.messageSettingsLoadCompleted === true) {
            setSendContentGuide(assistant.messageSettings['Send Content Guide']);
            setAskCreatorToRequestSample(assistant.messageSettings['Ask Creator to Request Sample']);
            setSendReminderMessageToCreateContent(assistant.messageSettings['Send Reminder Message']);
            setMultiProductGuideMessage(assistant.messageSettings['Multi Product Guide Message']);
            const emptyEntries = assistant.messageSettings['Send Content Guide'].filter(item => Array.isArray(item.product_id_list) && item.product_id_list.length === 0);
            setEmptyProductIdEntry(emptyEntries[0]);
            const nonEmptyEntries = assistant.messageSettings['Send Content Guide'].filter(item => Array.isArray(item.product_id_list) && item.product_id_list.length > 0);
            setProductSpecificContentGuides(nonEmptyEntries);

            console.log("Message settings loaded successfully:", assistant.messageSettings);
            console.log("Send Content Guide:", sendContentGuide);
            console.log("Empty Entries: ", emptyProductIdEntry);
            console.log("Product Specific Content Guides: ", productSpecificContentGuides);
            console.log("Ask Creator to Request Sample: ", askCreatorToRequestSample);
            console.log("Send Reminder Message: ", sendReminderMessageToCreateContent);
            console.log("Multi Product Guide Message: ", multiProductGuideMessage);
        }
    }, [shops.selectedStoreId, assistant.messageSettingsLoadCompleted, sendReminderMessageToCreateContent]);

    const tabsItems = [
        {
            label: "Actions Dashboard",
            key: '1',
            children: <StatusAssistantTable />,
        },
        {
            label: "Message Settings",
            key: '2',
            children: <MessagesSettings
                askCreatorToRequestSampleProp={askCreatorToRequestSample}
                sendReminderMessageToCreateContentProp={sendReminderMessageToCreateContent}
                multiProductGuideMessageProp={multiProductGuideMessage}
                defaultContentGuideProp={emptyProductIdEntry}
                productSpecificContentGuidesProp={productSpecificContentGuides}
            />,
            disabled: !sendContentGuide || !askCreatorToRequestSample || !sendReminderMessageToCreateContent,
        },
        {
            label: "Actions History",
            key: '3',
            children: <h1 className="flex justify-center items-center h-full text-2xl text-blue-500 font-bold mb-4">Coming Soon!</h1>,
        }
    ];

    return (
        <Layout>
            <div>
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-stroke border-gray-300 flex justify-between">
                    <h1 className="text-2xl text-blue-500 font-bold">AI Assistant</h1>
                    <button
                        className="flex items-center justify-center w-100 bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out space-x-2"
                        onClick={openModal}
                    >
                        <GrHelpBook className="mr-2" size={20} />
                        Assistant Tutorial
                    </button>
                </div>
                <Modal
                    open={isModalOpen}
                    footer={null}
                    onCancel={closeModal}
                    width={640}
                    transitionName=""
                    maskClosable={false}
                >
                    <h1 className="text-2xl font-bold text-black mb-3">Welcome to AI Assistant!</h1>
                    <h3 className="text-lg font-semibold text-black mb-4">
                        You can find the tutorial video below. If you have any questions, please contact us at <span className='text-blue-700'>team@reacherapp.com</span>!
                    </h3>
                    <div style={{ position: 'relative', paddingBottom: '59.14567360350493%', height: 0 }}>
                        {isModalOpen && (
                            <iframe
                                ref={iframeRef}
                                src=""
                                frameBorder="0"
                                allowFullScreen
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                            ></iframe>
                        )}
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
                <Tabs
                    type="card"
                    items={tabsItems}
                />
            </div>
        </Layout>
    );
};

export default AIAssistant;
