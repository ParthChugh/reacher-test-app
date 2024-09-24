import React from "react";
import { useField } from "formik";
import Select from 'react-select';

interface FormikSelectFieldProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  placeHolder: string;
  isRequired?: boolean;
}

const FormikSelectField: React.FC<FormikSelectFieldProps> = ({
  name,
  label,
  options,
  placeHolder,
  isRequired = false,
}) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (selectedOption: any) => {
    helpers.setValue(selectedOption ? selectedOption.value : '');
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-black mb-2">
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <Select
        options={options}
        placeholder={placeHolder}
        onChange={handleChange}
        value={options.find(option => option.value === field.value)}
        className="basic-single"
        classNamePrefix="select"
        styles={{
          control: (provided) => ({
            ...provided,
            borderColor: '#e5e7eb',
            borderRadius: '0.375rem',
            '&:hover': {
              borderColor: '#d1d5db',
            },
          }),
          menu: (provided) => ({
            ...provided,
            borderRadius: '0.375rem',
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#3b82f6' : 'white',
            color: state.isSelected ? 'white' : 'black',
            '&:hover': {
              backgroundColor: state.isSelected ? '#3b82f6' : '#f3f4f6',
            },
          }),
        }}
      />
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default FormikSelectField;