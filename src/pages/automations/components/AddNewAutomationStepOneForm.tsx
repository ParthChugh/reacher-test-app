import React from "react";
import { ErrorMessage, Form, Formik, FormikValues } from "formik";
import InputField from "../../components/forms/InputField";
//import FormikSelectField from "../../components/formikForms/FormikSelectField";
//import FormikFollowerCountSelect from "../components/FormikFollowerCountSelect";
//import FormikEngagementRateSelect from "../components/FormikEngagementRateSelect";
import FormikMultipleSelectField from "../../components/formikForms/FormikMultipleSelectField";
import FormikAddToList from "../../components/formikForms/FormikAddToList";
import TextError from "../../components/forms/TextError";
import { useAppSelector } from "../../hooks";
import WeeklyAutomationSchedule from "./WeeklyAutomationSchedule";
import getValidationSchema  from "./validationSchemaStepOne";

interface AddNewAutomationStepOneFormProps {
  onNext: (values: FormikValues) => void;
  initialValues: FormikValues;
  onReturn: () => void;
}

const CATEGORY_OPTIONS = [
  { value: "Automotive & Motorcycle", label: "Automotive & Motorcycle" },
  { value: "Baby & Maternity", label: "Baby & Maternity" },
  { value: "Beauty & Personal Care", label: "Beauty & Personal Care" },
  { value: "Books, Magazines & Audio", label: "Books, Magazines & Audio" },
  { value: "Collectibles", label: "Collectibles" },
  { value: "Computers & Office Equipment", label: "Computers & Office Equipment" },
  { value: "Fashion Accessories", label: "Fashion Accessories" },
  { value: "Food & Beverages", label: "Food & Beverages" },
  { value: "Furniture", label: "Furniture" },
  { value: "Health", label: "Health" },
  { value: "Home Improvement", label: "Home Improvement" },
  { value: "Home Supplies", label: "Home Supplies" },
  { value: "Household Appliances", label: "Household Appliances" },
  { value: "Jewelry Accessories & Derivatives", label: "Jewelry Accessories & Derivatives" },
  { value: "Kitchenware", label: "Kitchenware" },
  { value: "Luggage & Bags", label: "Luggage & Bags" },
  { value: "Menswear & Underwear", label: "Menswear & Underwear" },
  { value: "Pet Supplies", label: "Pet Supplies" },
  { value: "Phones & Electronics", label: "Phones & Electronics" },
  { value: "Shoes", label: "Shoes" },
  { value: "Sports & Outdoor", label: "Sports & Outdoor" },
  { value: "Textiles & Soft Furnishings", label: "Textiles & Soft Furnishings" },
  { value: "Tools & Hardware", label: "Tools & Hardware" },
  { value: "Toys & Hobbies", label: "Toys & Hobbies" },
  { value: "Womenswear & Underwear", label: "Womenswear & Underwear" }
];

const CATEGORY_OPTIONS_UK = [
  { value: "Beauty", label: "Beauty" },
  { value: "Electronics", label: "Electronics" },
  { value: "Fashion", label: "Fashion" },
  { value: "Food", label: "Food" },
  { value: "Home & Lifestyle", label: "Home & Lifestyle" },
  { value: "Mum & Baby", label: "Mum & Baby" },
  { value: "Personal Care & Health", label: "Personal Care & Health" },
];

const AGE_OPTIONS = [
  { value: "18-24", label: "18 - 24" },
  { value: "25-34", label: "25 - 34" },
  { value: "35-44", label: "35 - 44" },
  { value: "45-54", label: "45 - 54" },
  { value: "55+", label: "55+" },
]

const AGE_OPTIONS_UK = [
  { value: "18-24", label: "18 - 24" },
  { value: "25-34", label: "25 - 34" },
  { value: "35 and above", label: "35 and above" },
]

const GENDER_OPTIONS = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "All", label: "All" },
]

const GMV_OPTIONS = [
  { value: "$0-$100", label: "$0 - $100" },
  { value: "$100-$1K", label: "$100 - $1K" },
  { value: "$1K-$10K", label: "$1K - $10K" },
  { value: "$10K+", label: "$10K+" }
]

const GPM_OPTIONS_UK = [
  { value: "£0-£5", label: "£0 - £5" },
  { value: "£5-£10", label: "£5 - £10" },
  { value: "£10-£25", label: "£10 - £25" },
  { value: "£25-£50", label: "£25 - £50" },
  { value: "£50+", label: "£50+" }
]

const VIDEO_VIEWS_OPTIONS_UK = [
  { value: "0-100", label: "0 - 100" },
  { value: "100-500", label: "100 - 500" },
  { value: "500-1000", label: "500 - 1000" },
  { value: "1000-5000", label: "1000 - 5000" },
  { value: "5000+", label: "5000+" }
]

