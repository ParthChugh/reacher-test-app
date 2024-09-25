// This component allows to take some input from the user and generate a list of max lenght 100 by default
// Users would be able to add or delete items from that list with buttons
// Takes an onChange function to send the current list content after adding or deleting an item from the list


import { useState } from 'react';
import { Input, Button, List } from 'antd';
import TextError from './TextError';

interface AddToListProps {
    label?: string;
    placeHolder?: string;
    onChange: (value?: []) => void;
    listItems?: [];
    maxListLenght?: number;
    disabled?: boolean;
}


const AddToList: React.FC<AddToListProps> = ({
    label,
    placeHolder,
    onChange,
    listItems =[], // Empty list by default
    maxListLenght = 100, // Default maximum list lenght is 100
    disabled = false,
  }) => {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState(listItems);
  const [error, setError] = useState('');

  const handleInputChange = (value) => {
    setInputValue(value);
    if (error) setError('');  // If the user changes the input, clear the error message
  };

  const handleAddClick = () => {
    if(items.length >= maxListLenght){
      setError('You cannot add more than 3 products.');
      return
    }

    if (inputValue.trim()) { // Check if the input is not just whitespace
      if(!items.includes(inputValue)){
        if (/^\d+$/.test(inputValue)) {
          const newItems = [...items, inputValue];
          setItems(newItems);
          onChange(newItems); // Give new items to the caller's function assigned as prop
          setInputValue(''); // Clear the input field after adding
        } else{
          setError('Please enter a valid input.');
        }
      } else{
        setError('This item is already in the list.');
      }
    } else{
      setError('Input cannot be empty.');
    }
  };

  const handleDeleteClick = (index) => {
    const newItems = items.filter((_, idx) => idx !== index);
    setItems(newItems);
    onChange(newItems); // Give new list to the caller's function
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();  // Prevent default form submit behavior of the form when the user presses Enter
      handleAddClick();
    }
  };

  return (
    <div>
      <div onKeyDown={handleKeyDown} className="flex items-center space-x-2">
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={placeHolder} // Acts as the placeholder text
              size="large" // Equivalent to `size="lg"`
              disabled={disabled}
              className="!border !border-gray-200 placeholder:text-gray-400 placeholder:opacity-100 appearance-none border rounded-md w-full py-4 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              style={{
                borderColor: '#e2e8f0', // Sets border color similar to gray-200
                color: '#1f2937', // Text color similar to gray-900
              }}
            />
            <Button
              onClick={handleAddClick}
              type="primary" // Ant Design uses `type` to define button styles
              size="large" // Equivalent to `size="lg"`
              disabled={disabled}
              className="bg-white automation-add-new-button-bg hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Add
            </Button>
      </div>
      {error && <TextError>{error}</TextError>}
      <List
        dataSource={items}
        renderItem={(item, index) => (
          <List.Item
            key={index}
            className="flex justify-between items-center !border !border-gray-200 rounded-md my-1 p-2 bg-white"
            style={{
              padding: '8px',
              border: '1px solid #e2e8f0', // Gray-200 equivalent
              borderRadius: '4px',
              marginBottom: '8px',
            }}
          >
            {"Product ID: " + item}
            <Button
              onClick={() => handleDeleteClick(index)}
              type="primary"
              danger
              size="small"
              style={{ backgroundColor: 'red', borderColor: 'red' }}
            >
              Delete
            </Button>
          </List.Item>
        )}
      />
    </div>
  );
}

export default AddToList;