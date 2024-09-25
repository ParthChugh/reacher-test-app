

import React, { useState } from "react";
import { Select } from "antd";

interface SelectFieldProps {
  label?: string;
  placeHolder?: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value?: string) => void;
  selectClassName?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  placeHolder,
  value,
  options,
  onChange,
  selectClassName,
}) => {
  const [labelClassName, setLabelClassName] = useState<string>("");

  const handleChange = (value?: string) => {
    onChange(value);
  };

  return (
    <div className={`mb-6 text-gray-300 material-select ${labelClassName}`}>
      {label && (
        <p className="block text-sm font-medium text-black mb-2"> {label} </p>
      )}
      <Select
        size="large" // Equivalent to size="lg"
        onFocus={() => setLabelClassName("material-select-focus")} // Handles focus event
        onBlur={() => setLabelClassName("material-select-blur")} // Handles blur event
        onChange={handleChange}
        placeholder={placeHolder} // Acts as the label placeholder
        className={`bg-white border-gray-200 appearance-none border rounded-md w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          selectClassName ? selectClassName : ""
        }`}
        value={value}
        style={{
          borderColor: '#e2e8f0', // Matches the gray-200 color
          backgroundColor: 'white',
          color: '#4a5568', // Matches the gray-700 text color
        }}
      >
        {options.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default SelectField;
