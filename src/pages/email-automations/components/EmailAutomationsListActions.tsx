import React, { useState } from 'react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { Popover as AntdPopover } from 'antd';

const EmailAutomationListActions = ({
  record,
  isRunning,
  isStopping,
  isDeleting,
  handleStart,
  handleStop,
  handleDelete,
  onRowClick,
  shops
}) => {
    const [DeleteOpen, setDeleteOpen] = useState(false);
    const [StartOpen, setStartOpen] = useState(false);
    const [StopOpen, setStopOpen] = useState(false);

    const handleStopOpenChange = (newOpen: boolean) => {
        setStopOpen(newOpen);
    };

    const handleStartOpenChange = (newOpen: boolean) => {
        setStartOpen(newOpen);
    };
  
    const handleOpenChange = (newOpen: boolean) => {
        setDeleteOpen(newOpen);
    };
    return (
    <div className="flex items-center justify-center space-x-3">
      {(record.status === "inactive" || record.status === "paused") ? (
        <AntdPopover
            content={
            <div className="w-46">
                <h6 className="mb-2 font-semibold text-md text-green-400">
                Confirm Start
                </h6>
                <p style={{ color: 'red' }}>
                If another automation is already running, this one will not start.
                </p>
                <div className="flex justify-end items-center">
                <button
                    className={`w-full mt-4 ${isRunning ? 'bg-gray-400' : 'bg-green-400 hover:bg-green-600'} text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out`}
                    onClick={() => {
                    handleStart(record.mail_auto_id, shops.selectedStoreId);
                    }}
                    disabled={isRunning}
                >
                    Start
                </button>
                </div>
            </div>
            }
            trigger="click"
            open={StartOpen}
            onOpenChange={handleStartOpenChange}
        >
            <button className="automation-start-button-bg hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out">
              Start
            </button>
        </AntdPopover>


      ) : (
        <AntdPopover
        content={
            <div className="w-46">
                <h6 className="mb-2 font-semibold text-md text-red-400">
                Confirm Stop
                </h6>
                This will stop the automation immediately.
                <div className="flex justify-end items-center">
                <button
                    className={`w-full mt-4 ${isStopping ? 'bg-gray-400' : 'bg-red-400 hover:bg-red-600'} text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out`}
                    onClick={() => {
                    handleStop(record.mail_auto_id, shops.selectedStoreId);
                    }}
                    disabled={isStopping}
                >
                    Stop
                </button>
                </div> 
            </div>
        }
        trigger="click"
        open={StopOpen}
        onOpenChange={handleStopOpenChange}
        >
            <button className="automation-finish-and-save-bg hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out">
              Stop
            </button>
        </AntdPopover>
      )}
      <button
        className={`w-full bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out`}
        onClick={() => onRowClick && onRowClick(record)}
      >
        View/Edit
      </button>
        <AntdPopover
        content={
            <div className="w-46">
                <h6 className="mb-2 font-semibold text-md text-red-400 font-bold">
                    Confirm Deletion
                </h6>
                This will permanently delete the automation.
                <div className="flex justify-end items-center">
                    <button
                    className={`w-full mt-4 ${isDeleting ? 'bg-gray-400' : 'bg-red-400 hover:bg-red-600'} text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out`}
                    onClick={() => {
                        handleDelete(record.mail_auto_id, shops.selectedStoreId);
                    }}
                    disabled={isDeleting}
                    >
                    Delete
                    </button>
                </div>
            </div>
        }
        trigger="click"
        open={DeleteOpen}
        onOpenChange={handleOpenChange}
        >
          <button className="bg-red-400 hover:bg-red-600 text-white font-bold p-2 rounded-md transition duration-300 ease-in-out">
            <RiDeleteBin2Line className="text-white" size={24} />
          </button>
        </AntdPopover>
        
    </div>
  );
};

export default EmailAutomationListActions;