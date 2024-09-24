import React, { useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

interface DatePickerProps {
  initialValue?: DateValueType;
  onChange: (newValue: DateValueType) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  initialValue = {
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
  },
  onChange
}) => {
  const [value, setValue] = useState(initialValue);

  const handleValueChange = (newValue: DateValueType) => {
    setValue(newValue);
    onChange(newValue);
  };

  return <Datepicker value={value} onChange={handleValueChange} />;
};

export default DatePicker;
