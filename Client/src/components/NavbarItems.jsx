import React from 'react'

const NavbarItems = ({label}) => {
  return (
    <div className='text-white cursor-pointer hover:text-gray-400 transition duration-200'>{label}</div>
  )
}

export default NavbarItems