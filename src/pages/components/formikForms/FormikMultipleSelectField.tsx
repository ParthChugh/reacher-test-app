// This component enables the usage of MultipleSelectField component with formik forms


import React from "react";
import { Field } from "formik";
import MultipleSelectField from "../forms/MultipleSelectField";

interface MultipleSelectFieldFormikProps {
    name: string;
    label?: string;
    placeHolder: string;
    options: { value: string; label: string }[];
    isMultiple?: boolean;
    disabled?: boolean;
    isClearable?: boolean;
    consistentLabel?: string;
}

const MultipleSelectFieldWithFormik: React.FC<MultipleSelectFieldFormikProps> = ({
    name,
    label,
    placeHolder,
    options,
    isMultiple = true, // Default
    disabled = false, // Default
    isClearable = true, // Default
    consistentLabel
  }) => {
    return (
      <Field name={name}>
        {({ field, form }: any) => (
          <MultipleSelectField
            isMultiple={isMultiple}
            label={label}
            placeHolder={placeHolder}
            options={options}
            onChange={(value) => form.setFieldValue(name, value)}
            value={field.value}
            disabled={disabled}
            isClearable={isClearable}
            consistentLabel={consistentLabel}
          />
        )}
      </Field>
    );
  };
  
  export default MultipleSelectFieldWithFormik;