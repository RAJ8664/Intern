import React from 'react'
import { BarChart3, Clock, BookOpen, Video } from 'lucide-react'

function CourseDetail({ course }) {
  const calculateTotalDuration = () => {
    if (!course?.courseOutput?.[0]?.chapters) return '0 min'
    let totalMinutes = 0
    course.courseOutput[0].chapters.forEach((chapter) => {
      if (chapter.duration) {
        const duration = chapter.duration.toString()
        const minutes = parseInt(duration.match(/\d+/)?.[0] || 0)
        totalMinutes += minutes
      }
    })
    if (totalMinutes >= 60) {
      const hours = Math.floor(totalMinutes / 60)
      const remainingMinutes = totalMinutes % 60
      return remainingMinutes > 0
        ? `${hours}h ${remainingMinutes}m`
        : `${hours}h`
    }
    return `${totalMinutes} min`
  }

  return (
    <div className='p-10 border rounded-xl shadow-lg mt-3'>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
        <div className='flex gap-2'>
          <BarChart3 className='w-8 h-8 text-purple-600 mt-1' />
          <div>
            <h2 className='text-xs text-gray-500'>Skill Level</h2>
            <h2 className='font-medium text-lg text-gray-900'>
              {course?.level}
            </h2>
          </div>
        </div>
        <div className='flex gap-2'>
          <Clock className='w-8 h-8 text-purple-600 mt-1' />
          <div>
            <h2 className='text-xs text-gray-500'>Duration</h2>
            <h2 className='font-medium text-lg text-gray-900'>
              {calculateTotalDuration()}
            </h2>
          </div>
        </div>
        <div className='flex gap-2'>
          <BookOpen className='w-8 h-8 text-purple-600 mt-1' />
          <div>
            <h2 className='text-xs text-gray-500'>No Of Chapters</h2>
            <h2 className='font-medium text-lg text-gray-900'>
              {course?.courseOutput?.[0]?.no_of_chapters}
            </h2>
          </div>
        </div>
        <div className='flex gap-2'>
          <Video className='w-8 h-8 text-purple-600 mt-1' />
          <div>
            <h2 className='text-xs text-gray-500'>Video Included?</h2>
            <h2 className='font-medium text-lg text-gray-900'>
              {course?.courseOutput?.[0]?.video}
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
