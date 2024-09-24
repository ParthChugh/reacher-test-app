import React, { useState } from "react";
import { Form, Formik, FormikValues, Field } from "formik";
import { MdTipsAndUpdates } from "react-icons/md";
import { Checkbox, Upload, message } from "antd";
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons';
import Papa from 'papaparse';

const { Dragger } = Upload;

interface AddNewAutomationStepOneThreeProps {
  onNext: (values: FormikValues) => void;
  onPrev: () => void;
  initialValues: FormikValues;
}

const AddNewAutomationStepOneThree: React.FC<AddNewAutomationStepOneThreeProps> = ({
  onNext,
  onPrev,
  initialValues,
}) => {
  const [creatorsToOmitFile, setCreatorsToOmitFile] = useState<File | null>(null);
  const [creatorsToIncludeFile, setCreatorsToIncludeFile] = useState<File | null>(null);
  const [omitError, setOmitError] = useState<string | null>(null);
  const [includeError, setIncludeError] = useState<string | null>(null);

  const [creatorsToOmitList, setCreatorsToOmitList] = useState<string[]>(initialValues.creators_to_omit || []);
  const [creatorsToIncludeList, setCreatorsToIncludeList] = useState<string[]>(initialValues.creators_to_include || []);

  const handleFileChange = (
    file: File,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
    fieldName: string
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
          setFieldValue(fieldName, names); // Update the form state
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
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
    fieldName: string
  ) => {
    setFile(null);
    setList([]);
    setError(null);
    setFieldValue(fieldName, []); // Reset the form state
  };

  const beforeUpload = (
    file: File,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
    fieldName: string
  ) => {
    setFile(null);
    setList([]);
    setFieldValue(fieldName, []); // Reset the form state
    handleFileChange(file, setFile, setList, setError, setFieldValue, fieldName);
    return false; // Return false to prevent automatic upload
  };

  const handleDeleteList = (
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
    fieldName: string
  ) => {
    setFile(null);
    setList([]);
    setFieldValue(fieldName, []);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => onNext(values)}
      enableReinitialize
    >
      {({ isSubmitting, setFieldValue, values}) => (
        <Form className="mt-6 mb-2 w-full">
          <label className="block text-sm font-medium text-black mb-2 flex items-center">
            <MdTipsAndUpdates className="mr-2" /> Tips and Tricks
          </label>
          <div className="bg-white border border-ant-input-border rounded-lg col-span-1 mb-5 inline-block">
            <span className="flex text-md text-black italic before:content-['●'] before:mr-2 p-2 pb-1 mr-2">
              Click&nbsp;<a href="https://docs.google.com/spreadsheets/d/1QNNMFCO_IxfRWVmYPZSRjaZWYS0gG0peOgDcBm6u8Ws/edit?gid=0#gid=0" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">here</a>&nbsp;to see the sample file. Please submit your files in such a format.
            </span>
            <span className="flex text-md text-black italic before:content-['●'] before:mr-2 p-1 mr-2">
              If you ONLY want to reach out the creators on the "Creators to Include" list and NO ONE else, check the box below.
            </span>
            <span className="flex text-md text-black italic before:content-['●'] before:mr-2 p-1 mr-2">
              If you do not check the box below and upload a list of creators, they will be added to the pool of creators based on the selected filters.
            </span>
            <span className="flex text-md text-black italic before:content-['●'] before:mr-2 p-1 mr-2">
              Below, you can find an image of the sample file format:
            </span>
            <div className="ml-4">
            <img
              src="/SampleCreatorNameSheet.png"
              alt="Sample File Format"
              width="150"
              height="300"
            />
            </div>
          </div>
          <div className="container flex mt-2 mb-2">
            <div className="w-1/2"> </div>
            <div className="w-1/2">
            <Field name="only_message_include_list">
              {({ field }) => (
                <Checkbox 
                {...field}
                checked={field.value}
                >
                </Checkbox>
              )}
            </Field>
            <span className="text-sm text-black font-bold">&nbsp;Check this box if you want to send messages ONLY to the included creators list on the file you provided.</span>
            </div>
          </div>
          <div className="flex justify-between mb-4">
            <div className="w-1/2 mr-2">
              <label className="block text-blue-700 text-sm font-bold mb-2" htmlFor="creatorsToOmit">
                Creators to Omit (CSV only)
              </label>
              <Field name="creators_to_omit">
                {({ field }) => (
                  <>
                    <Dragger
                      name="creatorsToOmit"
                      accept=".csv"
                      multiple={false}
                      beforeUpload={(file) => beforeUpload(file, setCreatorsToOmitFile, setCreatorsToOmitList, setOmitError, setFieldValue, "creators_to_omit")}
                      onRemove={() => handleFileRemove(setCreatorsToOmitFile, setCreatorsToOmitList, setOmitError, setFieldValue, "creators_to_omit")}
                      fileList={creatorsToOmitFile ? [creatorsToOmitFile] : []}
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">Click or drag CSV file to this area to upload</p>
                      <p className="ant-upload-hint">Support for a single CSV file upload. The file should have one column with header "creator_name".</p>
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
                          onClick={() => handleDeleteList(setCreatorsToOmitFile, setCreatorsToOmitList, setFieldValue, "creators_to_omit")}
                        >
                          <DeleteOutlined />
                        </button>
                      </>
                    )}
                  </>
                )}
              </Field>
            </div>
            <div className="w-1/2 ml-2">
              <label className="block text-blue-700 text-sm font-bold mb-2" htmlFor="creatorsToInclude">
                Creators to Include (CSV only)
              </label>
              <Field name="creators_to_include">
                {({ field }) => (
                  <>
                    <Dragger
                      name="creatorsToInclude"
                      accept=".csv"
                      multiple={false}
                      beforeUpload={(file) => beforeUpload(file, setCreatorsToIncludeFile, setCreatorsToIncludeList, setIncludeError, setFieldValue, "creators_to_include")}
                      onRemove={() => handleFileRemove(setCreatorsToIncludeFile, setCreatorsToIncludeList, setIncludeError, setFieldValue, "creators_to_include")}
                      fileList={creatorsToIncludeFile ? [creatorsToIncludeFile] : []}
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">Click or drag CSV file to this area to upload</p>
                      <p className="ant-upload-hint">Support for a single CSV file upload. The file should have one column with header "creator_name".</p>
                    </Dragger>
                    {includeError && (
                      <div className="mt-2 text-red-600">
                        {includeError}
                      </div>
                    )}
                    {creatorsToIncludeList.length > 0 && (
                      <>
                        <div className="mt-4 max-h-40 overflow-auto">
                          <h3 className="text-md font-semibold">Creators to Include:</h3>
                          <ul className="list-disc pl-5">
                            {creatorsToIncludeList.map((name, index) => (
                              <li key={index}>{name}</li>
                            ))}
                          </ul>
                        </div>
                        <button
                          type="button"
                          className="mt-2 bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                          onClick={() => handleDeleteList(setCreatorsToIncludeFile, setCreatorsToIncludeList, setFieldValue, "creators_to_include")}
                        >
                          <DeleteOutlined/>
                        </button>
                      </>
                    )}
                  </>
                )}
              </Field>
            </div>
          </div>
          <div className="flex justify-between mb-4 w-full mt-10">
            <button
              className="bg-black hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline"
              onClick={onPrev}
              type="button"
            >
              Back
            </button>
            <button
              className="automation-add-new-button-bg hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition duration-300 ease-in-out"
              type="submit"
            >
              Next
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddNewAutomationStepOneThree;