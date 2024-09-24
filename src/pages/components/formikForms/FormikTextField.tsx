// This component enables the usage of TextField component with formik forms


import React from "react";
import { Field, ErrorMessage } from "formik";
import TextField from "../forms/TextField";
import TextError from "../forms/TextError";

interface FormikTextAreaProps {
    label?: string;
    name: string;
    maxLength?: number;
    disabled?: boolean;
    placeholder?: string;
    minimum_rows?: number;
    maximum_rows?: number;
}

const FormikTextArea: React.FC<FormikTextAreaProps> = ({
    name,
    label ="",
    disabled = false, // Default
    maxLength = 100, // Default
    placeholder = "",
    minimum_rows = 3, // Default
    maximum_rows = 20, // Default
  }) => {
    return (
      <div className="mb-4">
      {label !== "" && (
        <label htmlFor={name} className="block text-sm font-medium text-black mb-2">
          {label}
        </label>
      )}
      <Field name={name}>
        {({ field, form }: any) => (
          <TextField
            initialValue={field.value as string}
            handleChangeOnFormik={(value) => form.setFieldValue(name, value)}
            disabled={disabled}
            maxLength={maxLength}
            placeholder={placeholder}
            minimum_rows={minimum_rows}
            maximum_rows={maximum_rows}
          />
        )}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
    );
  };
  
  export default FormikTextArea;