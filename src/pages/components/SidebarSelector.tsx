

import React, { useState } from "react";

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

    </div>
  );
};

export default SidebarSelector;