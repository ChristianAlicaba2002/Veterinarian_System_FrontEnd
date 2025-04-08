import React from 'react'

const SubmitButton = ({dataForm}:any) => {
  return (
    <div className='bg-blue-600 w-50 flex justify-center items-center p-2 rounded-full transition-all ease-in-out hover:bg-blue-500 hover:-translate-y-1.5'>
        <button className='cursor-pointer text-white' type="submit">Reserve</button>
    </div>
  )
}

export default SubmitButton
