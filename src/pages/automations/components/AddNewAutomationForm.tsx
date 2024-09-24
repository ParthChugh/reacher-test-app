import React, { useState } from "react";
import { FormikValues } from "formik";
import { FormikContext } from "formik";
import AddNewAutomationStepOneForm from "./AddNewAutomationStepOneForm";
import AddNewAutomationStepOneTwo from "./AddNewAutomationStepOneTwo";
import { postAddAutomation, getAutomations } from "../../store/automation";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { toast } from "react-toastify";
import AddNewAutomationStepOneThree from "./AddNewAutomationStepOneThree";
import AddNewAutomationStepTargetCollab from "./AddNewAutomationStepTargetCollab";
import { Steps } from 'antd';
import { ApiTwoTone, MessageTwoTone, ContactsTwoTone, AlertTwoTone } from '@ant-design/icons';
import AddNewAutomationStepOneFour from "./AddNewAutomationStepOneFour";
import AddNewAutomationStepMessageImage from "./AddNewAutomationStepMessageImage";

const MESSAGE_ENTRY__DEFAULT_CONTENT =
"Hey {creator_name}!\n\nWe love the content that you put out and would love to be a part of that. We can see our products aligning with your brand and would love to help others see that too.\n \nWe would love to get you involved in our campaign on TikTok Shop and we're willing to boost high quality content so you can make more sales with 20% commissions! As a token of our appreciation, we'd love to send you a sample!\n\nPlease let us know if you're interested and if you have any questions.\n\nThanks and I looking forward to collaborating with you!\n";

const MESSAGE_ENTRY_NO_REPLY_DEFAULT_CONTENT =
"Hey there, just following up to see if you had a chance to check out any of our products? Let me know if you have any questions or need help with anything! We would love to work with you!";

const MESSAGE_ENTRY_INTEREST_DEFAULT_CONTENT = 
  "Thank you for your interest in collaborating with us. Please add the products that you are interested in to your product showcase. We look forward to working with you!";

const MESSAGE_ENTRY_MAX_SAMPLES_REQUESTED_DEFAULT_CONTENT = 
  "It looks like you have reached the maximum number of samples requested, but we would still love to work with you! Please join our target collaboration. Thanks! -Reacher";

const MESSAGE_ENTRY_TARGET_COLLAB_DEFAULT_CONTENT =
  "I would love to collaborate with you because I can see that you love to post related content!"
  
interface AddNewAutomationFormProps {
  onReturn: () => void;
  automationData?: any;
}

