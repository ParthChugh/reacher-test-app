import React from 'react';
import { Switch } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';


interface SwitchComponentProps {
    onChange: (value: boolean) => void; // Adjust onChange to handle both single and multiple values
    selectClassName?: string;
    disabled?: boolean; // Optional prop to make the component disabled
    checked?: boolean; // Optional prop to set the default value
}

const SwitchComponent: React.FC<SwitchComponentProps> = ({
    onChange,
    selectClassName,
    checked = false, // Default
    disabled = false, // Default
  }) => {

    const handleChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);
        onChange(checked);
    };
      
    return (
        <Switch 
        defaultChecked={checked}
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        disabled={disabled} 
        onChange={handleChange} />
    );
};
  

export default SwitchComponent;