import React from "react";
import { Field, FieldProps } from "formik";
import FollowersCountSelect from "./FollowersCountSelect";

interface MenuWithInputFormikProps {
  name: string;
  label: string;
  placeHolder?: string;
}

const FormikFollowerCountSelect: React.FC<MenuWithInputFormikProps> = ({
  name,
  label,
  placeHolder,
}) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps<any>) => (
        <FollowersCountSelect
          placeHolder={placeHolder}
          onChange={(value) => form.setFieldValue(name, value)}
          value={field.value}
          label={label}
        />
      )}
    </Field>
  );
};

export default FormikFollowerCountSelect;
