import React from "react";
import { Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";
import FormikTextArea from "../../components/formikForms/FormikTextField";
import { MdTipsAndUpdates } from "react-icons/md";

interface AddNewAutomationStepOneTwoProps {
  onNext: (values: FormikValues) => void;
  onPrev: () => void;
  initialValues: FormikValues;
}

const validationSchema = Yup.object().shape({
  message_entry: Yup.string().required("Message Entry is required"),
});

const AddNewAutomationStepOneTwo: React.FC<AddNewAutomationStepOneTwoProps> = ({
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
            <span className="flex text-md text-black italic before:content-['●'] before:mr-2 p-2 mr-2"> You can use {'{creator_name}'} to send a message with the creator's name!</span>
          </div>
          <FormikTextArea name="message_entry" label="Message Entry" maxLength={2000} />
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

export default AddNewAutomationStepOneTwo;
