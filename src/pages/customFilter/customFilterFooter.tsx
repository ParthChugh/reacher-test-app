import React from "react";
import { Button } from "antd";

interface FilterFooterProps {
  onClearAll: () => void;
  onApplyFilters: () => void;
}

const FilterFooter: React.FC<FilterFooterProps> = ({
  onClearAll,
  onApplyFilters,
}) => {
  return (
    <div className="flex justify-end gap-4 mt-10 w-full">
      <Button
        onClick={onClearAll}
        className="bg-white text-black border-gray-300 hover:bg-gray-100 w-full"
      >
        Clear All
      </Button>
      <Button className="w-full bg-black text-white w-full" type="primary" onClick={onApplyFilters}>
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterFooter;
