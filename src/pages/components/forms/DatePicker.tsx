// A select component that allows multiple selections and enabled by default.
// It can be converted into a single selection component or disabled with optional props.


import React from "react";
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';

interface DatePickerComponentProps {
  placeHolder?: string;
  onChange: (value: string[] | string) => void; // Adjust onChange to handle both single and multiple values
  selectClassName?: string;
  disabled?: boolean; // Optional prop to make the component disabled
  isClearable?: boolean; // Optional prop to allow clearing the selection
  consistentLabel?: string; // Optional prop to keep label consistent
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  onChange,
  selectClassName,
}) => {

    const handleChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
        onChange(dateString);
    };

  // Generate the styles for react-select component - Can further be editted so that it will look like tailwind select
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      boxShadow: 'none',
      border: '1px solid #E2E8F0', // example border color
      '&:hover': {
        borderColor: '#cbd5e1' // example border hover color
      }
    }),
  };

  const dateFormat = 'MM/DD/YYYY';

  return (
    <div className={`text-gray-300 ${selectClassName}`}>
      <DatePicker
        onChange={handleChange}
        format={dateFormat}
      />
    </div>
  );
};

export default DatePickerComponent;