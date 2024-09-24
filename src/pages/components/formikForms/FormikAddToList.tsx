// This component enables the usage of AddToList component with formik forms


import React from "react";
import { Field, ErrorMessage } from "formik";
import AddToList from "../forms/AddToList";
import TextError from "../forms/TextError";

interface AddToListWithFormikProps {
    name: string;
    label?: string;
    placeHolder?: string;
    listItems?: [];
    maxListLenght?: number;
    disabled?: boolean;
}

const AddToListWithFormik: React.FC<AddToListWithFormikProps> = ({
    name,
    label,
    placeHolder,
    listItems=[], // Empty list by default
    maxListLenght,
    disabled = false,
  }) => {
    return (
        <div className="mb-2">
            {label && <label className="block text-sm font-medium text-black mb-2"> {label} </label>}
            <Field name={name}>
                {({ field, form }: any) => (
                <AddToList
                    label={label}
                    placeHolder={placeHolder}
                    onChange={(value) => form.setFieldValue(name, value)} // Takes the list from AddToList as a value, sets the name on the form
                    listItems={listItems}
                    maxListLenght={maxListLenght}
                    disabled={disabled}
                />
                )}
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>

    );
  };
  
  export default AddToListWithFormik;