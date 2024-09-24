import React, { useState, useEffect } from "react";
import { Field, Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";
import FormikTextArea from "../../components/formikForms/FormikTextField";
import { InboxOutlined } from '@ant-design/icons';
import { Upload } from "antd";

const { Dragger } = Upload;

interface AddNewAutomationStepMessageImageProps {
  onNext: (values: FormikValues) => void;
  onPrev: () => void;
  initialValues: FormikValues;
}

const validationSchema = Yup.object().shape({
  message_entry: Yup.string().required("Message Entry is required"),
});

const AddNewAutomationStepMessageImage: React.FC<AddNewAutomationStepMessageImageProps> = ({
  onNext,
  onPrev,
  initialValues,
}) => {
  const [imageError, setImageError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(initialValues.image || null);

  useEffect(() => {
    // Cleanup function to revoke the URL on component unmount
    return () => {
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]); // Dependency on 'file' ensures it revokes URL when file changes

  const handleFileChange = (
    file: File,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
    fieldName: string
  ) => {
    setError(null); // Clear any previous error
    if (file.preview) {
      URL.revokeObjectURL(file.preview); // Revoke the previous file's URL
    }
    file.preview = URL.createObjectURL(file); // Create a new URL
    setFile(file);
    setFieldValue(fieldName, file); // Update the form field value
    return false; // Prevent the file from being uploaded
  };

  const handleFileRemove = (
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
    fieldName: string
  ) => {
    if (file?.preview) {
      URL.revokeObjectURL(file.preview); // Revoke the URL
    }
    setFile(null);
    setError(null);
    setFieldValue(fieldName, null); // Reset the form state
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => onNext(values)}
      enableReinitialize
    >
      {({ setFieldValue, values }) => (
        <Form className="mt-6 mb-2 w-full">
          <FormikTextArea name="message_entry" label="Message Entry" maxLength={2000} />
          <label className="block text-sm font-medium text-black mb-2">Image</label>
          <Field name="image">
            {({ field }) => (
              <div>
                <Dragger
                  name="image"
                  accept=".png,.jpg,.jpeg"
                  multiple={false}
                  beforeUpload={(file) => {
                    // Modified the beforeUpload function inline for simplicity
                    setFile(null);
                    setFieldValue(field.name, null);
                    return handleFileChange(file, setFile, setImageError, setFieldValue, field.name);
                  }}
                  onRemove={() => handleFileRemove(setFile, setImageError, setFieldValue, field.name)}
                  fileList={file ? [{
                    uid: file.name,
                    name: file.name,
                    status: 'done',
                    url: file.preview // Using the preview URL
                  }] : []}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag image file to this area to upload</p>
                  <p className="ant-upload-hint">Support for a single file upload</p>
                </Dragger>
                {
                  values.image_name && (
                    <div className="mt-2 flex text-sm items-center text-black font-semibold">
                    <span>Previously Uploaded Image: <span className="text-blue-600"> {values.image_name} </span></span>
                    </div>
                )}
              </div>
            )}
          </Field>
          {imageError && <div className="mt-2 text-red-600">{imageError}</div>}
          {!file && (
          <div className="mt-2 text-sm text-gray-400">Warning: No new image selected. Saving now will not affect the image to be sent.</div>
          )}
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

export default AddNewAutomationStepMessageImage;