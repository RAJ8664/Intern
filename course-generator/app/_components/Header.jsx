import React from 'react'
import { Button } from "@/components/ui/button";
function Header() {
  return (
    <div className='flex justify-between p-5 shadow-sm'>
      <img src="/logo.png" alt="logo" width={100} height={100} />
      <Button>Get Started</Button>
    </div>
  )
}

export default Header;