const AddNewAutomationForm: React.FC<AddNewAutomationFormProps> = ({
  onReturn,
  automationData,
}) => {
  const auth = useAppSelector((state) => state.auth);
  const shops = useAppSelector((state) => state.shops);
  const dispatch = useAppDispatch();

  const new_automation_description = 'Enter the automation essentials.';
  const message_and_taget_collab_description = 'Enter the message to be sent to the creator.';
  const creators_and_timeframe_description = 'Upload the creators to omit/include.';
  const follow_up_description = 'Enter the follow up settings.';
  const steps = [
    {
      title: <span style={{ fontWeight: 'bold' }}>New Automation</span>,
      description: new_automation_description,
      icon: <ApiTwoTone />,
    },
    {
      title:  <span style={{ fontWeight: 'bold' }}>Message & Target Collab</span>,
      description: message_and_taget_collab_description,
      icon: <MessageTwoTone />,
    },
    {
      title: <span style={{ fontWeight: 'bold' }}>Creators to Omit/Include</span>,
      description: creators_and_timeframe_description,
      icon: <ContactsTwoTone />,
    },
    {
      title: <span style={{ fontWeight: 'bold' }}>Follow Ups</span>,
      description: follow_up_description,
      icon: <AlertTwoTone />,
    },
  ];

  const [step, setStep] = useState<number>(1);

  const defaultAmount = shops.selectedStoreRegion === "UK" ? "500" : "2500";
  const [formData, setFormData] = useState<FormikValues>({
    message_entry: MESSAGE_ENTRY__DEFAULT_CONTENT,
    message_entry_no_reply: MESSAGE_ENTRY_NO_REPLY_DEFAULT_CONTENT,
    message_entry_interest: MESSAGE_ENTRY_INTEREST_DEFAULT_CONTENT,
    message_entry_max_samples: MESSAGE_ENTRY_MAX_SAMPLES_REQUESTED_DEFAULT_CONTENT,

    // Target Collab Default Values
    message_entry_target_collab: MESSAGE_ENTRY_TARGET_COLLAB_DEFAULT_CONTENT,
    target_collab_invitation_name: "",
    target_collab_valid_until: "",
    target_collab_email: "",
    target_collab_phone: "",
    target_collab_offer_free_samples: false,
    target_collab_manually_approve: false,
    target_collab_product_comission_rates: [{}],
    content_type: "No preference",

    days: "",
    no_reply_automation: false,
    interest_automation: false,
    max_samples_automation: false,

    // default values
    product_id: [],
    automation_name: "",
    followers: [],
    engagement: "",
    gender: "",
    automation_type: "",
    gmv: [],
    category: [],
    age: [],
    units: [],
    views: "",
    creators_to_omit: [],
    creators_to_include: [],
    only_message_include_list: false,
    video_gpm: [],
    video_views: [],
    monday_time: "07:00",
    tuesday_time: "07:00",
    wednesday_time: "07:00",
    thursday_time: "07:00",
    friday_time: "07:00",
    saturday_time: "07:00",
    sunday_time: "07:00",
    monday_amount: defaultAmount,
    tuesday_amount: defaultAmount,
    wednesday_amount: defaultAmount,
    thursday_amount: defaultAmount,
    friday_amount: defaultAmount,
    saturday_amount: defaultAmount,
    sunday_amount: defaultAmount,
    schedule_checkboxes: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
    },
    image: null,
  });

  const handleNext = (values: FormikValues) => {
    setFormData((prevData) => ({ ...prevData, ...values }));
    setStep(step + 1);
  };

  const handleNextwithCommissionRates = (values: FormikValues) => {
    setFormData((prevData) => ({ ...prevData, ...values }));
    setFormData((prevData) => ({ ...prevData, target_collab_product_comission_rates: initializeCommissionRates(values) }));
    setStep(step + 1);
  };

  const initializeCommissionRates = (values: FormikValues) => {
    if (values.product_id && values.target_collab_product_comission_rates.length === 1 && !values.target_collab_product_comission_rates[0].product_id) {
      return values.product_id.map(productId => ({
        product_id: productId,
        commission_rate: '',
      }));
    }
    return values.target_collab_product_comission_rates;
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  type Result = {
    [key: string]: {
        startTime: string;
        maxCreators: number;
    };
  };

  function processFormSchedule(formValues) {
    const daysOfWeek = [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ];

    const result: Result = {};

    daysOfWeek.forEach(day => {
        const timeKey = day.toLowerCase() + '_time';
        const amountKey = day.toLowerCase() + '_amount';

        const startTime = formValues[timeKey];
        let maxCreators = formValues[amountKey];
        const checkboxValue = formValues.schedule_checkboxes[day.toLowerCase()];

        if (checkboxValue) {
            //if (startTime !== "") {
                if (maxCreators === "") {
                    maxCreators = parseInt(defaultAmount, 10);
                } else {
                    maxCreators = parseInt(maxCreators, 10);
                }

                result[day] = {
                    startTime,
                    maxCreators
                };
            //}
        }
    });

    return result;
}



const handleLoginSubmit = async (values, setSubmitting) => {
  try {
      // Set the product_ids [] if the automation type is Message or Message + Image
      let product_ids = values.product_id;
      if (values.automation_type === "Message" || values.automation_type === "Message + Image") {
        product_ids = [];
      }
      // Create the categories list
      let categoriesList = values.category.map(category => ({ Main: category }));
      console.log("categoriesList before sending as a payload", categoriesList);

      // Convert creators_to_omit and creators_to_include arrays to JSON strings
      const creatorsToOmitJson = JSON.stringify(values.creators_to_omit);
      const creatorsToIncludeJson = JSON.stringify(values.creators_to_include);

      // Process the time frame data
      const timeFrame = processFormSchedule(values);
      
      // Adjust content type preference for target collab automation
      let contentType = values.content_type;
      if (!(["No preference", "Shoppable video", "Shoppable LIVE"].includes(values.content_type))) {
        contentType = "No preference";
      }

      // Adjust the target collab message for creator name customization
      let targetCollabMessage = values.message_entry_target_collab;
      if (targetCollabMessage.includes("{creator_name}")) {
        // Replace all occurrences of {creator_name} with {{creators username}}
        targetCollabMessage = targetCollabMessage.replace(/{creator_name}/g, "{{creators username}}");
      }

      // Adjust the target collab name so that it wont have consequtive empty spaces (only one space)
      let targetCollabName = values.target_collab_invitation_name;
      if (targetCollabName !== undefined && targetCollabName !== null && targetCollabName !== "" && targetCollabName.includes("  ")) {
        targetCollabName = targetCollabName.replace(/\s+/g, ' ');
      }
      // Check if final char is empty space, if so remove it
      if (targetCollabName[targetCollabName.length - 1] === ' ') {
        targetCollabName = targetCollabName.slice(0, -1);
      }

      // Create FormData and append the payload data
      const formData = new FormData();
      formData.append('customer_id', auth?.meInfo?.customer_id?.toString() ?? '');
      formData.append('shop_id', shops.selectedStoreId?.toString() ?? '');
      formData.append('shop_name', shops.selectedStoreName ?? '');
      formData.append('automation_name', values.automation_name ?? '');
      formData.append('status', 'inactive');
      formData.append('automation_type', values.automation_type ?? '');
      formData.append('creators_to_omit', creatorsToOmitJson);
      formData.append('creators_to_include', creatorsToIncludeJson);

      if (values.image) {
          formData.append('file', values.image);
          formData.append('file_name', values.image.name);
      }

      // Append config data as JSON string
      const config = {
          DESIRED_PRODUCT_IDS: product_ids,
          Filters: {
              Creators: {
                  "Product Categories": categoriesList,
                  Followers: {
                      "Follower Segments": values.followers
                  }
              },
              Followers: {
                  "Follower Age": values.age,
                  "Follower Gender": values.gender
              },
              Performance: {
                  GMV: values.gmv,
                  "Units Sold": values.units,
                  "Average Views": values.views,
                  "Engagement Rate": values.engagement,
                  GPM: values.video_gpm,
                  "Video Views": values.video_views
              }
          },
          CREATOR_MESSAGE: values.message_entry,
          SEND_UNREPLIED_FOLLOWUP: values.no_reply_automation,
          DAYS_BEFORE_FOLLOWUP: values.days,
          FOLLOWUP_MESSAGE: values.message_entry_no_reply,
          OFFER_FREE_SAMPLES: values.target_collab_offer_free_samples,
          AUTO_APPROVE: !values.target_collab_manually_approve,
          BASE_INVITATION_NAME: targetCollabName,
          TARGET_COLLAB_MESSAGE: targetCollabMessage,
          EMAIL: values.target_collab_email,
          PHONE_NUMBER: values.target_collab_phone,
          VALID_UNTIL: values.target_collab_valid_until,
          PRODUCTS: values.target_collab_product_comission_rates,
          ONLY_MESSAGE_INCLUDE_LIST: values.only_message_include_list,
          SCHEDULE: timeFrame,
          content_type: contentType,
          TC_DM_MESSAGE: values.tc_dm_message,
      };
      
      // Add follow-up steps to the config
      config.FOLLOW_UP_STEPS = values.followupSteps.map((step, index) => ({
        step_number: index + 1,
        days_after_previous: parseInt(step.days_after_previous, 10),
        message: step.message,
      }));

      formData.append('config', JSON.stringify(config));

      // Optionally append a file if it exists
      if (values.file) {
          formData.append('file', values.file);
          formData.append('file_name', values.file.name);
      }

      console.log("FormData before sending", formData);

      await dispatch(postAddAutomation(formData));
      toast.success("Automation Created!");
      dispatch(getAutomations({ shop_id: shops.selectedStoreId }));
      onReturn();

      setSubmitting(false);
  } catch (error) {
      // Handle failure if needed
      setSubmitting(false);
  }
};


  const renderStepForm = () => {
    switch (step) {
      case 1:
        return (
          <AddNewAutomationStepOneForm
            onNext={handleNextwithCommissionRates}
            initialValues={formData}
            onReturn={onReturn}
          />
        );
      case 2:
        if (formData.automation_type === "Message + Target Collab" ||
          formData.automation_type === "Message + Target Collab + Target Collab Card"
        ) {
          return (
            <AddNewAutomationStepTargetCollab
              onNext={handleNext}
              onPrev={handlePrev}
              initialValues={formData}
              automationType={formData.automation_type}
            />
          );
        } else if (formData.automation_type === "Message + Image") {
          return (
            <AddNewAutomationStepMessageImage
              onNext={handleNext}
              onPrev={handlePrev}
              initialValues={formData}
            />
          );
        } else {
          return (
            <AddNewAutomationStepOneTwo
              onNext={handleNext}
              onPrev={handlePrev}
              initialValues={formData}
            />
          );
        }
      case 3:
        return (
          <AddNewAutomationStepOneThree
            onNext={handleNext}
            onPrev={handlePrev}
            initialValues={formData}
          />
        );
      case 4:
        return (
          <AddNewAutomationStepOneFour
            onPrev={handlePrev}
            initialValues={formData}
            handleLoginSubmit={handleLoginSubmit}
            automationData={automationData}
          />
        )
      default:
        return null;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA' && event.target.tagName !== 'INPUT') {
      event.preventDefault();  // Prevent default form submit behavior of the form when the user presses Enter
    }
  };

  return (
    <div className="px-4 mt-8">
      {/*<h3 className="font-semibold text-xl">Create New Automation</h3> */}
      <Steps current={step - 1} className="mt-4 mb-12" items={steps}/>

      <FormikContext.Provider value={{ formData }}>
        <div onKeyDown={handleKeyDown}>{renderStepForm()}</div>
      </FormikContext.Provider>
    </div>
  );
};

export default AddNewAutomationForm;
