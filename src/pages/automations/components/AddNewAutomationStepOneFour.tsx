import React, { useEffect, useState } from 'react';
import { Field, Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { MdTipsAndUpdates } from 'react-icons/md';
import { FaTimes } from 'react-icons/fa';

interface AddNewAutomationStepOneFourProps {
  onPrev: () => void;
  initialValues: FormikValues;
  handleLoginSubmit: any;
  followup_steps: any;
}

const validationSchema = Yup.object().shape({
  no_reply_automation: Yup.string().required("Message entry is required for no reply automation"),
  message_entry_interest: Yup.string().required("Message entry is required for interest expressed automation"),
  message_entry_max_samples: Yup.string().required("Message entry is required for max samples requested automation"),
});

const AddNewAutomationStepOneFour: React.FC<AddNewAutomationStepOneFourProps> = ({
  onPrev,
  initialValues,
  handleLoginSubmit,
  followup_steps
}) => {
  // Initialize with default messages
  const [followupSteps, setFollowupSteps] = useState<Array<{ id: number; message: string; days_after_previous: string, step_id: number }>>([
    {
      id: Date.now(),
      message: "Hi {creator_name}, we wanted to follow up on our previous message.",
      days_after_previous: "1",
      step_id: 1,
    },
  ]);

  // Set the first follow-up step as the default selected step
  const [activeStep, setActiveStep] = useState<number>(followupSteps.length ? followupSteps[0].step_id : 0);

  useEffect(() => {
    if(followup_steps && followup_steps.length > 0){
      setFollowupSteps(followup_steps);
      setActiveStep(followup_steps[0].step_id);
    }
  }, [followup_steps]);


  // Function to add a new follow-up step
  const addFollowUpStep = () => {
    if (followupSteps.length < 3) {
      const newStep = {
        id: Date.now(), // Unique identifier
        message: `Hi {creator_name}, this is a reminder to check out our previous messages.`,
        days_after_previous: (followupSteps.length + 1).toString(), // Increment the days
        step_id: followupSteps.length + 1,
      };
      setFollowupSteps([...followupSteps, newStep]);
      setActiveStep(followupSteps.length + 1); // Set the newly added step as active
    }
  };

  // Function to remove the last follow-up step
  const removeLastFollowUpStep = () => {
      const updatedSteps = followupSteps.slice(0, -1); // Remove the last step
      setFollowupSteps(updatedSteps);
      setActiveStep(updatedSteps.length > 0 ? updatedSteps[updatedSteps.length - 1].step_id : followupSteps[0].step_id);
  };

  // Function to handle message change
  const handleMessageChange = (step_id: number, value: string) => {
    const updatedSteps = followupSteps.map(step =>
      step.step_id === step_id ? { ...step, message: value } : step
    );
    setFollowupSteps(updatedSteps);
  };

  // Function to handle days_after_previous change
  const handleDaysAfterChange = (step_id: number, value: string) => {
    const updatedSteps = followupSteps.map(step =>
      step.step_id === step_id ? { ...step, days_after_previous: value } : step
    );
    setFollowupSteps(updatedSteps);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        // Incorporate follow-up steps into the form values before submitting
        const extendedValues = {
          ...values,
          followupSteps,
        };
        handleLoginSubmit(extendedValues, setSubmitting);
      }}
      enableReinitialize
    >
      {({ isSubmitting, values }) => (
        <Form className="mt-6 mb-2 w-full">
          {/* Tips and Tricks Section */}
          <label className="block text-sm font-medium text-black mb-2 flex items-center">
            <MdTipsAndUpdates className="mr-2" /> Tips and Tricks
          </label>
          <div className="bg-white border border-ant-input-border rounded-lg col-span-1 mb-5 inline-block">
            <span className="flex text-md text-black italic before:content-['●'] before:mr-2 p-2 mr-2">
              You can use {'{creator_name}'} to send a message with the creator's name!
            </span>
          </div>

          {/* Follow-Up Section */}
          <div className="flex items-center mb-4">
            <label className="text-lg text-black-800 font-medium">
              Follow Up if <span className="text-pink-500">No Reply</span>
            </label>
          </div>
          <div className="bg-white rounded-lg w-full flex overflow-hidden">
            {/* Sidebar with Follow-Up Steps */}
            <div className="w-4/12 bg-gray-100 p-6 border-r border-gray-200">

              {/* Dynamic Follow-Up Steps */}
              {followupSteps.map((step, index) => (
                <div
                  key={step?.step_id}
                  className={`relative bg-white p-3 rounded-lg mb-4 border cursor-pointer ${
                    activeStep === step?.step_id ? 'border-2 border-black' : ''
                  }`}
                  onClick={() => setActiveStep(step?.step_id)}
                >
                  <div>
                    <p>
                      <span className="bg-gray-200 rounded-full px-2.5 py-1 text-sm">{index + 1}</span>{' '}
                      {index === 0
                        ? '1st follow Up'
                        : index === 1
                        ? '2nd follow Up'
                        : '3rd follow Up'}
                    </p>
                    <div className="mt-2 ml-1 text-xs">
                      <p>
                        <input
                          type="text"
                          className="w-8 h-6 border border-black px-2 py-1 rounded"
                          value={step?.days_after_previous}
                          onChange={(e) => handleDaysAfterChange(step.step_id, e.target.value)}
                          placeholder="Days"
                        />{' '}
                        days after previous message
                      </p>
                    </div>
                  </div>
                  {/* Close Icon only on the last step */}
                  {index === followupSteps.length - 1 && (
                    <button
                      type="button"
                      className="absolute top-2 right-2 text-dark-500 hover:text-dark-700"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the parent onClick
                        removeLastFollowUpStep();
                      }}
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              ))}

              {/* Add Follow-Up Button */}
              {followupSteps.length < 3 && (
                <button
                  type="button"
                  className="bg-black hover:bg-gray-900 text-white text-sm font-semibold py-2 px-4 mb-4 rounded-md focus:outline-none focus:shadow-outline"
                  onClick={addFollowUpStep}
                >
                  Add follow-up message
                </button>
              )}
            </div>

            {/* Content Area for Active Step */}
            <div className="w-8/12 p-6">
              {/* Initial Message Content */}
              {activeStep === null && (
                <div className="flex flex-col h-full">
                  <h2 className="text-xl font-bold mb-4">Initial Message</h2>
                  <p className="text-gray-600 mb-4">
                    Write the initial message that will be sent to the user.
                  </p>
                  <Field
                    as="textarea"
                    name="no_reply_automation"
                    className="flex-grow p-4 border border-gray-300 rounded-lg mb-4 h-40"
                    placeholder="Hi {creator_name}, just wanted to reach out and connect with you."
                  />
                </div>
              )}

              {/* Dynamic Follow-Up Content */}
              {followupSteps.map((step, index) => (
                activeStep === step.step_id && (
                  <div className="flex flex-col h-full" key={step.step_id}>
                    <h2 className="text-xl font-bold mb-4">
                      {index === 0
                        ? '1st Follow-Up Message'
                        : index === 1
                        ? '2nd Follow-Up Message'
                        : '3rd Follow-Up Message'}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Write a follow-up message that will be sent after{' '}
                      {step.days_after_previous || 'specified number of'} days.
                    </p>
                    <textarea
                      value={step.message}
                      onChange={(e) => handleMessageChange(step.step_id, e.target.value)}
                      className="flex-grow p-4 border border-gray-300 rounded-lg mb-4 h-40"
                      placeholder="Type your follow-up message here..."
                    />
                    <div className="text-gray-500 text-right mb-4">
                      {step.message.length}/1800 characters
                    </div>
                  </div>
                )
              ))}

              {/* If no follow-up is active and no step is selected */}
              {activeStep !== null && followupSteps.find(step => step.step_id === activeStep) === undefined && (
                <div className="flex flex-col h-full">
                  <h2 className="text-xl font-bold mb-4">Select a Follow-Up Message</h2>
                  <p className="text-gray-600 mb-4">
                    Click on a follow-up step from the sidebar to edit its message.
                  </p>
                </div>
              )}

              {/* If no step is active, show initial message content */}
              {activeStep === null && followupSteps.length === 0 && (
                <div className="flex flex-col h-full">
                  <h2 className="text-xl font-bold mb-4">Initial Message</h2>
                  <p className="text-gray-600 mb-4">
                    Write the initial message that will be sent to the user.
                  </p>
                  <Field
                    as="textarea"
                    name="no_reply_automation"
                    className="flex-grow p-4 border border-gray-300 rounded-lg mb-4 h-40"
                    placeholder="Hi {creator_name}, just wanted to reach out and connect with you."
                  />
                </div>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="py-4">
            <div className="flex justify-between mb-4 w-full">
              <button
                type="button"
                className="bg-black hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline"
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

export default AddNewAutomationStepOneFour;
