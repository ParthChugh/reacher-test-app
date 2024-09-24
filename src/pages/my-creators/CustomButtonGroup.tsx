import React from "react";
import { Button } from "antd";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: () => void;
  icon?: IconType;
  type?: "primary" | "default" | "dashed" | "text";
  className?: string;
}

interface CustomButtonGroupProps {
  buttons: ButtonProps[];
  className?: string;
  show: boolean;
}

const CustomButtonGroup: React.FC<CustomButtonGroupProps> = ({
  buttons,
  className,
  show,
}) => {
  if (show) {
    return (
      <div className={`flex gap-2 ${className}`}>
        {buttons.map((button, index) => {
          const Icon = button.icon;
          return (
            <Button
              key={index}
              type={button.type || "default"}
              onClick={button.onClick}
              className={`flex items-center justify-center ${button.className}`}
            >
              {Icon && <Icon className="mr-1" />}
              {button.label}
            </Button>
          );
        })}
      </div>
    );
  }
  return null;
};

export default CustomButtonGroup;