const FOLLOWERS_COUNT_OPTIONS = [
  { value: "0-10K", label: "0 - 10K" },
  { value: "10K-50K", label: "10K - 50K" },
  { value: "50K-100K", label: "50K - 100K" },
  { value: "100K-200K", label: "100K - 200K" },
  { value: "200K-500K", label: "200K - 500K" },
  { value: "500K-1M", label: "500K - 1M" },
  { value: "1M+", label: "1M+" }
]

const FOLLOWERS_COUNT_OPTIONS_UK = [
  { value: "0-1K", label: "0 - 1K"},
  { value: "1K-5K", label: "1K - 5K" },
  { value: "5K-10K", label: "5K - 10K" },
  { value: "10K-50K", label: "10K - 50K" },
  { value: "50K-100K", label: "50K - 100K" },
  { value: "more than 100K", label: "More Than 100K" }
]

const ENGAGEMENT_OPTIONS = [
  { value: "1", label: "More than 1%" },
  { value: "2", label: "More than 2%" },
  { value: "3", label: "More than 3%" },
  { value: "4", label: "More than 4%" },
  { value: "5", label: "More than 5%" },
  { value: "10", label: "More than 10%" },
  { value: "15", label: "More than 15%" },
  { value: "20", label: "More than 20%" }
]

const UNITS_SOLD_OPTIONS = [
  { value: "0-10", label: "0 - 10" },
  { value: "10-100", label: "10 - 100" },
  { value: "100-1K", label: "100 - 1K" },
  { value: "1K+", label: "1K+" }
]

const AVERAGE_VIEWS_OPTIONS = [
  { value: "100", label: "More than 100 views" },
  { value: "500", label: "More than 500 views" },
  { value: "1000", label: "More than 1000 views" },
  { value: "5000", label: "More than 5000 views" },
  { value: "10000", label: "More than 10000 views" },
  { value: "50000", label: "More than 50000 views" },
  { value: "100000", label: "More than 100000 views" }
]

const AUTOMATION_TYPE_OPTIONS = [
  { value: "Message", label: "Message" },
  { value: "Message + Image", label: "Message + Image" },
  { value: "Message + Product Card", label: "Message + Product Card" },
  { value: "Message + Target Collab", label: "Target Collaboration" },
  { value: "Message + Target Collab + Target Collab Card", label: "Target Collaboration + Message + Target Collaboration Card (*BETA*)" },
];


const AddNewAutomationStepOneForm: React.FC<
  AddNewAutomationStepOneFormProps
