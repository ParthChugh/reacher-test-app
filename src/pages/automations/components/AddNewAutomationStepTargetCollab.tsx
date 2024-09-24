import React from "react";
import { FieldArray, Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { MdTipsAndUpdates } from "react-icons/md";
import FormikDatePickerComponent from "../../components/formikForms/FormikDatePicker";
import FormikSwitchComponent from "../../components/formikForms/FormikSwitch";
import FormikMultipleSelectField from "../../components/formikForms/FormikMultipleSelectField";
import FormikTextArea from "../../components/formikForms/FormikTextField";
import InputField from "../../components/forms/InputField";
import { useAppSelector } from "../../hooks";;


const CONTENT_PREFERENCE_OPTIONS = [
    { value: "No preference", label: "No preference" },
    { value: "Shoppable video", label: "Shoppable video" },
    { value: "Shoppable LIVE", label: "Shoppable LIVE" },
];

interface AddNewAutomationStepTargetCollabProps {
  onNext: (values: FormikValues) => void;
  onPrev: () => void;
  initialValues: FormikValues;
  automationType: string;
}

const validationSchema = Yup.object().shape({
    target_collab_invitation_name: Yup.string().required("Invitation Name is required"),
    target_collab_email: Yup.string().required("Email is required"),
    target_collab_phone: Yup.string()
    .matches(/^\d*$/, 'Phone number must consist of numbers without any country code, signs, or spaces')
    .notRequired(),
    target_collab_valid_until: Yup.string().required("Valid Until is required"),
    message_entry_target_collab: Yup.string().required("Message is required"),
    target_collab_product_comission_rates: Yup.array().of(
        Yup.object().shape({
          product_id: Yup.string().required(),
          commission_rate: Yup.number()
            .min(0, 'Commission rate must be at least 0.00')
            .max(80, 'Commission rate must be at most 80.00')
            .required('Commission rate is required'),
        })
      ),
    tc_dm_message: Yup.string().when('automationType', {
      is: "Message + Target Collab + Target Collab Card",
      then: Yup.string().required("TC Creator DM Message is required"),
    }),
});
const DEFAULT_CREATOR_DM_MESSAGE = "Hey {creator_name}! We just sent over a target collaboration invitation, please check it out. We're excited to work with you on promoting our products through TikTok. Let me know if you have any questions about the collaboration or our products!";

const AddNewAutomationStepTargetCollab: React.FC<AddNewAutomationStepTargetCollabProps> = ({
  onNext,
  onPrev,
  initialValues,
  automationType,
}) => {
    const shops = useAppSelector((state) => state.shops);

  return (
    <Formik
      initialValues={{
        ...initialValues,
        tc_dm_message: initialValues.tc_dm_message || DEFAULT_CREATOR_DM_MESSAGE
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => onNext(values)}
      enableReinitialize
    >
      {({ isSubmitting, values}) => (
        <Form className="mt-2 mb-2 w-full">
            <div className="flex flex-row">
            {/* Left Section */}
            <div className="w-1/2 p-6">
                <h3 className="text-1xl font-bold mb-4">Edit Target Collaboration</h3>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
                    <h1 className="text-2xl text-blue-500 font-bold mb-8"> {shops.selectedStoreName}'s Invite</h1>
                    <div className="flex items-center mb-2">
                        <label className="block text-sm font-semibold text-black mr-2 mb-6">
                            Invitation Name: <span className="text-red-500">*</span>
                        </label>
                        <FormikTextArea 
                        name="target_collab_invitation_name" 
                        maxLength={25} 
                        placeholder="i.e. My Invitation"
                        minimum_rows={1}
                        maximum_rows={1}
                         />
                    </div>
                    <div className="flex items-center">
                        <label className="block text-sm font-semibold text-black mr-2 mb-6">
                            Email: <span className="text-red-500">*</span>
                        </label>
                        <div className="ml-14 pl-3">
                            <InputField
                                type="text"
                                placeholder="i.e. email@email.com"
                                name="target_collab_email"
                                size="sm"
                            />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <label className="block text-sm font-semibold text-black mr-2 mb-6 ">
                            Phone Number:
                        </label>
                        <div className="ml-3"> 
                            <InputField
                                type="text"
                                placeholder="i.e. 4821234567"
                                name="target_collab_phone"
                                size="sm"
                            />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <label className="block text-sm font-semibold text-black mr-2 pb-6">
                            Valid Until: <span className="text-red-500">*</span>
                        </label>
                        <div className="mb-6 ml-9">
                            <FormikDatePickerComponent
                                name="target_collab_valid_until"
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-black mr-2 pb-4">
                            Message: <span className="text-red-500">*</span>
                        </label>
                        <div>
                            <FormikTextArea name="message_entry_target_collab" maxLength={500} />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <label className="block text-sm font-semibold text-black mr-2 pb-6">
                            Offer Free Samples?
                        </label>
                        <div className="mb-6 ml-2">
                            <FormikSwitchComponent
                                name="target_collab_offer_free_samples"
                                checked={values.target_collab_offer_free_samples}
                            />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <label className="block text-sm font-semibold text-black mr-2 pb-6">
                            Manually Approve Free Samples?
                        </label>
                        <div className="mb-6 ml-2"> 
                            <FormikSwitchComponent
                                name="target_collab_manually_approve"
                                disabled={!values.target_collab_offer_free_samples}
                                checked={values.target_collab_manually_approve}
                            />
                        </div>
                    </div>
                    <div>
                        <h3 className=" font-bold mb-4 mt-4">Commission Rates:</h3>
                        <FieldArray
                        name="target_collab_product_comission_rates"
                        render={arrayHelpers => (
                            <div>
                            {values.target_collab_product_comission_rates.map((product, index) => (
                                <div className="flex items-center mb-2" key={product.product_id}>
                                <label className="block text-sm font-semibold text-black mr-2 pb-6">
                                    Product ID: {product.product_id}
                                </label>
                                <InputField
                                    type="number"
                                    placeholder="Enter commission rate"
                                    name={`target_collab_product_comission_rates[${index}].commission_rate`}
                                    min="0.00"
                                    max="80.00"
                                    step="0.01"
                                    size="sm"
                                />
                                </div>
                            ))}
                            </div>
                        )}
                        />
                    </div>
                    <div className="mb-4 w-64">
                    <FormikMultipleSelectField
                      name="content_type"
                      placeHolder="Preferred Content Type"
                      options={CONTENT_PREFERENCE_OPTIONS}
                      label="Preferred Content Type"
                      isMultiple={false}
                    />
                  </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-1/2 p-6">
                <h3 className="block flex items-center text-1xl font-bold mb-4"> <MdTipsAndUpdates className="mr-2" /> Tips and Tricks </h3>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
                    <label className="block text-sm font-semibold text-black">
                        Invitation Name:
                    </label>
                    <p className="before:content-['●'] before:mr-2 text-gray-700">
                        Give this invitation a name that is easy to remember and understand.
                    </p>
                    <p className="before:content-['●'] before:mr-2 text-gray-700 mb-6">
                        Creators won't see this name.
                    </p>
                    <label className="block text-sm font-semibold text-black">
                        Valid Until:
                    </label>
                    <p className="before:content-['●'] before:mr-2 text-gray-700 mb-6">
                        During the valid period, creators can accept your invitation to collaborate and promote your products on TikTok.
                    </p>
                    <label className="block text-sm font-semibold text-black">
                        Contact Info (Email and Phone Number):
                    </label>
                    <p className="before:content-['●'] before:mr-2 text-gray-700">
                        Add your contact info to connect with creators.
                    </p>
                    <p className="before:content-['●'] before:mr-2 text-gray-700">
                        Phone number is optional.
                    </p>
                    <p className="before:content-['●'] before:mr-2 text-gray-700 mb-6">
                        Please enter the phone number without the area code. Example: 4081234567
                    </p>
                    <label className="block text-sm font-semibold text-black">
                        Message:
                    </label>
                    <p className="before:content-['●'] before:mr-2 text-gray-700">
                        Send a message to introduce yourself and share a bit about why you're excited to collaborate.
                    </p>
                    <p className="before:content-['●'] before:mr-2 text-red-700  mb-6">
                        You can use {'{creator_name}'} to send a message with the creator's username!
                    </p>
                    <label className="block text-sm font-semibold text-black">
                        Comission Rates:
                    </label>
                    <p className="before:content-['●'] before:mr-2 text-gray-700">
                        Commission rate in open collaboration: 10%
                    </p>
                    <p className="before:content-['●'] before:mr-2 text-gray-700 mb-6">
                        Set a higher comission rate to entice creators to promote that product. They will see a "higher comission" badge.
                    </p>
                {/* Add more informational content as necessary */}
                </div>
            </div>
            </div>
            {automationType === "Message + Target Collab + Target Collab Card" && (
                <>
                <label className="block text-sm font-semibold text-black">
                    Creator DM Message:
                </label>
                <p className="before:content-['●'] before:mr-2 text-gray-700">
                    This message will be sent to creators after the target collab invitation, and is sent through Creator DM
                </p>
                <p className="before:content-['●'] before:mr-2 text-red-700 mb-6">
                    You can use {'{creator_name}'} to personalize the message with the creator's username!
                </p>
                </>
            )}
            {automationType === "Message + Target Collab + Target Collab Card" && (
                <div className="mb-6">
                <label className="block text-sm font-semibold text-black mr-2 pb-4">
                    Creator DM Message: <span className="text-red-500">*</span>
                </label>
                <div>
                    <FormikTextArea name="tc_dm_message" maxLength={1800} />
                </div>
                </div>
            )}
          <div className="flex justify-between mb-4 w-full mt-6">
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

export default AddNewAutomationStepTargetCollab;
