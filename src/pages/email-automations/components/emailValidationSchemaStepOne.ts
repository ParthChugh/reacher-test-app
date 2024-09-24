import * as Yup from 'yup';

const getValidationSchema = (selectedStoreRegion) => {
  const defaultAmount = selectedStoreRegion === "UK" ? 250 : 1000;

  return Yup.object().shape({
    automation_name: Yup.string().required("Automation Name is required"),
    monday_amount: Yup.string().test(
      'is-valid-amount',
      `Must be less than or equal to ${defaultAmount}`,
      function (value) {
        if (value === "" || value === undefined || value === "0" || value === null) return false;
        const amount = parseInt(value, 10);
        return !isNaN(amount) && (amount <= defaultAmount && amount > 0);
      }
    ),
    tuesday_amount: Yup.string().test(
      'is-valid-amount',
      `Must be less than or equal to ${defaultAmount}`,
      function (value) {
        if (value === "" || value === undefined || value === "0" || value === null) return false;
        const amount = parseInt(value, 10);
        return !isNaN(amount) && (amount <= defaultAmount && amount > 0);
      }
    ),
    wednesday_amount: Yup.string().test(
      'is-valid-amount',
      `Must be less than or equal to ${defaultAmount}`,
      function (value) {
        if (value === "" || value === undefined || value === "0" || value === null) return false;
        const amount = parseInt(value, 10);
        return !isNaN(amount) && (amount <= defaultAmount && amount > 0);
      }
    ),
    thursday_amount: Yup.string().test(
      'is-valid-amount',
      `Must be less than or equal to ${defaultAmount}`,
      function (value) {
        if (value === "" || value === undefined || value === "0" || value === null) return false;
        const amount = parseInt(value, 10);
        return !isNaN(amount) && (amount <= defaultAmount && amount > 0);
      }
    ),
    friday_amount: Yup.string().test(
      'is-valid-amount',
      `Must be less than or equal to ${defaultAmount}`,
      function (value) {
        if (value === "" || value === undefined || value === "0" || value === null) return false;
        const amount = parseInt(value, 10);
        return !isNaN(amount) && (amount <= defaultAmount && amount > 0);
      }
    ),
    saturday_amount: Yup.string().test(
      'is-valid-amount',
      `Must be less than or equal to ${defaultAmount}`,
      function (value) {
        if (value === "" || value === undefined || value === "0" || value === null) return false;
        const amount = parseInt(value, 10);
        return !isNaN(amount) && (amount <= defaultAmount && amount > 0);
      }
    ),
    sunday_amount: Yup.string().test(
      'is-valid-amount',
      `Must be less than or equal to ${defaultAmount}`,
      function (value) {
        if (value === "" || value === undefined || value === "0" || value === null) return false;
        const amount = parseInt(value, 10);
        return !isNaN(amount) && (amount <= defaultAmount && amount > 0);
      }
    ),
    email_account_id: Yup.string().required('Please select an email account'),
    schedule_checkboxes: Yup.object().test(
      'at-least-one-checked',
      'Please schedule at least a day for the automation to start!',
      function (value) {
        return Object.values(value).some((checkbox) => checkbox);
      }
    ),
  });
};

export default getValidationSchema;