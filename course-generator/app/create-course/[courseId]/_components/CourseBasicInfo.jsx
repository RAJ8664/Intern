import React from 'react'
import { Button } from '@/components/ui/button'
import { Puzzle } from 'lucide-react'
import EditCourseBasicInfo from './EditCourseBasicInfo'

function CourseBasicInfo({ course, refreshData }) {
  return (
    <div className='p-10 border rounded-xl shadow-lg mt-5'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div>
          <h2 className='font-bold text-3xl'>
            {course?.courseOutput?.[0]?.course_name}{' '}
            <EditCourseBasicInfo
              course={course}
              refreshData={() => refreshData(true)}
            />
          </h2>
          <p className='text-sm text-gray-400 mt-3'>
            {course?.courseOutput?.[0]?.description}
          </p>
          {course?.category && (
            <h2 className='font-medium mt-2 flex gap-2 items-center text-purple-500'>
              <Puzzle className='w-5 h-5' />
              {course.category}
            </h2>
          )}
          <Button className='w-full mt-5 bg-purple-600 text-white hover:bg-purple-400'>
            Start
          </Button>
        </div>
        <div>
          <img
            src={'/placeholder.png'}
            width={400}
            height={200}
            alt='Course thumbnail'
            className='rounded-xl h-[250px] object-cover'
          />
        </div>
      </div>
    </div>
  )
}

export default CourseBasicInfo
