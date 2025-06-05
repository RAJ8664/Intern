import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { BsPencilSquare } from 'react-icons/bs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useEffect } from 'react'
import { eq } from 'drizzle-orm'

function EditCourseBasicInfo({ course, refreshData }) {
  const [name, setName] = useState()
  const [description, setDescription] = useState()

  useEffect(() => {
    setName(course?.courseOutput?.[0]?.course_name)
    setDescription(course?.courseOutput?.[0]?.description)
  }, [course])

  const onUpdateHandler = async () => {
    course.courseOutput[0].course_name = name
    course.courseOutput[0].description = description
    const result = await db
      .update(CourseList)
      .set({
        courseOutput: course?.courseOutput,
      })
      .where(eq(CourseList?.id, course?.id))
      .returning({ id: CourseList.id })
    refreshData(true)
  }

  return (
    <Dialog>
      <DialogTrigger>
        <span
          style={{
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          <BsPencilSquare />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course Title and Description</DialogTitle>
          <DialogDescription>
            <div className='mt-3'>
              <label>Course Title</label>
              <Input
                defaultValue={course?.courseOutput?.[0]?.course_name}
                onChange={(event) => setName(event?.target.value)}
              />
            </div>
            <div>
              <label> Description </label>
              <Textarea
                className='h-40'
                defaultValue={course?.courseOutput?.[0]?.description}
                onChange={(event) => setDescription(event?.target.value)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button onClick={onUpdateHandler}> Update </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditCourseBasicInfo
