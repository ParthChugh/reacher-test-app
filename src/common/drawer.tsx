import React from "react";
import { Drawer } from "antd";
import { FaTimes } from "react-icons/fa";

interface CustomDrawerProps {
  visible: boolean;
  width?: number;
  onClose: () => void;
  Header?: React.ComponentType;
  Component: React.ComponentType;
  Footer: React.ComponentType;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({
  visible,
  width,
  onClose,
  Header,
  Component,
  Footer,
}) => {
  return (
    <Drawer
      title={
        <div className="flex justify-between items-center">
          {Header && <Header />}
          <FaTimes
            className="text-xl cursor-pointer"
            onClick={onClose} // Call the close function when the icon is clicked
          />
        </div>
      }
      width={width || 500}
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
      footer={<Footer />}
    >
      <Component />
    </Drawer>
  );
};

export default CustomDrawer;
