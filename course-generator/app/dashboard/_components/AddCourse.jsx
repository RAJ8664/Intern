"use client"
import React from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button';

function AddCourse() {
    const {user} = useUser();
    return (
        <div className='flex item-center justify-between'> 
            <div>
                <h2 className='text-3xl'>Hello,
                <span className='font-bold'>{user?.fullName}</span></h2>
                <p className='text-sm text-gray-500'>Create new course with AI, Share with friends and Earn from it</p>
            </div>
            <Button className='bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-3 text-white'>+ Create AI course</Button>
        </div>
)
}

export default AddCourse