'use client'
import React from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { UserCourseListContext } from '@/app/_context/UserCourseListContext'
import { useContext } from 'react'
import { useState } from 'react'

function AddCourse() {
  const { user } = useUser()
  let myEmail = user?.primaryEmailAddress?.emailAddress
  let val = 5
  let count = 0
  const [isCollege, setisCollege] = useState(false)

  if (true && count <= 1) count++
  if (
    typeof myEmail === 'string' &&
    myEmail.endsWith('nits.ac.in') &&
    isCollege == false &&
    count <= 1
  ) {
    setisCollege(true)
    count++
  }
  if (isCollege == true) val = 50

  const { userCourseList, setUserCourseList } = useContext(
    UserCourseListContext,
  )

  return (
    <div className='flex item-center justify-between'>
      <div>
        <h2 className='text-3xl'>
          Hello,
          <span className='font-bold'>{user?.fullName}</span>
        </h2>
        <p className='text-sm text-gray-500'>
          Create new course with AI, and Share it with your friends.
        </p>
      </div>

      <Link
        href={
          userCourseList?.length >= val
            ? '/dashboard/upgrade'
            : '/create-course'
        }
      >
        <Button className='bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-3 text-white hover:from-purple-400 hover:to-blue-400 hover:scale-105 hover:shadow-xl transition-all duration-200 focus:ring-2 focus:ring-blue-300'>
          + Create AI course
        </Button>
      </Link>
    </div>
  )
}

export default AddCourse
