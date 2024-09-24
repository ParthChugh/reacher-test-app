import React from 'react'

const TextError = (props: any) => {
  return (
    <div className='text-red-500 text-md mt-1'>
      {props.children}
    </div>
  )
}

export default TextError