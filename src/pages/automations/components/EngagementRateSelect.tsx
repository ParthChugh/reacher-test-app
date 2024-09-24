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
  const [inputValue, setInputValue] = useState(value || "");
  const [openMenu, setOpenMenu] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
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

      <MenuList className="w-[350px]">
        <Input
          type="number"
          placeholder={`0`}
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
          label="More than _____ %"
          className="min-w-36"
        />
      </MenuList>
    </Menu>
  );
};

export default MenuWithInput;
