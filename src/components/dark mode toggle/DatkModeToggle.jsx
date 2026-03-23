"use client"
import React from 'react'
import useTheme from '@/context/ThemeContext'

const DatkModeToggle = () => {
  
  const { toggle,mode } = useTheme();
  return (
    <div className='flex border-2 w-12 h-6 items-center justify-between cursor-pointer rounded-3xl relative ' onClick={toggle}>
      <div className='text-[12px] p-0.5'>🌙</div>
      <div className='text-[12px] p-0.5'>🔆</div>
      <div className={`absolute bg-[#52c38b] rounded-full w-4 h-4 ${mode === "dark" ? "right-0.5" : "left-0.5"} `} />
    </div>
  )
}

export default DatkModeToggle
