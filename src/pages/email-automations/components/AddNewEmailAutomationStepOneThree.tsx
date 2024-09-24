import React, { useState } from "react";
import { Form, Formik, FormikValues, Field } from "formik";
import { MdTipsAndUpdates } from "react-icons/md";
import { Upload, message } from "antd";
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

interface AddNewEmailAutomationStepOneThreeProps {
  onNext: (values: FormikValues) => void;
  onPrev: () => void;
  initialValues: FormikValues;
  brandImageFile: File | null;
  productImageFile: File | null;
  setBrandImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  setProductImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const AddNewEmailAutomationStepOneThree: React.FC<AddNewEmailAutomationStepOneThreeProps> = ({
  onNext,
  onPrev,
  initialValues,
  brandImageFile,
  productImageFile,
  setBrandImageFile,
  setProductImageFile,
}) => {
  const [brandImageError, setBrandImageError] = useState<string | null>(null);
  const [productImageError, setProductImageError] = useState<string | null>(null);

  const handleImageUpload = (
    file: File,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
    fieldName: string
  ) => {
    setError(null);
    if (file.type.startsWith('image/')) {
      setFile(file);
      setFieldValue(fieldName, file);
    } else {
      setError("Please upload a valid image file.");
      message.error("Please upload a valid image file.");
    }
    return false; // Prevent automatic upload
  };

  const handleImageRemove = (
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
    fieldName: string
  ) => {
    setFile(null);
    setError(null);
    setFieldValue(fieldName, null);
  };

  const handleOldRemove = (
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
    fieldName: string,
    fieldUrlName: string
  ) => {
    setFieldValue(fieldName, null);
    setFieldValue(fieldUrlName, null);
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
            <span className="flex text-md text-black italic before:content-['●'] before:mr-2 p-1 mr-2">
              Here you can upload images that will be included within your email.
            </span>
            <span className="flex text-md text-black italic before:content-['●'] before:mr-2 p-1 mr-2">
              You can upload a banner style brand logo image that will be featured at the top of your email and a product image to be included in the body of your email.
            </span>
            <span className="flex text-md text-black italic before:content-['●'] before:mr-2 p-1 mr-2">
              On the next page you will be able to see a preview of your message to make sure it looks just right.
            </span>
          </div>
          <div className="flex justify-between mb-4">
            <div className="w-1/2 mr-2">
              <label className="block text-blue-700 text-sm font-bold mb-2" htmlFor="brand_image">
                Brand Image
              </label>
              <Field name="brand_image">
                {({ field }) => (
                  <>
                    <Dragger
                      name="brand_image"
                      accept="image/*"
                      multiple={false}
                      beforeUpload={(file) => handleImageUpload(file, setBrandImageFile, setBrandImageError, setFieldValue, "brand_image")}
                      onRemove={() => handleImageRemove(setBrandImageFile, setBrandImageError, setFieldValue, "brand_image")}
                      fileList={brandImageFile ? [brandImageFile] : []}
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">Click or drag an image file to this area to upload</p>
                      <p className="ant-upload-hint">Support for a single image file upload.</p>
                    </Dragger>
                    {brandImageError && (
                      <div className="mt-2 text-red-600">
                        {brandImageError}
                      </div>
                    )}
                    {(values.brand_image?.imageUrl || brandImageFile) && (
                      <div className="mt-4">
                        <div className="text-sm text-gray-500 mb-1">
                          <span className="font-semibold">Brand Image Preview:</span>
                        </div>
                        <img
                          src={values.brand_image?.imageUrl || URL.createObjectURL(brandImageFile)}
                          alt="Brand Image Preview"
                          style={{ width: '200px', height: '200px', objectFit: 'contain' }}
                        />
                      </div>
                    )}
                  </>
                )}
              </Field>
              { (values.old_brand_image_name && values.old_brand_image_url) && (
                <>
                <div className="mt-4 text-sm text-gray-500">
                  <span className="font-semibold">Current Brand Image:</span> {values.old_brand_image_name}
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <img src={values.old_brand_image_url} alt={values.old_brand_image_name} className="w-1/2" />
                </div>
                <button
                  type="button"
                  className="mt-4 bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                  onClick={() => handleOldRemove(setFieldValue, "old_brand_image_name", "old_brand_image_url")}
                >
                  Delete Old Brand Image <DeleteOutlined />
                </button>
                </>
              )}
            </div>
            <div className="w-1/2 ml-2">
              <label className="block text-blue-700 text-sm font-bold mb-2" htmlFor="product_image">
                Product Image
              </label>
              <Field name="product_image">
                {({ field }) => (
                  <>
                    <Dragger
                      name="product_image"
                      accept="image/*"
                      multiple={false}
                      beforeUpload={(file) => handleImageUpload(file, setProductImageFile, setProductImageError, setFieldValue, "product_image")}
                      onRemove={() => handleImageRemove(setProductImageFile, setProductImageError, setFieldValue, "product_image")}
                      fileList={productImageFile ? [productImageFile] : []}
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">Click or drag an image file to this area to upload</p>
                      <p className="ant-upload-hint">Support for a single image file upload.</p>
                    </Dragger>
                    {productImageError && (
                      <div className="mt-2 text-red-600">
                        {productImageError}
                      </div>
                    )}
                    {(values.product_image?.imageUrl || productImageFile) && (
                      <div className="mt-4">
                        <div className="text-sm text-gray-500 mb-1">
                          <span className="font-semibold">Product Image Preview:</span>
                        </div>
                        <img
                          src={values.product_image?.imageUrl || URL.createObjectURL(productImageFile)}
                          alt="Product Image Preview"
                          style={{ width: '200px', height: '200px', objectFit: 'contain' }}
                        />
                      </div>
                    )}
                  </>
                )}
              </Field>
              { (values.old_product_image_name && values.old_product_image_url) && (
                <>
                <div className="mt-4 text-sm text-gray-500">
                  <span className="font-semibold">Current Product Image:</span> {values.old_product_image_name}
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <img src={values.old_product_image_url} alt={values.old_product_image_name} className="w-1/2" />
                </div>
                <button
                  type="button"
                  className="mt-4 bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                  onClick={() => handleOldRemove(setFieldValue, "old_product_image_name", "old_product_image_url")}
                >
                  Delete Old Product Image <DeleteOutlined />
                </button>
                </>
              )}
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
              View Preview
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddNewEmailAutomationStepOneThree;