import React from 'react'
import { UserButton } from '@clerk/nextjs'

function Header() {
  return (
    <div className='flex justify-between items-center p-5 shadow-sm'>
      <img src='/logo.png' width={50} height={40} />
      <UserButton />
    </div>
  )
}

export default Header
