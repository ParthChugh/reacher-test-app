// This component allows to take some input from the user and generate a list of max lenght 100 by default
// Users would be able to add or delete items from that list with buttons
// Takes an onChange function to send the current list content after adding or deleting an item from the list


import { useState } from 'react';
import { Input } from 'antd';
import TextError from '../../components/forms/TextError';

interface AddToListProps {
    label?: string;
    placeHolder?: string;
    onChange: (value?: []) => void;
    listItems?: [];
    maxListLenght?: number;
    disabled?: boolean;
    className?: string;
}


const AddToList: React.FC<AddToListProps> = ({
    label,
    placeHolder,
    onChange,
    listItems =[], // Empty list by default
    maxListLenght = 100, // Default maximum list lenght is 100
    disabled = false,
    className,
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
    </div>
  );
}

export default AddToList;
