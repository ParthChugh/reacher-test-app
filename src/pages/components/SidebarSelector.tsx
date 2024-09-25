import React, { useState } from "react";
import { Select } from "antd";

interface SidebarSelectorProps {
  placeHolder?: string;
  value: number;
  options: { value: number; label: string }[];
  onChange: (value?: number) => void;
}

const SidebarSelector: React.FC<SidebarSelectorProps> = ({
  placeHolder,
  value,
  options,
  onChange,
}) => {
  const handleChange = (value: string) => {
    const numericValue = parseInt(value, 10);
    onChange(numericValue);
  };

  const isValueInOptions = options.some((option) => option.value === value);
  if (!isValueInOptions && options.length > 0) {
    const firstOptionValue = options[0].value;
    handleChange(firstOptionValue.toString());
  }

  return (
    <div>
      <Select
        size="large" // Equivalent to size="lg"
        onChange={(value) => handleChange(value)} // Ant Design passes the value directly
        placeholder={placeHolder} // Equivalent to label for Ant Design
        value={value.toString()}
        style={{ minWidth: 200 }} // Optional: adjust as per your design needs
      >
        {options.map((option) => (
          <Select.Option key={option.value} value={option.value.toString()}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default SidebarSelector;
