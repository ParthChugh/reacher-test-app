import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface MenuWithInputProps {
  label: string;
  placeHolder?: string;
  onChange: (value: { min: string; max: string }) => void;
  value: { min: string; max: string };
}

const MenuWithInput: React.FC<MenuWithInputProps> = ({
  label,
  placeHolder,
  onChange,
  value,
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [openMenu, setOpenMenu] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <div />
  );
};

export default MenuWithInput;
