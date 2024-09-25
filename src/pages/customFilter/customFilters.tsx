import React from "react";
import { Checkbox, Input, Select } from "antd";

const { Option } = Select;

interface FilterOption {
  label: string;
  value: string;
  selected: boolean;
}

interface FilterGroup {
  label: string;
  name?: string;
  options?: FilterOption[];
  type?:
    | "checkbox"
    | "single"
    | "text"
    | "select"
    | "dropdown_multiselect"
    | "checkbox-single"
    | "checkbox-label";
  value?: string;
  selected?: boolean;
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
  labelStyles: any;
  optonClassName?: any;
  selectedClassName?: any;
}

const CustomFilters: React.FC<CustomFiltersProps> = ({
  filters,
  setFilters,
  labelStyles,
  optonClassName,
  selectedClassName,
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

  const handleCheckboxLabelChange = (key: keyof Filters, checked: boolean) => {
    setFilters((prevFilters: Filters) => ({
      ...prevFilters,
      [key]: {
        ...prevFilters[key],
        selected: checked,
      },
    }));
  };

  // Render the appropriate component based on the filter type
  const renderFilterComponent = (
    filter: FilterGroup,
    filterKey: keyof Filters
  ) => {
    switch (filter.type) {
      case "checkbox":
        return (
          <div className="flex flex-wrap gap-2">
            {filter.options?.map((option) => (
              <div
                key={option.value}
                className={`px-3 py-2 border rounded cursor-pointer transition-colors ${optonClassName} ${
                  option.selected
                    ? `bg-black text-white border-black ${selectedClassName}`
                    : "bg-white text-black border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => handleItemClick(filterKey, option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        );

      case "checkbox-single":
        return (
          <div className="flex flex-wrap gap-2">
            {filter.options?.map((option) => (
              <div
                key={option.value}
                className={`px-3 py-2 border rounded cursor-pointer transition-colors ${optonClassName} ${
                  option.selected
                    ? `bg-black text-white border-black ${selectedClassName}`
                    : "bg-white text-black border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() =>
                  handleSingleSelectChange(filterKey, option.value)
                }
              >
                {option.label}
              </div>
            ))}
          </div>
        );
      case "checkbox-label":
        return (
          <Checkbox
            checked={filter.selected}
            onChange={(e) =>
              handleCheckboxLabelChange(filterKey, e.target.checked)
            }
          >
            {filter.name}
          </Checkbox>
        );
      case "single":
        return (
          <Select
            value={filter.options?.find((option) => option.selected)?.value}
            onChange={(value) => handleSingleSelectChange(filterKey, value)}
          >
            {filter.options?.map((option) => (
              <Option
                key={option.value}
                value={option.value}
                className={`w-full ${optonClassName} ${
                  filter.selected
                    ? `bg-black text-white border-black ${selectedClassName}`
                    : "bg-white text-black border-gray-300 hover:bg-gray-100"
                }`}
              >
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
            className={`w-full ${optonClassName} ${
              filter.selected
                ? `bg-black text-white border-black ${selectedClassName}`
                : "bg-white text-black border-gray-300 hover:bg-gray-100"
            }`}
          />
        );
      case "dropdown_multiselect":
        return (
          <Select
            mode="multiple"
            value={filter.options
              ?.filter((option) => option.selected)
              .map((option) => option.value)}
            onChange={(values) =>
              handleMultiSelectChange(filterKey, values as string[])
            }
            className="w-full"
          >
            {filter.options?.map((option) => (
              <Option
                key={option.value}
                value={option.value}
                className={`w-full ${optonClassName} ${
                  filter.selected
                    ? `bg-black text-white border-black ${selectedClassName}`
                    : "bg-white text-black border-gray-300 hover:bg-gray-100"
                }`}
              >
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
            <h4 className="mb-2 font-medium" style={labelStyles}>
              {filter.label}
            </h4>
            {renderFilterComponent(filter, filterKey)}
          </div>
        );
      })}
    </div>
  );
};

export default CustomFilters;
