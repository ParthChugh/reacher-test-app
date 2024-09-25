import React from 'react';
import { Form, Formik, FormikValues } from "formik";
import { Spin } from "antd";
import { useAppSelector } from '../../hooks';
import HtmlContent from './HtmlContent';

interface AddNewEmailAutomationStepOneFourProps {
  onPrev: () => void;
  initialValues: FormikValues;
  handleLoginSubmit: (values: FormikValues, setSubmitting: (isSubmitting: boolean) => void) => void;
}

const AddNewEmailAutomationStepOneFour: React.FC<AddNewEmailAutomationStepOneFourProps> = ({
  onPrev,
  initialValues,
  handleLoginSubmit,
}) => {
  const shops = useAppSelector((state) => state.shops);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        handleLoginSubmit(values, setSubmitting);
      }}
      enableReinitialize
    >
      {({ isSubmitting, values}) => (
        <Form className="mt-6 mb-2 w-full">
          <div className="py-2">
            {/* Inserted HTML content */}
            <div>
              <HtmlContent 
              bodyContent={values.body}
              subjectContent={values.subject}
              brandImageFile={values.brand_image}
              productImageFile={values.product_image}
              oldBrandImageURL={values.old_brand_image_url ? values.old_brand_image_url : ''}
              oldProductImageURL={values.old_product_image_url ? values.old_product_image_url : ''}
              signature={values.signature}
              signoff={values.signoff}
              headline={values.headline}
              />
            </div>

            <div className="flex justify-between mb-4 w-full">
              <button
                  className=" bg-black hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline"
                  onClick={onPrev}
                  >
                  Back
              </button>
              <button
                  className="flex justify-between items-center automation-finish-and-save-bg hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition duration-300 ease-in-out"
                  type="submit"
                  disabled={isSubmitting}
                  >
                  {isSubmitting ? (
                      <div className="flex items-center justify-center mr-3">
                        <Spin
                          size="small" // This sets the size of the spinner; you can adjust it to "small", "default", or "large".
                          style={{ fontSize: '20px' }} // Adjusts the spinner size to be close to the Tailwind size (h-5 w-5).
                        />
                      </div>
                  ) : null}

                  <span className="inline-block">Finish and Save</span>
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddNewEmailAutomationStepOneFour;