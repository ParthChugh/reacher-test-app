import React, { useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface SearchComponentProps {
  label: string;
  placeholder?: string;
  value?: string;
  onSearch: (searchQuery: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  label,
  placeholder = "Search...",
  value,
  onSearch = () => {},
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <Input
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        suffix={
          <SearchOutlined
            className="text-gray-400"
            onClick={handleSearch}
          />
        } 
        className="w-full"
      />
    </div>
  );
};

export default SearchComponent;
