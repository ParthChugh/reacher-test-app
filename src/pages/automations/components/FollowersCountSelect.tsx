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
  const [minValue, setMinValue] = useState(value.min || "");
  const [maxValue, setMaxValue] = useState(value.max || "");
  const [openMenu, setOpenMenu] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const newValue = e.target.value;
    if (type === "min") {
      setMinValue(newValue);
    } else {
      setMaxValue(newValue);
    }
    onChange({ min: type === "min" ? newValue : minValue, max: type === "max" ? newValue : maxValue });
  };

  return (
    <div />
  );
};

export default MenuWithInput;





