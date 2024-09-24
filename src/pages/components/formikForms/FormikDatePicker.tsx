

import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../forms/TextError";
import DatePickerComponent from "../forms/DatePicker";

interface FormikDatePickerComponentProps {
    name: string;
}

const FormikDatePickerComponent: React.FC<FormikDatePickerComponentProps> = ({
    name,
  }) => {
    return (
        <div>
            <Field name={name}>
                {({ form }: any) => (
                    <DatePickerComponent
                        onChange={(date) => form.setFieldValue(name, date)}
                    />
                )}
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>

    );
  };
  
  export default FormikDatePickerComponent;