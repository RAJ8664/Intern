export const dynamic = 'force-dynamic'
import React from 'react'
import { UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

function Header() {
    const router = useRouter()
    return (
        <div className='flex justify-between items-center p-5 shadow-sm'>
            <img
                src='/logo.png'
                onClick={() => router.push('/')}
                width={50}
                height={40}
            />
            <UserButton />
        </div>
    )
}

export default Header
