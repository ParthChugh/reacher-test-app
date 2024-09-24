import React from 'react';
import { useAppSelector } from '../../hooks';

const ViewEmailAutomationDetails = ({ automationData, onReturn, onEdit }) => {
    console.log(automationData);
    const shops = useAppSelector((state) => state.shops);
    if (!automationData) return <p className="text-center mt-10 text-lg text-gray-800">No such automation data.</p>;

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
                    <p className='mb-1'><strong>Automation Name:</strong> <span className="text-gray-800">{automationData.mail_auto_name}</span></p>
                    <p className='mb-1'><strong>Email Account:</strong> <span className="text-gray-800">{automationData.email_account}</span></p>
                    <p className='mb-1'><strong>Automation Status:</strong> <span className="text-gray-800">{automationData.status}</span></p>
                    <p className='mb-1'><strong># of Filtered Creators:</strong> <span className='text-gray-800'>{automationData.num_creators_filtered} </span></p>
                    <p className='mb-1'><strong># of Creators Emailed:</strong> <span className='text-gray-800'>{automationData.num_creators_emailed ? automationData.num_creators_emailed : "0" } </span></p>
                    <p className='mb-1'><strong># of Creators Remaining:</strong> <span className='text-gray-800'>{automationData.num_remaining ? automationData.num_remaining : automationData.num_creators_filtered} </span></p>   
                    <p className='mb-1'><strong>Created At:</strong> <span className="text-gray-800">{automationData.created_at}</span></p>
                    <p className='mb-1'><strong>Updated At:</strong> <span className="text-gray-800">{automationData.updated_at}</span></p>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Creator Message</h3>
                    <p className='mb-1'><strong>Subject:</strong> <span className="text-gray-800">{automationData.subject}</span></p>
                    <p className='mb-1'><strong>Headline:</strong> <span className="text-gray-800">{automationData.headline ? automationData.headline : "Not set"}</span></p>
                    <p className='mb-1'><strong>Body:</strong> <span className="text-gray-800">{automationData.body}</span></p>
                    <p className='mb-1'><strong>Signature:</strong> <span className="text-gray-800">{automationData.signature}</span></p>
                    <p className='mb-1'><strong>Signoff:</strong> <span className="text-gray-800">{automationData.signoff}</span></p>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg col-span-1 md:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Filters</h3>
                        <p className='mb-1'><strong>Creator Details: </strong></p>
                        <div className='flex items-center space-x-2 mt-1 mb-2'> <p className='flex items-center m-0'>Follower Count: <span className="text-gray-800 ml-2">{renderInlineArray(automationData.filters?.Creators?.Followers?.['Follower Segments'], "bg-purple-100", "border-gray-800") || "No such filter configured."}</span></p> </div>
                        <div className='flex items-center space-x-2 mt-1 mb-2'> <p className='flex items-center m-0'>Product Categories: <span className="text-gray-800 ml-2">{renderProductCategories(automationData.filters?.Creators?.['Product Categories'], "bg-purple-100", "border-gray-800")}</span></p> </div>
                        <p className='mt-3 mb-1'><strong>Follower Details:</strong></p>
                        <div className='flex items-center space-x-2 mt-1 mb-2'> <p className='flex items-center m-0'>Age: <span className="text-gray-800 ml-2">{renderInlineArray(automationData.filters?.Followers?.['Follower Age'], "bg-purple-100", "border-gray-800")}</span></p> </div>
                        <div className='flex items-center space-x-2 mt-1 mb-2'> <p className='flex items-center m-0'>Gender: <span className="text-gray-800 ml-2">{renderInlineArray(automationData.filters?.Followers?.['Follower Gender'], "bg-purple-100", "border-gray-800")}</span></p> </div>
                        <p className='mt-3 mb-1'><strong>Performance Metrics:</strong></p>
                        { shops.selectedStoreRegion === 'US' && (
                            <>
                            <div className='flex items-center space-x-2 mt-1 mb-2'>
                                <p className='flex items-center m-0'>
                                Average Views: 
                                <span className="text-gray-800 ml-2">
                                    {renderInlineArray(automationData.filters?.Performance?.['Average Views'], "bg-purple-100", "border-gray-800")}
                                </span>
                                </p>
                            </div>
                            <div className='flex items-center space-x-2 mt-1 mb-2'>
                                <p className='flex items-center m-0'>
                                Engagement Rate: 
                                <span className="text-gray-800 ml-2">
                                    {renderInlineArray(automationData.filters?.Performance?.['Engagement Rate'], "bg-purple-100", "border-gray-800")}
                                </span>
                                </p>
                            </div>
                            <div className='flex items-center space-x-2 mt-1 mb-2'>
                                <p className='flex items-center m-0'>
                                GMV: 
                                <span className="text-gray-800 ml-2">
                                    {renderInlineArray(automationData.filters?.Performance?.GMV, "bg-purple-100", "border-gray-800")}
                                </span>
                                </p>
                            </div>
                            <div className='flex items-center space-x-2 mt-1 mb-2'>
                                <p className='flex items-center m-0'>
                                Units Sold: 
                                <span className="text-gray-800 ml-2">
                                    {renderInlineArray(automationData.filters?.Performance?.['Units Sold'], "bg-purple-100", "border-gray-800")}
                                </span>
                                </p>
                            </div>
                            </>
                        )}
                        { shops.selectedStoreRegion === 'UK' && (
                            <>
                            <div className='flex items-center space-x-2 mt-1 mb-2'>
                                <p className='flex items-center m-0'>
                                GPM:
                                <span className="text-gray-800 ml-2">
                                    {renderInlineArray(automationData.filters?.Performance?.GPM, "bg-purple-100", "border-gray-800")}
                                </span>
                                </p>
                            </div>
                            <div className='flex items-center space-x-2 mt-1 mb-2'>
                                <p className='flex items-center m-0'>
                                Video Views:
                                <span className="text-gray-800 ml-2">
                                    {renderInlineArray(automationData.filters?.Performance?.['Video Views'], "bg-purple-100", "border-gray-800")}
                                </span>
                                </p>
                            </div>
                            </>
                        )}                
                </div>
                <div className="bg-green-100 p-4 rounded-lg col-span-1 md:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Image Details</h3>
                    { automationData.brand_image_name && (
                        <p className='mb-1'><strong>Brand Image Name:</strong> <span className="text-gray-800">{automationData.brand_image_name}</span></p>
                    )}
                    { 
                        automationData.brand_image_url ? 
                        <img src={automationData.brand_image_url} alt="Brand Image" /> : 
                        <p className='text-gray-800 mt-2'>No brand image uploaded.</p>
                    }
                    { automationData.product_image_name && (
                        <p className='mb-1 mt-6'><strong>Product Image Name:</strong> <span className="text-gray-800">{automationData.product_image_name}</span></p>
                    )}
                    { 
                        automationData.product_image_url ? 
                        <img src={automationData.product_image_url} alt="Product Image" /> : 
                        <p className='text-gray-800 mt-2'>No product image uploaded.</p>
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

export default ViewEmailAutomationDetails;
