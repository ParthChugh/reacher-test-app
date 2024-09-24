import React, { useState, useEffect } from "react";
import { FormikValues } from "formik";
import { FormikContext } from "formik";
import { useFormik } from "formik";
import AddNewEmailAutomationStepOneForm from "./AddNewEmailAutomationStepOneForm";
import AddNewEmailAutomationStepOneTwo from "./AddNewEmailAutomationStepOneTwo";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { toast } from "react-toastify";
import AddNewEmailAutomationStepOneThree from "./AddNewEmailAutomationStepOneThree";
import { ApiTwoTone, MessageTwoTone, ContactsTwoTone } from '@ant-design/icons';
import { editEmailAutomation, getEmailAutomations } from "../../store/emailAutomations";
import clientService from "../../helpers/client";
import { Api } from "../../constants/api";
import AddNewEmailAutomationStepOneFour from "./AddNewEmailAutomationStepOneFour";

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
  
interface EditEmailAutomationDetailsProps {
  automationData: any;
  onReturn: () => void;
}
const EditEmailAutomationDetails: React.FC<EditEmailAutomationDetailsProps> = ({
  automationData,
  onReturn,
}) => {
  const auth = useAppSelector((state) => state.auth);
  const shops = useAppSelector((state) => state.shops);
  const dispatch = useAppDispatch();

  const new_automation_description = 'Enter the email automation essentials.';
  const message_and_taget_collab_description = 'Enter the message to be emailed to the creator.';
  const creators_and_timeframe_description = 'Upload Brand/Product Images';
  const follow_up_description = 'Enter the follow up settings.';
  const steps = [
    {
      title: <span style={{ fontWeight: 'bold' }}>New Email Automation</span>,
      description: new_automation_description,
      icon: <ApiTwoTone />,
    },
    {
      title:  <span style={{ fontWeight: 'bold' }}>Email Body</span>,
      description: message_and_taget_collab_description,
      icon: <MessageTwoTone />,
    },
    {
      title: <span style={{ fontWeight: 'bold' }}>Images</span>,
      description: creators_and_timeframe_description,
      icon: <ContactsTwoTone />,
    },
  ];

  let initialProductCategories = []; // Initialize initialProductCategories with empty array
  if (automationData.filters?.Creators?.['Product Categories']) {
    initialProductCategories = automationData.filters?.Creators?.['Product Categories'].map(category => category.Main);
  }
  const [step, setStep] = useState<number>(1);

  const defaultAmount = shops.selectedStoreRegion === "UK" ? "250" : "1000";
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

    days: "",
    no_reply_automation: false,
    interest_automation: false,
    max_samples_automation: false,

    // default values
    product_id: [],
    automation_name: automationData?.mail_auto_name || "",
    followers: automationData.filters?.Creators?.Followers?.['Follower Segments'] || [],
    engagement: automationData.filters?.Performance?.['Engagement Rate'] || "",
    gender: automationData.filters?.Followers?.['Follower Gender'] || "",
    automation_type: "",
    gmv: automationData.filters?.Performance?.GMV || [],
    category: initialProductCategories,
    age: automationData.filters?.Followers?.['Follower Age'] || [],
    units: automationData.filters?.Performance?.['Units Sold'] || [],
    views: automationData.filters?.Performance?.['Average Views'] || "",
    creators_to_omit: [],
    creators_to_include: [],
    only_message_include_list: false,
    video_gpm: automationData.filters?.Performance?.GPM || [],
    video_views: automationData.filters?.Performance?.['Video Views'] || [],
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
    brand_image: null,
    product_image: null,
    body: automationData?.body || "", 
    subject: automationData?.subject || "",
    old_brand_image_name: automationData?.brand_image_name || "",
    old_brand_image_url: automationData?.brand_image_url || "",
    old_product_image_name: automationData?.product_image_name || "",
    old_product_image_url: automationData?.product_image_url || "",
    signature: automationData?.signature || "",
    signoff: automationData?.signoff || "",
    headline: automationData?.headline || "",
    email_account_id: automationData.email_account_id || "",
    email_account: automationData.email_account || ""
  });

  const [brandImageFile, setBrandImageFile] = useState<File | null>(null);
  const [productImageFile, setProductImageFile] = useState<File | null>(null);

  const uploadImage = async (file: File, shopId: number, mail_auto_name: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('shop_id', shopId.toString());
    formData.append('mail_auto_name', mail_auto_name.toString());
  
    try {
      const response = await clientService.post(Api.emailAutomations.uploadImage, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleImageUpload = async (brandImage: File | null, productImage: File | null, automation_name: string) => {
    const shopId = shops.selectedStoreId;
  
    let brandImageData = null;
    let productImageData = null;
  
    if (brandImage) {
      brandImageData = await uploadImage(brandImage, shopId, automation_name);
    }
  
    if (productImage) {
      productImageData = await uploadImage(productImage, shopId, automation_name);
    }
  
    return { brandImageData, productImageData };
  };

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

const handleLoginSubmit = async (values, setSubmitting) => {
    try {
      const { brandImageData, productImageData } = await handleImageUpload(values.brand_image, values.product_image, values.automation_name);
  
      let categoriesList = values.category.map(category => ({ Main: category }));
      console.log("categoriesList before sending as a payload", categoriesList);
      const config = {
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
        };
      const jsonConfig = JSON.stringify(config);
      const payload = {
        shop_id: shops.selectedStoreId?.toString() ?? '',
        mail_auto_id: automationData.mail_auto_id ?? '',
        mail_auto_name: values.automation_name ?? '',
        body: values.body ?? '',
        subject: values.subject ?? '',
        brand_image_url: brandImageData ? brandImageData[0] : values.old_brand_image_url,
        brand_image_name: brandImageData ? brandImageData[1] : values.old_brand_image_name,
        product_image_url: productImageData ? productImageData[0] : values.old_product_image_url,
        product_image_name: productImageData ? productImageData[1] : values.old_product_image_name,
        filters: jsonConfig,
        signature: values.signature,
        signoff: values.signoff,
        headline: values.headline,
        email_account_id: parseInt(values.email_account_id, 10),
      };
  
      console.log("Payload before sending", payload);
  
      await dispatch(editEmailAutomation(payload));
      toast.success("Automation Created!");
      dispatch(getEmailAutomations({ shop_id: shops.selectedStoreId }));
      onReturn();
  
      setSubmitting(false);
    } catch (error) {
      console.error("Error creating email automation:", error);
      toast.error("Failed to create automation. Please try again.");
      setSubmitting(false);
    }
  };

  const [unusedEmails, setUnusedEmails] = useState([]);

  useEffect(() => {
    const fetchUnusedEmails = async () => {
      try {
        const response = await clientService.post('/api/manage_emails/get_unused_emails', {
          shop_id: shops.selectedStoreId,
        });
        setUnusedEmails(response.data);
      } catch (error) {
        console.error('Error fetching unused emails:', error);
        toast.error('Failed to fetch unused email accounts');
      }
    };

    if (shops.selectedStoreId) {
      fetchUnusedEmails();
    }
  }, [shops.selectedStoreId]);

  const renderStepForm = () => {
    switch (step) {
      case 1:
        return (
          <AddNewEmailAutomationStepOneForm
            onNext={handleNextwithCommissionRates}
            initialValues={formData}
            onReturn={onReturn}
            unusedEmails={unusedEmails}
            email_account={formData.email_account}
          />
        );
      case 2:
        return (
          <AddNewEmailAutomationStepOneTwo
            onNext={handleNext}
            onPrev={handlePrev}
            initialValues={formData}
          />
        );
      case 3:
        return (
          <AddNewEmailAutomationStepOneThree
            onNext={handleNext}
            onPrev={handlePrev}
            initialValues={formData}
            brandImageFile={brandImageFile}
            productImageFile={productImageFile}
            setBrandImageFile={setBrandImageFile}
            setProductImageFile={setProductImageFile}
          />
        );
      case 4:
        return (
          <AddNewEmailAutomationStepOneFour
            onPrev={handlePrev}
            initialValues={formData}
            handleLoginSubmit={handleLoginSubmit}
          />
        );
      default:
        return null;
    }
};

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA' && event.target.tagName !== 'INPUT') {
      event.preventDefault();  // Prevent default form submit behavior of the form when the user presses Enter
    }
  };

  const formik = useFormik({
    initialValues: formData,
    onSubmit: () => {}, // Add your submit logic here if needed
  });

  return (
    <div className="px-4 mt-8">
      {/* ... existing code ... */}
      <FormikContext.Provider value={formik}>
        <div onKeyDown={handleKeyDown}>{renderStepForm()}</div>
      </FormikContext.Provider>
    </div>
  );
};

export default EditEmailAutomationDetails;