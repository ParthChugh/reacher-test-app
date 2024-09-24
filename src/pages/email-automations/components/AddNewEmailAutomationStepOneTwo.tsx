import React from "react";
import { Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";
import FormikTextArea from "../../components/formikForms/FormikTextField";
import { MdTipsAndUpdates } from "react-icons/md";
import InputField from "../../components/forms/InputField";

interface AddNewEmailAutomationStepOneTwoProps {
  onNext: (values: FormikValues) => void;
  onPrev: () => void;
  initialValues: FormikValues;
}

const validationSchema = Yup.object().shape({
  subject: Yup.string().required("The subject of the email is required"),
  body: Yup.string().required("The body of the email is required"),
  signature: Yup.string().required("The signature of the email is required"),
  signoff: Yup.string().required("The name in the signature is required"),
});

const AddNewEmailAutomationStepOneTwo: React.FC<AddNewEmailAutomationStepOneTwoProps> = ({
  onNext,
  onPrev,
  initialValues,
}) => {

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => onNext(values)}
      enableReinitialize
    >
      {({ isSubmitting}) => (
        <Form className="mt-6 mb-2 w-full">
          <label className="block text-sm font-medium text-black mb-2 flex items-center">
            <MdTipsAndUpdates className="mr-2" /> Tips and Tricks
          </label>
          <div className="bg-white border border-ant-input-border rounded-lg col-span-1 mb-5 inline-block">
            <span className="flex text-md text-black italic before:content-['●'] before:mr-2 p-2 mr-2"> The headline will be in bold at the top of the email.</span>
            <span className="flex text-md text-black italic before:content-['●'] before:mr-2 p-2 mr-2"> In the body, we recommend you introduce yourself/brand to the creator and briefly describe the product you are communicating about.</span>
            <span className="flex text-md text-black italic before:content-['●'] before:mr-2 p-2 mr-2"> You can use {'{creator_name}'} to send a message with the creator's name!</span>
            <span className="flex text-md text-black italic before:content-['●'] before:mr-2 p-2 mr-2"> You will be able to also pick the salutation phrase and the name you would like to sign off (shop name vs your name!).</span>
            <span className="flex text-md text-black italic before:content-['●'] before:mr-2 p-2 mr-2"> On the next page, you will be able to upload brand and product images to give the email a real professional look!</span>
          </div>
          <InputField
            type="text"
            placeholder="i.e. Are you interested in a collab?"
            name="subject"
            label="Email Subject"
            size="sm"
          />
          <InputField
            type="text"
            placeholder="i.e. Hey! We would love to work with you!"
            name="headline"
            label="Email Headline"
            size="sm"
          />
          <FormikTextArea 
            name="body" 
            placeholder="i.e. My name is Bora and I am reaching out because I think you would be a great partner for our brand Reacher! We would love for you to review product xyz. Here is a picture of the product we would like you to review." 
            label="Email Body Entry"
            maxLength={5000} 
          />
          <InputField
            type="text"
            placeholder="i.e. Best/Sincerely/Thanks"
            name="signature"
            label="Email Signature"
            size="sm"
          />
          <InputField
            type="text"
            placeholder="i.e. Bora/ReacherApp"
            name="signoff"
            label="Signature Name"
            size="sm"
          />

          <div className="flex justify-between mb-4 w-full mt-10">
            <button
              className=" bg-black hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline"
              onClick={onPrev}
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

export default AddNewEmailAutomationStepOneTwo;