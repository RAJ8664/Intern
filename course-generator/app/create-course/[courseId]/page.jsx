'use client'

export const dynamic = 'force-dynamic'
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
import service from '../../../configs/service'
import { Chapters } from '../../../configs/schema'
import { useRouter } from 'next/navigation'

function CourseLayout() {
    const params = useParams()
    const courseId = params.courseId
    const { user } = useUser()
    const [course, setCourse] = useState([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()

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
    }

    {
        /* To check if the youtube videoid is valid or not */
    }

    async function checkValid(videoId) {
        const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
        try {
            const response = await fetch(url)
            if (!response.ok) {
                return false
                // return { valid: false, reason: `HTTP ${response.status}` }
            }
            const data = await response.json()
            return true
            // return { valid: true, title: data.title }
        } catch (err) {
            return false
            // return { valid: false, reason: 'Fetch failed or embedding blocked' }
        }
    }

    /* TODO --> customize the prompt for better and long course content */
    const GenerateChapterContent = async () => {
        setLoading(true)
        const chapters = course?.courseOutput?.[0]?.chapters
        chapters.forEach(async (chapter, index) => {
            const PROMPT =
                'Explain the concept in Detail meaning more than 100 lines of explanations on topic: ' +
                course?.name +
                ', chapter: ' +
                chapter.chapter_name +
                ', in JSON Format with list of array with field as title, explanation on given chapter in detail, Code Example(code field in <precode> format) if applicable and make sure to produce the output in formated form, it should look visually appealing'

            try {
                /* Generate Video URL */
                let videoId = ''
                service
                    .getVideos(course?.name + ':' + chapter?.chapter_name)
                    .then((resp) => {
                        videoId = resp[0]?.id?.videoId
                    })

                /* TODO-- > check if videoid is correct or not work */
                while (checkValid(videoId) == false) {
                    service
                        .getVideos(course?.name + ':' + chapter?.chapter_name)
                        .then((resp) => {
                            videoId = resp[0]?.id?.videoId
                        })
                }

                const result = await GenerateCourseLayout_AI.sendMessage(PROMPT)
                /* Response in text format */
                // console.log(result)
                /* TO Convert into Json format --> JSON.parse(result) --> from text to json format */
                // console.log(JSON.parse(result))
                const content = JSON.parse(result)

                /* Need to save the result along with video url in the database */
                await db.insert(Chapters).values({
                    chapterId: index,
                    courseID: course?.courseID,
                    content: content,
                    videoId: videoId,
                })
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error)
            }
            await db.update(CourseList).set({
                publish: true,
            })
            router.replace('/create-course/' + course?.courseID + '/finish')
        })
    }

    return (
        <div className='mt-10 px-7 md:px-20 lg:px-44'>
            <h2 className='font-bold text-center text-2xl'>Course Layout</h2>

            <LoadingDialog loading={loading} />
            {/* Basic Info */}
            <CourseBasicInfo course={course} refreshData={() => GetCourse()} />
            <Button
                onClick={GenerateChapterContent}
                className=' bg-purple-500
                my-10'
            >
                {' '}
                Generate Course Content{' '}
            </Button>

            {/* Course Detail */}
            <CourseDetail course={course} />

            {/* List of Lesson */}
            <ChapterList course={course} refreshData={() => GetCourse()} />
        </div>
    )
}

export default CourseLayout