> = ({ onNext, onReturn, initialValues }) => {

  const shops = useAppSelector((state) => state.shops);
  const validationSchema = getValidationSchema(shops.selectedStoreRegion);
  const format = 'HH:mm';
  const timePickerStyles = {
    outline: 'none', // Remove default outline
    boxShadow: 'none', // Remove default shadow
    border: '1px solid #e5e7eb', // Border to match react-select
    padding: '8px', // Add some padding
    width: '86%', // Set width to 86%
    borderRadius: '4px', // Match rounded corners
    color: 'gray', // Text color
    fontSize: '1rem', // Font size
    lineHeight: '1.5', // Line height
  };
  const inputStyles = {
    padding: '10px', // Add padding
    width: '86%', // Ensure it takes full width
    height: '40px', // Set a fixed height to match TimePicker
    color: 'gray', // Text color
    fontSize: '1rem', // Font size to match TimePicker
    lineHeight: '1.5', // Line height to match TimePicker
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => onNext(values)}
      enableReinitialize
    >
      {({ isSubmitting, errors, values, touched, setFieldValue, validateField  }) => (
        <Form className="mt-6 mb-2 w-full">

          <InputField
            type="text"
            placeholder="i.e. Mystery Box New Year Sale"
            name="automation_name"
            label="Automation Name"
            size="md"
          />

          <div className="mb-6">
            <FormikMultipleSelectField
              isMultiple={false}
              name="automation_type"
              placeHolder="Select Automation Type"
              consistentLabel="Automation Type"
              options={AUTOMATION_TYPE_OPTIONS}
            />
            <ErrorMessage name={"automation_type"} component={TextError} />
          </div>

          {(values.automation_type === "Message + Product Card" || 
            values.automation_type === "Message + Target Collab" ||
            values.automation_type === "Message + Target Collab + Target Collab Card") && (
            <FormikAddToList
              name="product_id"
              label="Product ID"
              placeHolder="i.e. 142735249054578"
              listItems={values.product_id}
              maxListLenght={3}
              disabled={values.automation_type === "Message" || values.automation_type === "Message + Image"}
            />
          )}

          <WeeklyAutomationSchedule
            values={values}
            setFieldValue={setFieldValue}
            format={format}
            timePickerStyles={timePickerStyles}
            inputStyles={inputStyles}
            validateField={validateField}
          />

          <div>
            <p className="block text-sm font-medium text-black mb-2">
              Automation Filters
            </p>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-10">
              <div>
                <p className="block text-sm font-medium mb-2 creator-label-color">
                Creators
                </p>
                <div className="flex flex-col">
                  { shops.selectedStoreRegion === "UK" ? (
                    <div className="mb-4">
                      <FormikMultipleSelectField
                        name="category"
                        placeHolder="Category"
                        options={CATEGORY_OPTIONS_UK}
                        label="Category"
                      />
                    </div>
                  ) : (
                    <div className="mb-4">
                      <FormikMultipleSelectField
                        name="category"
                        placeHolder="Category"
                        options={CATEGORY_OPTIONS}
                        label="Category"
                      />
                    </div>
                  )}
                  {shops.selectedStoreRegion === "UK" ? (
                    <div className="mb-4">
                      <FormikMultipleSelectField
                        name="followers"
                        placeHolder="Followers"
                        options={FOLLOWERS_COUNT_OPTIONS_UK}
                        label="Followers"
                      />
                    </div>
                  ) : (
                    <div className="mb-4">
                      <FormikMultipleSelectField
                        name="followers"
                        placeHolder="Followers"
                        options={FOLLOWERS_COUNT_OPTIONS}
                        label="Followers"
                      />
                    </div> 
                  )}
                </div>
              </div>

              <div>
                <p className="block text-sm font-medium mb-2 followers-label-color">
                Followers
                </p>
                <div className="flex flex-col">
                  {shops.selectedStoreRegion === "UK" ? (
                    <div className="mb-4">
                      <FormikMultipleSelectField
                        name="age"
                        placeHolder="Age"
                        options={AGE_OPTIONS_UK}
                        label="Age"
                      />
                    </div>
                  ) : (
                    <div className="mb-4">
                      <FormikMultipleSelectField
                        name="age"
                        placeHolder="Age"
                        options={AGE_OPTIONS}
                        label="Age"
                      />
                    </div>
                  )}
                  <div className="mb-4">
                    <FormikMultipleSelectField
                      isMultiple={false}
                      name="gender"
                      placeHolder="Gender"
                      options={GENDER_OPTIONS}
                      label="Gender"
                    />
                  </div>
                </div>
              </div>

              { shops.selectedStoreRegion === "US" ? (
                  <div>
                  <p className="block text-sm font-medium mb-2 performance-label-color">
                  Performance
                  </p>
                  <div className="flex flex-col">
                    <div className="mb-4">
                      <FormikMultipleSelectField
                        name="gmv"
                        placeHolder="GMV"
                        options={GMV_OPTIONS}
                        label="GMV"
                      />
                    </div>
  
                    <div className="mb-4">
                      <FormikMultipleSelectField
                        isMultiple={false}
                        name="engagement"
                        placeHolder="Engagement Rate"
                        options={ENGAGEMENT_OPTIONS}
                        label="Engagement Rate"
                      />
                    </div>
  
                    <div className="mb-4">
                      <FormikMultipleSelectField
                        name="units"
                        placeHolder="Units Sold"
                        options={UNITS_SOLD_OPTIONS}
                        label="Units Sold"
                      />
                    </div>
  
                    <div className="mb-4">
                      <FormikMultipleSelectField
                        isMultiple={false}
                        name="views"
                        placeHolder="Average Views"
                        options={AVERAGE_VIEWS_OPTIONS}
                        label="Average Views"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                <p className="block text-sm font-medium mb-2 performance-label-color">
                Performance
                </p>
                <div className="flex flex-col">
                  <div className="mb-4">
                    <FormikMultipleSelectField
                      name="video_gpm"
                      placeHolder="GPM (GMV per 1000 views)"
                      options={GPM_OPTIONS_UK}
                      label="GPM (GMV per 1000 views)"
                    />
                  </div>

                  <div className="mb-4">
                    <FormikMultipleSelectField
                      name="video_views"
                      placeHolder="Average Video Views"
                      options={VIDEO_VIEWS_OPTIONS_UK}
                      label="Average Video Views"
                    />
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>
          <div className="flex justify-between mb-4 w-full mt-2">
            <button
              className="bg-black hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline"
              disabled={isSubmitting}
              onClick={onReturn}
            >
              Return to Automations
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

export default AddNewAutomationStepOneForm;
