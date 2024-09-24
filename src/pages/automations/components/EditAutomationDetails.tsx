import React, { useState } from "react";
import { FormikValues } from "formik";
import { FormikContext } from "formik";
import AddNewAutomationStepOneForm from "./AddNewAutomationStepOneForm";
import AddNewAutomationStepOneTwo from "./AddNewAutomationStepOneTwo";
import { getAutomations, updateAutomation } from "../../store/automation";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { toast } from "react-toastify";
import AddNewAutomationStepOneThree from "./AddNewAutomationStepOneThree";
import AddNewAutomationStepTargetCollab from "./AddNewAutomationStepTargetCollab";
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

interface EditAutomationDetailsProps {
    automationData: any,
    onReturn: () => void;
}

const EditAutomationDetails: React.FC<EditAutomationDetailsProps> = ({
    automationData,
    onReturn,
}) => {
  const auth = useAppSelector((state) => state.auth);
  const shops = useAppSelector((state) => state.shops);
  const dispatch = useAppDispatch();
  const schedule = automationData.config?.SCHEDULE || {};

  let initialProductCategories = []; // Initialize initialProductCategories with empty array
  if (automationData.config?.Filters?.Creators?.['Product Categories']) {
    initialProductCategories = automationData.config?.Filters?.Creators?.['Product Categories'].map(category => category.Main);
  }

  let targetCollabMessage = automationData.config?.TARGET_COLLAB_MESSAGE || MESSAGE_ENTRY_TARGET_COLLAB_DEFAULT_CONTENT;
  if (targetCollabMessage.includes("{{creators username}}")) {
      targetCollabMessage = targetCollabMessage.replace(/{{creators username}}/g, "{creator_name}");
  }

  const [step, setStep] = useState<number>(1);
  const defaultAmount = shops.selectedStoreRegion === "UK" ? "500" : "2500";
  const [formData, setFormData] = useState<FormikValues>({
    message_entry: automationData.config?.CREATOR_MESSAGE || MESSAGE_ENTRY__DEFAULT_CONTENT,
    message_entry_no_reply: automationData.config?.FOLLOWUP_MESSAGE || MESSAGE_ENTRY_NO_REPLY_DEFAULT_CONTENT,
    message_entry_interest: MESSAGE_ENTRY_INTEREST_DEFAULT_CONTENT, // ToDo Update when the new feature is ready
    message_entry_max_samples: MESSAGE_ENTRY_MAX_SAMPLES_REQUESTED_DEFAULT_CONTENT, // ToDo Update when the new feature is ready

      // Target Collab Default Values
      message_entry_target_collab: targetCollabMessage,
      target_collab_invitation_name: automationData.config?.BASE_INVITATION_NAME || "",
      target_collab_valid_until: automationData.config?.VALID_UNTIL || "",
      target_collab_email: automationData.config?.EMAIL || "",
      target_collab_phone: automationData.config?.PHONE_NUMBER || "",
      target_collab_offer_free_samples: automationData.config?.OFFER_FREE_SAMPLES || false,
      target_collab_manually_approve: !automationData.config?.AUTO_APPROVE || false,
      target_collab_product_comission_rates: automationData.config?.PRODUCTS || [{}],
      content_type: automationData.config?.content_type || "No preference",

    days: automationData.config?.DAYS_BEFORE_FOLLOWUP || "",
    no_reply_automation: automationData.config?.SEND_UNREPLIED_FOLLOWUP || false,
    interest_automation: false, // ToDo Update when the new feature is ready
    max_samples_automation: false, // ToDo Update when the new feature is ready

    // default values
    shop_name: "", // ToDo Update when the new feature is ready
    product_id: automationData.config?.DESIRED_PRODUCT_IDS || [],
    automation_name: automationData.automation_name || "",
    followers: automationData.config?.Filters?.Creators?.Followers?.["Follower Segments"] || [],
    engagement: automationData.config?.Filters?.Performance?.["Engagement Rate"] || "",
    gender: automationData.config?.Filters?.Followers?.['Follower Gender'] || "",
    automation_type: automationData.automation_type || "Message + Product Card",
    gmv: automationData.config?.Filters?.Performance?.GMV || [],
    category: initialProductCategories,
    age: automationData.config?.Filters?.Followers?.['Follower Age'] || [],
    units: automationData.config?.Filters?.Performance?.['Units Sold'] || [],
    views: automationData.config?.Filters?.Performance?.['Average Views'] || "",
    creators_to_omit: automationData.creators_to_omit || [],
    creators_to_include: automationData.creators_to_include || [],
    only_message_include_list: automationData.config?.ONLY_MESSAGE_INCLUDE_LIST !== undefined ? automationData.config?.ONLY_MESSAGE_INCLUDE_LIST : false,
    video_gpm: automationData.config?.Filters?.Performance?.GPM || [],
    video_views: automationData.config?.Filters?.Performance?.['Video Views'] || [],
    monday_time: schedule.Monday?.startTime || "07:00",
    tuesday_time: schedule.Tuesday?.startTime || "07:00",
    wednesday_time: schedule.Wednesday?.startTime || "07:00",
    thursday_time: schedule.Thursday?.startTime || "07:00",
    friday_time: schedule.Friday?.startTime || "07:00",
    saturday_time: schedule.Saturday?.startTime || "07:00",
    sunday_time: schedule.Sunday?.startTime || "07:00",
    monday_amount: String(schedule.Monday?.maxCreators || defaultAmount),
    tuesday_amount: String(schedule.Tuesday?.maxCreators || defaultAmount),
    wednesday_amount: String(schedule.Wednesday?.maxCreators || defaultAmount),
    thursday_amount: String(schedule.Thursday?.maxCreators || defaultAmount),
    friday_amount: String(schedule.Friday?.maxCreators || defaultAmount),
    saturday_amount: String(schedule.Saturday?.maxCreators || defaultAmount),
    sunday_amount: String(schedule.Sunday?.maxCreators || defaultAmount),
    schedule_checkboxes: {
        monday: !!schedule.Monday,
        tuesday: !!schedule.Tuesday,
        wednesday: !!schedule.Wednesday,
        thursday: !!schedule.Thursday,
        friday: !!schedule.Friday,
        saturday: !!schedule.Saturday,
        sunday: !!schedule.Sunday,
    },
    image: null,
    image_name: automationData.file_name || "",

    // Follow-up steps
    followupSteps: automationData.followup_steps || [
      {
        step_number: 1,
        days_after_previous: "1",
        message: MESSAGE_ENTRY_NO_REPLY_DEFAULT_CONTENT,
      },
    ],
    tc_dm_message: automationData.config?.TC_DM_MESSAGE || "",
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

  const checkToInitializeCommissionRatesOnEditAutomation = (values: FormikValues) => {
    const { product_id, target_collab_product_comission_rates } = values;
    // Check if target_collab_product_comission_rates is an array with a single empty object, i.e. [{}]
    if (Array.isArray(target_collab_product_comission_rates) && target_collab_product_comission_rates.length === 1 && 
    Object.keys(target_collab_product_comission_rates[0]).length === 0) {
    return false;
    }
    // Extract the product IDs from target_collab_product_comission_rates
    const targetProductIds = target_collab_product_comission_rates.map(item => item.product_id);
    // Check if every product ID in product_id has a correspondence in targetProductIds
    const allProductsMatch = product_id.every(id => targetProductIds.includes(id));
    // Check if every product ID in targetProductIds has a correspondence in product_id
    const allTargetsMatch = targetProductIds.every(id => product_id.includes(id));
    // Return true if both conditions are met, i.e. the product IDs match
    return allProductsMatch && allTargetsMatch;
  };

  const initializeCommissionRates = (values: FormikValues) => {
    const ProductIDsChanged = !checkToInitializeCommissionRatesOnEditAutomation(values);
    // Check if product ids changed or first time initialization of the target_collab_product_comission_rates
    if (ProductIDsChanged || (values.product_id && values.target_collab_product_comission_rates.length === 1 && !values.target_collab_product_comission_rates[0].product_id)) {
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

  function processFormScheduleEdit(formValues) {
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
            if (maxCreators === "") {
                maxCreators = parseInt(defaultAmount, 10);
            } else {
                maxCreators = parseInt(maxCreators, 10);
            }

            result[day] = {
                startTime,
                maxCreators
            };
        }
    });

    return result;
}


  const handleLoginSubmit = async (values, setSubmitting) => {
    try {
      let product_ids = values.product_id;
      if (values.automation_type === "Message" || values.automation_type === "Message + Image") {
        product_ids = [];
      }
      const timeFrame = processFormScheduleEdit(values);
      let categoriesList = values.category.map(category => ({ Main: category }));
      console.log("categoriesList before sending as a payload", categoriesList);

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
  
      const formData = new FormData();
      formData.append('customer_id', auth?.meInfo?.customer_id?.toString() ?? '');
      formData.append('shop_id', shops.selectedStoreId?.toString() ?? '');
      formData.append('automation_id', automationData.automation_id?.toString() ?? '');
      formData.append('shop_name', shops.selectedStoreName ?? '');
      formData.append('automation_name', values.automation_name ?? '');
      formData.append('status', automationData.status ?? '');
      formData.append('automation_type', values.automation_type ?? '');
  
      formData.append('creators_to_omit', JSON.stringify(values.creators_to_omit));
      formData.append('creators_to_include', JSON.stringify(values.creators_to_include));
  
      if (values.image) {
        formData.append('file', values.image);
        formData.append('file_name', values.image.name);
      }
  
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
          },
        },
        CREATOR_MESSAGE: values.message_entry,
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
  
      config.FOLLOW_UP_STEPS = values.followupSteps.map((step, index) => ({
        step_number: index + 1,
        days_after_previous: parseInt(step.days_after_previous, 10),
        message: step.message,
      }));
  
      formData.append('config', JSON.stringify(config));
  
      await dispatch(updateAutomation(formData));
      toast.success("Automation Updated!");
      dispatch(getAutomations({
        shop_id: shops.selectedStoreId,
      }));
      onReturn();
  
      setSubmitting(false);
    } catch (error) {
      console.error("Error updating automation:", error);
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
        if (formData.automation_type === "Message + Target Collab" || formData.automation_type === "Message + Target Collab + Target Collab Card") {
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
            followup_steps={formData?.followupSteps}
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
      <h3 className="font-semibold text-xl">Create New Automation</h3>

      <FormikContext.Provider value={{ formData }}>
        <div onKeyDown={handleKeyDown}>{renderStepForm()}</div>
      </FormikContext.Provider>
    </div>
  );
};

export default EditAutomationDetails;
