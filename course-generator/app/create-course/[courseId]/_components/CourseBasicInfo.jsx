import React from 'react'
import { Button } from '@/components/ui/button'
import { Puzzle } from 'lucide-react'
import EditCourseBasicInfo from './EditCourseBasicInfo'
import { useState } from 'react'
import { storage } from '@/configs/firebaseConfig'
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { eq } from 'drizzle-orm'

function CourseBasicInfo({ course, refreshData }) {
  const [selectedFile, setSelectedFile] = useState()

  /* Using Cloudinary */
  const onFileSelected = async (event) => {
    const file = event.target.files[0]
    setSelectedFile(URL.createObjectURL(file))
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'ai-course-generator')
    try {
      const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`
      const res = await fetch(url, {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      /* we can now store data.secure_url or use it wherever needed */
      await db
        .update(CourseList)
        .set({
          courseBanner: data.secure_url,
        })
        .where(eq(CourseList.id, course?.id))
      setSelectedFile(data.secure_url)
      refreshData(true)
    } catch (err) {
      console.error('Upload error:', err)
    }
  }

  return (
    <div className='p-10 border rounded-xl shadow-lg mt-5'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
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
          <label htmlFor='upload-image'>
            <img
              src={
                course?.courseBanner === '/placeholder.png'
                  ? '/placeholder.png'
                  : course?.courseBanner
              }
              width={800}
              height={700}
              alt='Course thumbnail'
              className='rounded-xl h-[250px] object-cover cursor-pointer'
            />
          </label>
          <input
            type='file'
            id='upload-image'
            className='opacity-0'
            onChange={onFileSelected}
          ></input>
        </div>
      </div>
    </div>
  )
}

export default CourseBasicInfo
