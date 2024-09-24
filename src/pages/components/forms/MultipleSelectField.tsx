// A select component that allows multiple selections and enabled by default.
// It can be converted into a single selection component or disabled with optional props.


import React from "react";
import Select from 'react-select';

interface MultipleSelectFieldProps {
  label?: string;
  placeHolder?: string;
  value: string[] | string; // Allow value to be a single string or an array of strings
  options: { value: string; label: string }[];
  onChange: (value: string[] | string) => void; // Adjust onChange to handle both single and multiple values
  selectClassName?: string;
  isMultiple?: boolean; // Optional prop to control single/multiple selection
  disabled?: boolean; // Optional prop to make the component disabled
  isClearable?: boolean; // Optional prop to allow clearing the selection
  consistentLabel?: string; // Optional prop to keep label consistent
}

const MultipleSelectField: React.FC<MultipleSelectFieldProps> = ({
  label,
  placeHolder,
  value,
  options,
  onChange,
  selectClassName,
  isMultiple = true, // Default
  disabled = false, // Default
  isClearable = true, // Default
  consistentLabel
}) => {

  const handleChange = (selectedOptions: any) => {
    if (isMultiple) {
      onChange(selectedOptions ? selectedOptions.map((option: any) => option.value) : []);
    } else {
      onChange(selectedOptions ? selectedOptions.value : '');
    }
  };

  // Generate the styles for react-select component - Can further be editted so that it will look like tailwind select
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      boxShadow: 'none',
      border: '1px solid #E2E8F0', // example border color
      '&:hover': {
        borderColor: '#cbd5e1' // example border hover color
      }
    }),
  };

  return (
    <div className={`text-gray-300 ${selectClassName}`}>
      {consistentLabel && 
          (<label className="block text-sm font-medium text-black mb-2">
            {consistentLabel}
          </label>
      )}
      {label && value.length>0 && (
        <label className="block text-sm font-medium text-gray-400 mb-2">
          {label}
        </label>
      )}
      <Select
        isMulti={isMultiple}
        placeholder={placeHolder}
        value={options.filter(option => Array.isArray(value) ? value.includes(option.value) : option.value === value)}
        onChange={handleChange}
        options={options}
        styles={customStyles}
        className="text-gray-700 leading-tight"
        isDisabled={disabled}
        isClearable={isClearable}
      />
    </div>
  );
};

export default MultipleSelectField;