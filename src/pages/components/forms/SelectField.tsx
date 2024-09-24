

import React, { useState } from "react";
import { Select, Option } from "@material-tailwind/react";

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
        size="lg"
        onFocus={() => setLabelClassName("material-select-focus")}
        onBlur={() => setLabelClassName("material-select-blur")}
        onChange={handleChange}
        label={placeHolder}
        className={`bg-white border-gray-200 appearance-none border rounded-md w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          selectClassName ? selectClassName : ""
        }`}
        value={value}
      >
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SelectField;
