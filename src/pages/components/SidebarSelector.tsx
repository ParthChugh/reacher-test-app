

import React, { useState } from "react";
import { Select, Option } from "@material-tailwind/react";

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
        size="lg"
        onChange={(e) => handleChange(e)}
        label={placeHolder}
        value={value.toString()}
        color="blue"
      >
        {options.map((option) => (
          <Option 
            key={option.value} 
            value={option.value.toString()}
            >
            {option.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SidebarSelector;