import React, { useRef } from 'react';
import { FaTrash } from 'react-icons/fa';

interface CustomFileInputProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePreviouslyUploadedFileDelete?: () => void;
  handleDeleteFile: () => void;
  fileName: string | null;
  previouslySavedFileName: string | null;
  saveEnabled: boolean;
  handleSave: () => void;
  actionStatus: string;
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({ handleFileChange, handleDeleteFile, handlePreviouslyUploadedFileDelete, fileName, previouslySavedFileName, saveEnabled, handleSave, actionStatus, }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="file-input-wrapper">
      <div className="flex items-center space-x-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".png, .jpg, .jpeg"
        />
        <button
          type="button"
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={handleButtonClick}
        >
          Upload Image
        </button>
        <button
        type="button"
        className={`font-semibold py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out ${saveEnabled ? 'hover:bg-green-700 focus:ring-green-500' : 'opacity-50 cursor-not-allowed'} ${
            actionStatus === 'deleting' ? 'bg-red-600 text-white' : actionStatus === 'saving' ? 'bg-green-600 text-white' : 'bg-green-600 text-white'
        }`}
        onClick={handleSave}
        disabled={!saveEnabled || (actionStatus !== 'idle')}
    >
        {actionStatus === "saving" ? (
            <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
                </svg>
                Saving...
            </div>
        ) : actionStatus === "deleting" ? (
            <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
                </svg>
                Deleting...
            </div>
        ) : "Save Content Guide"}
    </button>
      </div>
      {!fileName && (
        <div className="mt-2 text-gray-400">Warning: No new image selected. Saving now will send the message without an image!</div>
      )}
      {fileName && (
        <div className="mt-2 flex items-center text-blue-600 font-semibold">
          <span>Selected file: {fileName}</span>
          <button
            type="button"
            className="ml-2 text-red-600 transition duration-300 ease-in-out hover:text-red-700 focus:outline-none"
            onClick={handleDeleteFile}
          >
            <FaTrash />
          </button>
        </div>
      )}
      {previouslySavedFileName && (
        <div className="mt-2 flex items-center text-blue-600 font-semibold">
          <span>Current Image: {previouslySavedFileName}</span>
          <button
            type="button"
            className="ml-2 text-red-600 transition duration-300 ease-in-out hover:text-red-700 focus:outline-none"
            onClick={handlePreviouslyUploadedFileDelete}
          >
            <FaTrash />
          </button>
        </div>

      )}
    </div>
  );
};

export default CustomFileInput;
