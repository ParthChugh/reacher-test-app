
import React, { useState } from 'react';

const TimeframeDropdown: React.FC = () => {
  // Define selectedOption state
  const [selectedOption, setSelectedOption] = useState("");

  // Define handleSelectChange function
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <select className="rounded-md border bg-white shadow-md p-2" value={selectedOption} onChange={handleSelectChange}>
        <option value="last7days">Timeframe: Last 7 Days</option>
        <option value="lastmonth">Timeframe: Last Month</option>
        <option value="today">Timeframe: Today</option>
      </select>
    </div>
  );
};

export default TimeframeDropdown;
