'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

function Header() {
    const router = useRouter()

    return (
        <div className='flex justify-between p-5 shadow-sm'>
            <img
                src='/logo.png'
                onClick={() => router.push('/')}
                alt='logo'
                width={100}
                height={100}
            />
            <Button onClick={() => router.push('/')}>Get Started</Button>
        </div>
    )
}

export default Header
