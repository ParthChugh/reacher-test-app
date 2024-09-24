import React from "react";
import { Input, Select } from "antd";

const { Option } = Select;

interface FilterOption {
  label: string;
  value: string;
  selected: boolean;
}

interface FilterGroup {
  label: string;
  options?: FilterOption[];
  type?: "checkbox" | "single" | "text" | "select" | "dropdown_multiselect";
  value?: string;
}

interface Filters {
  status: FilterGroup;
  follower_count: FilterGroup;
  gmv: FilterGroup;
  creator_fulfillment_rate: FilterGroup;
  gender: FilterGroup;
  name_of_product: FilterGroup;
  tags: FilterGroup;
}

interface CustomFiltersProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const CustomFilters: React.FC<CustomFiltersProps> = ({
  filters,
  setFilters,
}) => {
  // Handle item click change

  const handleItemClick = (key: keyof Filters, value: string) => {
    setFilters((prevFilters: Filters) => ({
      ...prevFilters,
      [key]: {
        ...prevFilters[key],
        options: prevFilters[key].options?.map((option) => ({
          ...option,
          selected: option.value === value ? !option.selected : option.selected,
        })),
      },
    }));
  };

  // Handle select (single) change
  const handleSingleSelectChange = (key: keyof Filters, value: string) => {
    setFilters((prevFilters: Filters) => ({
      ...prevFilters,
      [key]: {
        ...prevFilters[key],
        options: prevFilters[key].options?.map((option) => ({
          ...option,
          selected: option.value === value,
        })),
      },
    }));
  };

  // Handle text input change
  const handleInputChange = (key: keyof Filters, value: string) => {
    setFilters((prevFilters: Filters) => ({
      ...prevFilters,
      [key]: {
        ...prevFilters[key],
        value,
      },
    }));
  };

  // Handle multi-select dropdown change
  const handleMultiSelectChange = (key: keyof Filters, values: string[]) => {
    setFilters((prevFilters: Filters) => ({
      ...prevFilters,
      [key]: {
        ...prevFilters[key],
        options: prevFilters[key].options?.map((option) => ({
          ...option,
          selected: values.includes(option.value),
        })),
      },
    }));
  };

  // Render the appropriate component based on the filter type
  const renderFilterComponent = (filter: FilterGroup, filterKey: keyof Filters) => {
    switch (filter.type) {
      case "checkbox":
        return (
          <div className="flex flex-wrap gap-2">
            {filter.options?.map((option) => (
              <div
                key={option.value}
                className={`px-3 py-2 border rounded cursor-pointer transition-colors ${
                  option.selected
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-black border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => handleItemClick(filterKey, option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        );
      case "single":
        return (
          <Select
            value={filter.options?.find((option) => option.selected)?.value}
            onChange={(value) => handleSingleSelectChange(filterKey, value)}
            className="w-full"
          >
            {filter.options?.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        );
      case "text":
        return (
          <Input
            value={filter.value}
            onChange={(e) => handleInputChange(filterKey, e.target.value)}
            className="w-full"
          />
        );
      case "dropdown_multiselect":
        return (
          <Select
            mode="multiple"
            value={filter.options?.filter((option) => option.selected).map((option) => option.value)}
            onChange={(values) => handleMultiSelectChange(filterKey, values as string[])}
            className="w-full"
          >
            {filter.options?.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {Object.keys(filters).map((key) => {
        const filterKey = key as keyof Filters;
        const filter = filters[filterKey];

        return (
          <div key={filterKey} className="mb-4">
            <h4 className="mb-2 font-medium">{filter.label}</h4>
            {renderFilterComponent(filter, filterKey)}
          </div>
        );
      })}
    </div>
  );
};

export default CustomFilters;
