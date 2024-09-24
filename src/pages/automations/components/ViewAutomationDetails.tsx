import React from 'react';
import { useAppSelector } from '../../hooks';

const ViewAutomationDetails = ({ automationData, onReturn, onEdit }) => {
    console.log(automationData);
    const shops = useAppSelector((state) => state.shops);
    const schedule = automationData.config?.SCHEDULE || {};
    if (!automationData) return <p className="text-center mt-10 text-lg text-gray-800">No such automation data.</p>;

    // const renderArrayItems = (items) => {
    //     if (items && Array.isArray(items)) {
    //         return items.map((item, index) => <li key={index} className="list-disc ml-4 text-gray-800">{item}</li>);
    //     }
    //     return <li className="text-gray-500">No items found.</li>;
    // };

    // Function to render product IDs with commission rates
    const renderProductsWithCommission = (products) => {
        if (products && Array.isArray(products)) {
            return products.map((product, index) => (
                <div> 
                    <li key={index} className="list-disc ml-4 text-gray-800">
                        Product ID: {product.product_id} 
                    </li>
                    <span> Commission Rate: {product.commission_rate}%</span>
                </div>
            ));
        }
        return <li className="text-gray-500">No products found.</li>;
    };

    // Function to render simple product IDs
    const renderProductIDs = (items) => {
        if (items && Array.isArray(items)) {
            return items.map((item, index) => (
                <li key={index} className="list-disc ml-4 text-gray-800">{item}</li>
            ));
        }
        return <li className="text-gray-500">No items found.</li>;
    };

    const renderInlineArray = (values, bgColor = "bg-black", borderColor = "border-white") => {
        // Normalize for value check
        const items = Array.isArray(values) ? values : (values ? [values] : []);
        // Value check
        if (items.length === 0 || (items.length === 1 && !items[0].trim())) {
            return <p className="text-gray-800">No such filter configured.</p>;
        }
    
        // Format strings in a visually appealing way a-a --> a - a
        const formatValue = (value) => {
            return value.replace(/([^ ])-([^ ])/g, '$1 - $2');
        };
    
        return (
            <div className="flex items-center gap-2">
                {items.map((value, index) => (
                    <span key={index} className={`border ${bgColor} ${borderColor} text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded`}>
                        {formatValue(value)}
                    </span>
                ))}
            </div>
        );
    };
    
    const renderProductCategories = (categories, bgColor = "bg-blue-200", borderColor = "border-gray-300") => {
        const items = Array.isArray(categories) ? categories : [];
        // Value check
        if (items.length === 0) {
            return <p className="text-gray-800">No such filter configured.</p>;
        }
    
        return (
            <div className="flex items-center gap-2">
                {items.map((category, index) => (
                    <span key={index} className={`border ${bgColor} ${borderColor} text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded`}>
                        {category.Main || "Unknown Category"}
                    </span>
                ))}
            </div>
        );
    };
    
    
    
    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg divide-y divide-gray-200">
            <div className="pb-6">
                <h2 className="text-2xl font-bold text-blue-600 mb-2">Automation Details</h2>
                <p className="text-sm text-gray-500">Detailed view of the selected automation configuration.</p>
            </div>
            <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">General Information</h3>
                    <p className='mb-1'><strong>Automation ID:</strong> <span className="text-gray-800">{automationData.automation_id}</span></p>
                    <p className='mb-1'><strong>Automation Name:</strong> <span className="text-gray-800">{automationData.automation_name}</span></p>
                    <p className='mb-1'><strong>Automation Type:</strong> <span className="text-gray-800">{automationData.automation_type}</span></p>
                    <p className='mb-1'><strong>Automation Status:</strong> <span className="text-gray-800">{automationData.status}</span></p>
                    <p className='mb-1'><strong>Created At:</strong> <span className="text-gray-800">{automationData.created_at}</span></p>
                    <p className='mb-1'><strong>Last Updated:</strong> <span className="text-gray-800">{automationData.updated_at || "None"}</span></p>
                    <p className='mb-1'><strong>Messages Sent:</strong> <span className="text-gray-800">{automationData.sent_messages || "None"}</span></p>
                    <p className='mb-1'>
                    <strong>Only Message to the Included Creators:&nbsp;</strong> 
                    <span className="text-gray-800">
                        {automationData.config?.ONLY_MESSAGE_INCLUDE_LIST !== undefined 
                        ? automationData.config.ONLY_MESSAGE_INCLUDE_LIST.toString().charAt(0).toUpperCase() + automationData.config.ONLY_MESSAGE_INCLUDE_LIST.toString().slice(1)
                        : "None"}
                    </span>
                    </p>
                    <p><strong>Desired Product IDs:</strong></p>
                    <ul>
                        {(automationData.automation_type === "Message + Target Collab" || automationData.automation_type === "Message + Target Collab + Target Collab Card") ?
                            renderProductsWithCommission(automationData.config?.PRODUCTS) :
                            renderProductIDs(automationData.config?.DESIRED_PRODUCT_IDS)}
                    </ul>
                    {
                        (automationData.creators_to_omit && automationData.creators_to_omit.length > 0) ? (
                            <>
                                <div className="mt-4 max-h-40 overflow-auto">
                                <h3 className="font-bold">Creators to Omit:</h3>
                                <ul className="list-disc pl-5">
                                    {automationData.creators_to_omit.map((name, index) => (
                                    <li key={index}>{name}</li>
                                    ))}
                                </ul>
                                </div>
                            </>
                        ) : <p className="text-gray-800">No creators to omit configured.</p>
                    }
                    {
                        (automationData.creators_to_include && automationData.creators_to_include.length > 0) ? (
                            <>
                                <div className="mt-4 max-h-40 overflow-auto">
                                <h3 className="font-bold">Creators to Include:</h3>
                                <ul className="list-disc pl-5">
                                    {automationData.creators_to_include.map((name, index) => (
                                    <li key={index}>{name}</li>
                                    ))}
                                </ul>
                                </div>
                            </>
                        ) : <p className="text-gray-800">No creators to include configured.</p>
                    }
                </div>
                <div className="bg-blue-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Creator Message</h3>
                    {(automationData.automation_type === "Message + Target Collab" || automationData.automation_type === "Message + Target Collab + Target Collab Card") ? (
                        <div>
                            <p className="text-gray-800 mb-4" dangerouslySetInnerHTML={{ __html: automationData.config?.TARGET_COLLAB_MESSAGE.replace(/\n/g, '<br>') }}></p>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2 pt-4">Target Collab Details</h3>
                            <p className='mb-1'><strong>Invitation Name:</strong> <span className="text-gray-800">{automationData.config?.BASE_INVITATION_NAME}</span></p>
                            <p className='mb-1'><strong>Valid Until:</strong> <span className="text-gray-800">{automationData.config?.VALID_UNTIL}</span></p>
                            <p className='mb-1'><strong>Email:</strong> <span className="text-gray-800">{automationData.config?.EMAIL}</span></p>
                            <p className='mb-1'><strong>Phone Number:</strong> <span className="text-gray-800">{automationData.config?.PHONE_NUMBER}</span></p>
                            <p className='mb-1'><strong>Offer Free Samples:</strong> <span className="text-gray-800">{automationData.config?.OFFER_FREE_SAMPLES ? 'True' : 'False'}</span></p>
                            <p className='mb-1'><strong>Auto Approve Sample Requests:</strong> <span className="text-gray-800">{automationData.config?.AUTO_APPROVE ? 'True' : 'False'}</span></p>
                            <p className='mb-1'><strong>Preferred Content Type:</strong> <span className="text-gray-800">{automationData.config?.content_type ? automationData.config?.content_type : "Not Configured"}</span></p>
                            <p className='mb-1'><strong>TC Creator DM Message:</strong> <span className="text-gray-800">{automationData.config?.TC_DM_MESSAGE ? automationData.config?.TC_DM_MESSAGE : "Not Set"}</span></p>
                        </div>
                    ) : (
                        <p className="text-gray-800" dangerouslySetInnerHTML={{ __html: automationData.config?.CREATOR_MESSAGE.replace(/\n/g, '<br>') }}></p>
                    )}
                    {(automationData.automation_type === "Message + Image" && automationData.file_name) && (  
                        <p className='mb-1 mt-2'><strong>Image:</strong> <span className="text-gray-800">{automationData.file_name}</span></p>
                    )}
                </div>
                <div className="bg-purple-100 p-4 rounded-lg col-span-1 md:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Filters</h3>
                        <p className='mb-1'><strong>Creator Details: </strong></p>
                        <div className='flex items-center space-x-2 mt-1 mb-2'> <p className='flex items-center m-0'>Follower Count: <span className="text-gray-800 ml-2">{renderInlineArray(automationData.config?.Filters?.Creators?.Followers?.['Follower Segments'], "bg-purple-100", "border-gray-800") || "No such filter configured."}</span></p> </div>
                        <div className='flex items-center space-x-2 mt-1 mb-2'> <p className='flex items-center m-0'>Product Categories: <span className="text-gray-800 ml-2">{renderProductCategories(automationData.config?.Filters?.Creators?.['Product Categories'], "bg-purple-100", "border-gray-800")}</span></p> </div>
                        <p className='mt-3 mb-1'><strong>Follower Details:</strong></p>
                        <div className='flex items-center space-x-2 mt-1 mb-2'> <p className='flex items-center m-0'>Age: <span className="text-gray-800 ml-2">{renderInlineArray(automationData.config?.Filters?.Followers?.['Follower Age'], "bg-purple-100", "border-gray-800")}</span></p> </div>
                        <div className='flex items-center space-x-2 mt-1 mb-2'> <p className='flex items-center m-0'>Gender: <span className="text-gray-800 ml-2">{renderInlineArray(automationData.config?.Filters?.Followers?.['Follower Gender'], "bg-purple-100", "border-gray-800")}</span></p> </div>
                        <p className='mt-3 mb-1'><strong>Performance Metrics:</strong></p>
                        {shops.selectedStoreRegion === "US" && (
                            <>
                            <div className='flex items-center space-x-2 mt-1 mb-2'>
                                <p className='flex items-center m-0'>
                                Average Views: 
                                <span className="text-gray-800 ml-2">
                                    {renderInlineArray(automationData.config?.Filters?.Performance?.['Average Views'], "bg-purple-100", "border-gray-800")}
                                </span>
                                </p>
                            </div>
                            <div className='flex items-center space-x-2 mt-1 mb-2'>
                                <p className='flex items-center m-0'>
                                Engagement Rate: 
                                <span className="text-gray-800 ml-2">
                                    {renderInlineArray(automationData.config?.Filters?.Performance?.['Engagement Rate'], "bg-purple-100", "border-gray-800")}
                                </span>
                                </p>
                            </div>
                            <div className='flex items-center space-x-2 mt-1 mb-2'>
                                <p className='flex items-center m-0'>
                                GMV: 
                                <span className="text-gray-800 ml-2">
                                    {renderInlineArray(automationData.config?.Filters?.Performance?.GMV, "bg-purple-100", "border-gray-800")}
                                </span>
                                </p>
                            </div>
                            <div className='flex items-center space-x-2 mt-1 mb-2'>
                                <p className='flex items-center m-0'>
                                Units Sold: 
                                <span className="text-gray-800 ml-2">
                                    {renderInlineArray(automationData.config?.Filters?.Performance?.['Units Sold'], "bg-purple-100", "border-gray-800")}
                                </span>
                                </p>
                            </div>
                            </>
                        )}
                        {shops.selectedStoreRegion === "UK" && (
                            <>
                            <div className='flex items-center space-x-2 mt-1 mb-2'>
                                <p className='flex items-center m-0'>
                                GPM: 
                                <span className="text-gray-800 ml-2">
                                    {renderInlineArray(automationData.config?.Filters?.Performance?.GPM, "bg-purple-100", "border-gray-800")}
                                </span>
                                </p>
                            </div>
                            <div className='flex items-center space-x-2 mt-1 mb-2'>
                                <p className='flex items-center m-0'>
                                Video Views: 
                                <span className="text-gray-800 ml-2">
                                    {renderInlineArray(automationData.config?.Filters?.Performance?.['Video Views'], "bg-purple-100", "border-gray-800")}
                                </span>
                                </p>
                            </div>
                            </>
                        )}
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg col-span-1 md:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Automation Schedule</h3>
                    {Object.keys(schedule).length > 0 ? (
                        Object.keys(schedule).map(day => (
                            <div key={day} className="mb-2">
                                <h4 className="text-md font-semibold text-gray-700">{day}</h4>
                                {/*<p className="text-gray-800">Start Time: {schedule[day].startTime}</p>*/}
                                <p className="text-gray-800">Max Creators: {schedule[day].maxCreators}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-800">No schedule settings configured.</p>
                    )}
                </div>
                <div className="bg-green-100 p-4 rounded-lg col-span-1 md:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Follow Up Messages</h3>
                    {
                        automationData.config?.SEND_UNREPLIED_FOLLOWUP ? (
                            <>
                                <p><strong>If <span className="text-pink-500">no reply in {automationData.config?.DAYS_BEFORE_FOLLOWUP} days</span> send follow up message:</strong></p>
                                <p className="text-gray-800" dangerouslySetInnerHTML={{ __html: automationData.config?.FOLLOWUP_MESSAGE.replace(/\n/g, '<br>') }}></p>
                            </>
                        ) : <p className="text-gray-800">No follow up message configured.</p>
                    }
                </div>
            </div>
            <div className="pt-6 flex justify-between">
                <button
                    onClick={onReturn}
                    className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
                >
                    Return to Automations
                </button>
                <button
                    onClick={onEdit}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 ml-4"
                >
                    Edit Automation
                </button>
            </div>
        </div>
    );
};

export default ViewAutomationDetails;
