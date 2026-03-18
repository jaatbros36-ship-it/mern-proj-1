import React from 'react'

const Layout = ({ children }) => {
  return (
    <div>
       <h1 className='font-extrabold text-5xl text-center w-[1366px] my-7'>Our Works</h1>
       { children }
    </div>
  )
}

export default Layout
