import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;


const TextField = ({ disabled = false, maxLength = 100, initialValue = "", handleChangeOnFormik = (any) => {}, placeholder="", minimum_rows = 3, maximum_rows = 20, className="" }) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        handleChangeOnFormik(e.target.value);
    };

    return (
        <div>
            <TextArea
                className={className}
                size="large"
                showCount
                maxLength={maxLength}
                onChange={onChange}
                defaultValue={initialValue}
                autoSize={{ minRows: minimum_rows, maxRows: maximum_rows }}
                disabled={disabled}
                placeholder={placeholder}
            />
        </div>
    );
};

export default TextField;
