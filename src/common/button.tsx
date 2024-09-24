import React from "react";
import { Button } from "antd";

interface IconButtonProps {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode; // optional icon if you want to customize it
  rightIcon?: React.ReactNode; // optional icon if you want to customize it
  buttonClass?: string; // optional className if you want to customize it
  textClass?: string; // optional className if you want to customize it
}

const IconButton: React.FC<IconButtonProps> = ({
  label,
  onClick,
  icon = null, // default icon is PlusOutlined
  buttonClass = "",
  textClass = "",
  rightIcon = null,
}) => {

  return (
    <Button
      type="primary"
      onClick={onClick}
      icon={icon} // icon will appear to the left by default
      className={`flex items-center gap-2 ${buttonClass}`}
    >
      <div className={`${textClass}`}>
        {label}
        {rightIcon}
      </div>
    </Button>
  );
};

export default IconButton;
