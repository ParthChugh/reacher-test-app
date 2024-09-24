

import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../forms/TextError";
import SwitchComponent from "../forms/Switch";

interface FormikSwitchComponentProps {
    name: string;
    disabled?: boolean;
    checked?: boolean;
}

const FormikSwitchComponent: React.FC<FormikSwitchComponentProps> = ({
    name,
    disabled = false,
    checked = false
  }) => {
    return (
        <div>
            <Field name={name}>
                {({ form }: any) => (
                    <SwitchComponent
                        onChange={(value) => form.setFieldValue(name, value)}
                        disabled={disabled}
                        checked={checked}
                    />
                )}
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>

    );
  };
  
  export default FormikSwitchComponent;