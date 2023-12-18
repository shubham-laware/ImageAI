import React from 'react'
import { Link } from 'react-router-dom'


function Navbar() {
  return (
    <>
    <nav className='px-2 sm:px-32 border border-solid flex justify-between items-center fixed w-full bg-white  py-2 top-0 h-[60px] z-50'>
      <Link to={'/'}>
      <button>
      <img src="ImageAI-logo.png" alt="logo" className=' w-[140px] object-cover  '/>
      </button>
      </Link>
      <Link to={'/createImage'}>
      <button className='border border-solid w-[80px] h-[40px]  flex justify-center items-center bg-2563eb rounded-md hover:bg-gray-100'>Create</button>
      </Link>
    </nav>
    </>
  )
}

export default Navbar
