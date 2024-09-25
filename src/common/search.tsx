import React, { useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface SearchComponentProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onSearch: (searchQuery: string) => void;
  inputStyle?: any;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  label = "",
  placeholder = "Search...",
  value,
  onSearch = () => {},
  inputStyle = {},
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <Input
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        suffix={
          <SearchOutlined className="text-gray-400" onClick={handleSearch} />
        }
        className="w-full"
        style={{ ...inputStyle }}
      />
    </div>
  );
};

export default SearchComponent;
