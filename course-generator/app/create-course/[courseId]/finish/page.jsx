'use client'
import React from 'react'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import CourseBasicInfo from '../_components/CourseBasicInfo'
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2'

function FinishScreen() {
  const params = useParams()
  const courseId = params.courseId
  const { user } = useUser()
  const [course, setCourse] = useState([])
  const router = useRouter()

  useEffect(() => {
    const courseId = params.courseId
    courseId && GetCourse()
  }, [courseId, user])

  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList.courseID, courseId),
          eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress),
        ),
      )
    setCourse(result[0])
  }

  return (
    <div className='px-10 md:px-20 lg:px-44 my-7'>
      <h2 className='text-center font-bold text-2xl text-purple-500 py-2 px-4'>
        {' '}
        Congratulations! Your Course is Ready{' '}
      </h2>

      <CourseBasicInfo course={course} refreshData={() => console.log()} />

      <h2 className='mt-3'>Course URL:</h2>

      <h2 className='text-center text-gray-400 border p-2 rounded-lg flex gap-5 items-center'>
        {' '}
        {process.env.NEXT_PUBLIC_HOST_NAME}/course/view/{course?.courseID}{' '}
        <HiOutlineClipboardDocumentCheck
          className='h-5 w-5 cursor-pointer'
          onClick={async () =>
            await navigator.clipboard.writeText(
              process.env.NEXT_PUBLIC_HOST_NAME +
                '/course/view/' +
                course?.courseID,
            )
          }
        />
      </h2>
    </div>
  )
}

export default FinishScreen
