'use client'
import React, { useEffect, useState } from 'react'

const SubmitButton = () => {
    const [changeColor, setChangeColor] = useState<string>("#3b82f6");
    
    useEffect(() => {
      // Access localStorage only on client side
      const storedColor = localStorage.getItem("profileHeaderColor");
      if (storedColor) {
        setChangeColor(storedColor);
      }
    }, []);
  return (
    <div style={{ backgroundColor: changeColor }} className='w-50 flex justify-center items-center p-2 rounded-full transition-all ease-in-out hover:bg-blue-500 hover:-translate-y-1.5'>
        <button className='cursor-pointer text-white' type="submit">Require</button>
    </div>
  )
}

export default SubmitButton
