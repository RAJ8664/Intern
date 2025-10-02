export const dynamic = 'force-dynamic'
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
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useEffect } from 'react'
import { eq } from 'drizzle-orm'
import { useState } from 'react'

function EditChapters({ course, index, refreshData }) {
    const Chapters = course?.courseOutput?.[0]?.chapters
    const [name, setName] = useState()
    const [about, setAbout] = useState()

    useEffect(() => {
        setName(Chapters[index]?.chapter_name)
        setAbout(Chapters[index]?.about)
    }, [course])

    const onUpdateHandler = async () => {
        course.courseOutput[0].chapters[index].chapter_name = name
        course.courseOutput[0].chapters[index].about = about
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
                    <DialogTitle>Edit Chapters</DialogTitle>
                    <DialogDescription>
                        <div className='mt-3'>
                            <label>Chapter Title</label>
                            <Input
                                defaultValue={Chapters[index]?.chapter_name}
                                onChange={(event) => setName(event?.target.value)}
                            />
                        </div>
                        <div>
                            <label> Chapter Description </label>
                            <Textarea
                                className='h-40'
                                defaultValue={Chapters[index]?.about}
                                onChange={(event) => setAbout(event?.target.value)}
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

export default EditChapters
