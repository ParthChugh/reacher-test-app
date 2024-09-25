import React from "react";
import { Input } from "antd";
import { AiOutlineInfoCircle } from "react-icons/ai";

// Define the props for the custom input component
interface CustomInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  infoTooltip?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  infoTooltip,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1 flex items-center">
        {label}
        {infoTooltip && (
          <AiOutlineInfoCircle
            className="ml-1 text-gray-400 cursor-pointer"
            title={infoTooltip}
          />
        )}
      </label>
      <Input
        className="border rounded px-2 py-1"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default CustomInput;
