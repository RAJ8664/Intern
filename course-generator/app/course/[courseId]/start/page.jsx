'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ChapterListCard from './_components/ChapterListCard'
import ChapterContent from './_components/ChapterContent'

function CourseStart() {
  const { courseId } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedChapter, setSelectedChapter] = useState(null)
  const [selectedChapterContent, setSelectedChapterContent] = useState(null)
  const [loadingContent, setLoadingContent] = useState(false)
  const [errorContent, setErrorContent] = useState(null)

  // Fetch Course first
  useEffect(() => {
    if (!courseId) return
    const GetCourse = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch('/api/course/' + courseId)
        if (!res.ok) {
          console.error(await res.text()) // Prints error if something went wrong
          return
        }
        const data = await res.json()
        setCourse(data.length ? data[0] : null)
      } catch (error) {
        console.error(error)
        setError(error.toString()) // Store error for UI
      } finally {
        setLoading(false)
      }
    }
    GetCourse()
  }, [courseId])
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!course) return <div>Course not found</div>

  // Handler to fetch chapter details
  const GetSelectedChapterContent = async (chapterId) => {
    setLoadingContent(true)
    setErrorContent(null)
    try {
      const res = await fetch('/api/chapter/' + courseId + '/' + chapterId)
      if (!res.ok) {
        console.error(await res.text()) // Prints error if something went wrong
        return
      }
      const data = await res.json()
      console.log('Selected chapter content.', data)
      setSelectedChapterContent(data)
    } catch (error) {
      console.error(error)
      setErrorContent(error.toString()) // Store error for UI
    } finally {
      setLoadingContent(false)
    }
  }

  return (
    <div className='flex'>
      {/* Chapter list side panel*/}
      <div className='fixed md:w-64 hidden md:block h-screen bg-blue-50'>
        <h2 className='font-semibold text-lg bg-purple-500 p-3 text-gray-50'>
          {course.courseOutput[0]?.course_name}
        </h2>
        <div>
          {course?.courseOutput[0]?.chapters.map((chapter, index) => (
            <div
              key={index}
              className={`cursor-pointer hover:bg-purple-100 duration-200 ${
                selectedChapter &&
                selectedChapter.chapterId === chapter.chapterId
                  ? 'bg-purple-200'
                  : ''
              }`}
              onClick={() => {
                setSelectedChapter(chapter)
                GetSelectedChapterContent(index)
              }}
            >
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Content Section*/}
      <div className='md:ml-64 p-10'>
        <ChapterContent
          chapter={selectedChapter}
          content={selectedChapterContent}
        />
      </div>
    </div>
  )
}

export default CourseStart
