'use client'

import { ErrorMessage, Field } from 'formik'
import React from 'react'
import TextError from "./TextError"

const InputField = (props: any) => {
   const { label, name, size = 'sm', ...rest } = props
   return (
      <div className="mb-6">
		{label && <label htmlFor={name} className="block text-sm font-medium text-black mb-2"> {label} </label>}
         <Field
            name={name}
            id={name}
            {...rest}
			className={`placeholder-gray-400 appearance-none border rounded-md w-full ${size === 'sm' ? 'py-2': 'py-3.5'} px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
         />
         <ErrorMessage name={name} component={TextError} />
      </div>
   )
}

export default InputField