

import React, { useState } from "react";

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
    </div>
  );
};

export default SelectField;
