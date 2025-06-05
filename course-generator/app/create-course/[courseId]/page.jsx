'use client'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import CourseBasicInfo from './_components/CourseBasicInfo'
import CourseDetail from './_components/CourseDetail'
import ChapterList from './_components/ChapterList'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { GenerateCourseLayout_AI } from '../../../configs/AiModel'
import LoadingDialog from '../_components/LoadingDialog'

function CourseLayout() {
  const params = useParams()
  const courseId = params.courseId
  const { user } = useUser()
  const [course, setCourse] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
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
    console.log(result)
  }

  const GenerateChapterContent = async () => {
    setLoading(true)
    const chapters = course?.courseOutput?.[0]?.chapters
    chapters.forEach(async (chapter, index) => {
      const PROMPT =
        'Explain the concept in Detail on topic: ' +
        course?.name +
        ', chapter: ' +
        chapter.chapter_name +
        ', in JSON Format with list of array with field as title, explanation on given chapter in detail, Code Example(code field in <precode> format) if applicable'

      if (index == 0) {
        try {
          const result = await GenerateCourseLayout_AI.sendMessage(PROMPT)

          /* Response in text format */
          console.log(result)

          /* TO Convert into Json format --> JSON.parse(result) --> from text to json format */
          console.log(JSON.parse(result))
          setLoading(false)
        } catch (error) {
          setLoading(false)
          console.log(error)
        }
      }
    })
  }

  return (
    <div className='mt-10 px-7 md:px-20 lg:px-44'>
      <h2 className='font-bold text-center text-2xl'>Course Layout</h2>

      <LoadingDialog loading={loading} />
      {/* Basic Info */}
      <CourseBasicInfo course={course} refreshData={() => GetCourse()} />

      {/* Course Detail */}
      <CourseDetail course={course} />

      {/* List of Lesson */}
      <ChapterList course={course} refreshData={() => GetCourse()} />
      <Button onClick={GenerateChapterContent} className='my-10'>
        {' '}
        Generate Course Content{' '}
      </Button>
    </div>
  )
}

export default CourseLayout
