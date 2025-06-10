import React from 'react'
import { IoBookSharp } from 'react-icons/io5'
import { HiOutlineBookOpen } from 'react-icons/hi2'
import { HiMiniEllipsisVertical } from 'react-icons/hi2'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import DropdownOption from './DropdownOption'
import Link from 'next/link'

export function CourseCard({ course, refreshData }) {
  const handleOnDelete = async () => {
    const response = await db
      .delete(CourseList)
      .where(eq(CourseList.courseID, course?.courseID))
      .returning({ courseID: CourseList?.courseID })
    if (response) {
      refreshData()
    }
  }
  return (
    <div
      className='shadow-sm rounded-lg border p-2
    hover:scale-105 transition-all cursor-pointer mt-4 '
    >
      <Link href={'/course/' + course?.courseID}>
        <img
          src={course?.courseBanner}
          width={300}
          height={200}
          className=' w-full h-[200px] object-cover rounded-lg'
        />
      </Link>
      <div className='p-2'>
        <h2 className='font-medium text-lg flex justify-between items-center'>
          {course?.courseOutput[0]?.course_name}
          <DropdownOption handleOnDelete={() => handleOnDelete()}>
            {' '}
            <HiMiniEllipsisVertical />
          </DropdownOption>
        </h2>
        <p className='text-sm text-gray-400 my-1'>{course?.category}</p>
        <div className='flex items-center justify-between'>
          <h2 className='flex gap-2 items-center p-1 bg-purple-50 text-purple-400 text-sm rounded-sm '>
            <HiOutlineBookOpen /> {course?.courseOutput[0]?.no_of_chapters}{' '}
            Chapters
          </h2>
          <h2 className='text-sm bg-purple-50 text-purple-400 p-1 rounded-sm'>
            {course?.level}
          </h2>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
