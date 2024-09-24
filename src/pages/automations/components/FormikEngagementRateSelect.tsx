import React from "react";
import { Field, FieldProps } from "formik";
import EngagementRateSelect from "./EngagementRateSelect";

interface MenuWithInputFormikProps {
  name: string;
  label: string;
  placeHolder?: string;
}

const FormikEngagementRateSelect: React.FC<MenuWithInputFormikProps> = ({
  name,
  label,
  placeHolder,
}) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps<any>) => (
        <EngagementRateSelect
          placeHolder={placeHolder}
          onChange={(value) => form.setFieldValue(name, value)}
          value={field.value}
          label={label}
        />
      )}
    </Field>
  );
};

export default FormikEngagementRateSelect;
