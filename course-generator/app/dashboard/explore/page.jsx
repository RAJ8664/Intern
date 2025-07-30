'use client'
import React, { useEffect } from 'react'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useState } from 'react'
import CourseCard from '@/app/dashboard/_components/CourseCard'
import { Button } from '@/components/ui/button'
import { authors } from '@/configs/schema'

function Explore() {
  const [courseList, setCourseList] = useState([])
  const [pageIndex, setPageIndex] = useState(0)
  const [authorList, setAuthorList] = useState([])

  const print = async () => {
    const result = await db.select().from(authors)
    console.log(result)
    setAuthorList(result)
  }
  useEffect(() => {
    GetAllCourse()
  }, [pageIndex])

  const DoSomething = async () => {
    await db
      .insert(authors)
      .values([
        { name: 'nikhil' },
        { name: 'Raj' },
        { name: 'Nikita' },
        { name: 'chilaka' },
      ])
    console.log('pushed')
    await print()
  }

  const GetAllCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .limit(9)
      .offset(pageIndex * 9)
    setCourseList(result)
    console.log('All courses fetched:', result)
  }

  return (
    <>
      <div className='font-bold text-3xl'>Explore more projects</div>

      <div>
        {' '}
        <button onClick={DoSomething}> click me </button>
        <div>
          {authorList.map((a, idx) => (
            <div key={idx}>{a.name}</div>
          ))}
        </div>{' '}
      </div>

      <p>Explore more project build with AI by other users</p>
      <div className='grid gird-cols-2 lg:grid-cols-3 gap-5'>
        {courseList.map((course) => (
          <div key={course.id}>
            <CourseCard course={course} displayUser={true} />
          </div>
        ))}
      </div>
      <div className='flex items-center justify-between mt-5'>
        {pageIndex != 0 && (
          <Button onClick={() => setPageIndex(pageIndex - 1)}>
            Previous Page
          </Button>
        )}
        <Button onClick={() => setPageIndex(pageIndex + 1)}>Next Page</Button>
      </div>
    </>
  )
}

export default Explore
