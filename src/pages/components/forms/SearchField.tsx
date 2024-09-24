import React, { FC, HTMLProps, useState } from "react";

interface SearchFieldProps extends HTMLProps<HTMLInputElement> {
  placeholder?: string;
  inputId?: string;
  value?: string; // Add value prop
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Add onChange prop
}

const SearchField: FC<SearchFieldProps> = ({
  placeholder = "Search...",
  inputId = "default-search",
  value = "", // Initialize value prop
  onChange, // Destructure onChange
  ...rest
}) => {
  // Use state for managing the input value
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Update the local state
    if (onChange) {
      onChange(event); // Pass the event to the parent component
    }
  };

  return (
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
              stroke="#828282"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20.9999 21L16.6499 16.65"
              stroke="#828282"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <input
          type="search"
          id={inputId}
          className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          required
          value={inputValue} // Use the local state value
          onChange={handleChange} // Handle the change event
          {...rest}
        />
      </div>
  );
};

export default SearchField;
