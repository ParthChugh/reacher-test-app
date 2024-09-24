import React, { useState } from "react";
import { Menu, MenuHandler, Input, MenuList } from "@material-tailwind/react";
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
    <Menu
      dismiss={{
        itemPress: false,
      }}
      open={openMenu}
      handler={setOpenMenu}
    >
      <MenuHandler>
        <div className="bg-white flex items-center justify-between text-gray-500 appearance-none border rounded-md w-full py-3.5 px-3 leading-tight focus:outline-none focus:shadow-outline">
          <span className="inline-block text-sm">{label}</span>
          <span className="inline-block">
            <FiChevronDown
              size={17}
              className={`text-gray-700 transition-transform ${
                openMenu ? "rotate-180" : ""
              }`}
            />
          </span>
        </div>
      </MenuHandler>

      <MenuList className="grid grid-cols-2 grid-rows-1 gap-4">
        <Input
          type="number"
          placeholder={`0`}
          value={minValue}
          onChange={(e) => handleInputChange(e, "min")}
          label="min"
        />
        <Input
          type="number"
          placeholder={`10,000,000+`}
          value={maxValue}
          onChange={(e) => handleInputChange(e, "max")}
          label="max"
        />
      </MenuList>
    </Menu>
  );
};

export default MenuWithInput;





