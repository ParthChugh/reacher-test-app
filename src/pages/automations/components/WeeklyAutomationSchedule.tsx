import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd'; 
import { ErrorMessage } from 'formik';
import TextError from "../../components/forms/TextError";
import { useAppSelector } from '../../hooks';

const WeeklyAutomationSchedule = ({ setFieldValue, values, inputStyles, validateField  }) => {
  const [checkedDays, setCheckedDays] = useState(values.schedule_checkboxes);
  const shops = useAppSelector((state) => state.shops);
  const defaultAmount = shops.selectedStoreRegion === "UK" ? "500" : "2500";

    useEffect(() => {
        setFieldValue('schedule_checkboxes', checkedDays);
        validateField('schedule_checkboxes');
    }, [checkedDays, setFieldValue, validateField]);


  const handleCheckboxChange = (day) => {
    const isChecked = !checkedDays[day];
    setCheckedDays({ ...checkedDays, [day]: isChecked });
    // setFieldValue('schedule_checkboxes', { ...checkedDays, [day]: isChecked });
    if (isChecked) {
      setFieldValue(`${day}_time`, "07:00");
      setFieldValue(`${day}_amount`, defaultAmount);
      
    } else {
      setFieldValue(`${day}_time`, "");
      setFieldValue(`${day}_amount`, defaultAmount);
    }
  };

  return (
    <div className="mb-6">
      <p className="flex block text-sm font-medium text-black mb-2">
        Scheduling Settings
      </p>
      <div className="flex flex-wrap mb-4">
        {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day, index) => (
          <div key={index} className="flex-1 border border-gray-200 p-4 rounded-md">
            <div className="flex items-center mb-2">
              <Checkbox
                checked={checkedDays[day]}
                onChange={() => handleCheckboxChange(day)}
                className="mr-2"
              />
              <p className="block text-sm font-medium text-black">
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </p>
            </div>
            {/* 
            <label className="block text-sm font-medium text-gray-400 mt-4 mb-2">
              Scheduled Time
            </label>
            <TimePicker
              format={format}
              value={InitialTimeValue(values[`${day}_time`])}
              onChange={(time) => handleTimeChange(`${day}_time`, time, setFieldValue, `${day}_amount`, `${day}`)}
              style={timePickerStyles}
              disabled={!checkedDays[day]}
            />         
            */}
            {values[`${day}_time`] !== "" && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mt-4">
                  # of Creators
                </label>
                <input
                  type="number"
                  name={`${day}_amount`}
                  placeholder="# of Creators"
                  value={values[`${day}_amount`]}
                  onChange={(e) => setFieldValue(`${day}_amount`, e.target.value)}
                  className="!border !border-gray-200 placeholder:text-gray-400 placeholder:opacity-100 appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                  style={inputStyles}
                  disabled={!checkedDays[day]}
                />
                <ErrorMessage name={`${day}_amount`} component={TextError} />
              </div>
            )}
          </div>
        ))}
      </div>
      <ErrorMessage name={"schedule_checkboxes"} component={TextError} />
    </div>
  );
};

export default WeeklyAutomationSchedule;