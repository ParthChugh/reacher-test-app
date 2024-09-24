import * as Yup from 'yup';

const getValidationSchema = (selectedStoreRegion) => {
  const defaultAmount = selectedStoreRegion === "UK" ? 500 : 2500;

  return Yup.object().shape({
    automation_type: Yup.string().required("Automation Type is required"),
    automation_name: Yup.string().required("Automation Name is required"),
    product_id: Yup.array().of(Yup.string()).when('automation_type', {
      is: (value) => !['Message', 'Message + Image'].includes(value),
      then: (schema) => schema.required("Product ID is required").min(1, "Product ID list cannot be empty"),
      otherwise: (schema) => schema.notRequired(),
    }),
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