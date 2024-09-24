import React, { useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addToUpdateActionJson, removeFromUpdateActionJson } from '../../store/assistant';

const RowActions = ({ initialAction, rowID }) => {
    const assistant = useAppSelector(state => state.assistant);
    const dispatch = useAppDispatch();
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        if (!assistant.statusLoadCompleted) {
            setSelectedOption(null);
        }
    }, [assistant.statusLoadCompleted]);
    
    const handleSelectChange = selectedOption => {
        setSelectedOption(selectedOption);
        console.log("Current updateActionJson: ", assistant.updateActionJson);
        const key = rowID;
        if (selectedOption){ // If the user selected an option
            if (rowID in assistant.updateActionJson) {
                dispatch(removeFromUpdateActionJson(key));  // If we already added this rowID to the updateActionJson, remove it and add it with new changed value
                dispatch(addToUpdateActionJson({ [key] : selectedOption.value }));
            } 
            else {
            dispatch(addToUpdateActionJson({ [key] : selectedOption.value })); // If we haven't added this rowID to the updateActionJson, add it
            }
            console.log("Added to updateActionJson, changed from old value: ", assistant.updateActionJson[key], "with key: ", key, "to new value: ", selectedOption.value);
        } else {
            console.log("Removing from updateActionJson: ", assistant.updateActionJson[key], "with key: ", key);
            dispatch(removeFromUpdateActionJson(key)); // If the user cleared the select, remove the rowID from the updateActionJson
        }
    };

    const customStyles = useMemo(() => ({
        menuPortal: base => ({ ...base, zIndex: 9999 }),
        control: (base, state) => ({
            ...base,
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
            fontSize: '14px',
            fontWeight: '400',
            width: '150px',
            backgroundColor: selectedOption ? '#f0f0f0' : 'white',
            borderColor: selectedOption ? 'blue' : '#ccc',
            boxShadow: selectedOption ? '0 0 0 1px blue' : 'none',
            "&:hover": {
                borderColor: selectedOption ? 'blue' : '#ccc',
            }
        }),
        option: (provided, state) => ({
            ...provided,
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
            fontWeight: state.isSelected ? '600' : '400',
            fontSize: '14px',
            backgroundColor: state.isFocused ? '#e6e6e6' : 'white',
            color: state.isSelected ? '#303030' : '#666',
        }),
    }), [selectedOption]); // Only recompute styles when selectedOption changes

  return (
    <div className="flex items-center space-x-4">
      <div className="relative z-50">
        <Select
          menuPlacement='auto'
          menuPortalTarget={document.body}
          styles={customStyles}
          options={[
            { value: 'Send Content Guide', label: 'Send Content Guide' },
            { value: 'Send Reminder Message', label: 'Send Reminder Message' },
            // { value: 'Approve Sample Request', label: 'Approve Sample Request' },
            //{ value: 'Send Target Collab', label: 'Send Target Collab' },
            { value: 'Other', label: 'Other' },
          ]}
          isClearable={true}
          isMulti={false}
          onChange={handleSelectChange}
          className="text-black leading-tight"
          placeholder={initialAction}
          value={selectedOption}
        />
      </div>
    </div>
  );
};

export default RowActions;

