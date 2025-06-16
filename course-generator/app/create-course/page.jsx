'use client'
import React from 'react'
import { HiMiniSquare3Stack3D, HiLightBulb } from 'react-icons/hi2'
import { HiClipboardDocumentCheck } from 'react-icons/hi2'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import SelectCategory from './_components/SelectCategory'
import TopicDescription from './_components/TopicDescription'
import SelectOption from './_components/SelectOption'
import { UserInputContext } from '../_context/UserInputContext'
import { useContext, useEffect } from 'react'
import LoadingDialog from './_components/LoadingDialog'
import { GenerateCourseLayout_AI } from '../../configs/AiModel'
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { v4 as uuid4 } from 'uuid'
import { db } from '@/configs/db'
import { useRouter } from 'next/navigation'

function CreateCourse() {
  const StepperOptions = [
    {
      id: 1,
      name: 'Category',
      icon: <HiMiniSquare3Stack3D />,
    },
    {
      id: 2,
      name: 'Topic & Desc',
      icon: <HiLightBulb />,
    },
    {
      id: 3,
      name: 'Options',
      icon: <HiClipboardDocumentCheck />,
    },
  ]

  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext)
  const [loading, setLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    console.log(userCourseInput)
  }, [userCourseInput])

  const checkStatus = () => {
    if (userCourseInput?.length == 0) {
      return true
    }
    if (
      activeIndex == 0 &&
      (userCourseInput?.category?.length == 0 ||
        userCourseInput?.category == undefined)
    ) {
      return true
    }
    if (
      activeIndex == 1 &&
      (userCourseInput?.topic?.length == 0 ||
        userCourseInput?.topic == undefined)
    ) {
      return true
    } else if (
      activeIndex == 2 &&
      (userCourseInput?.level == undefined ||
        userCourseInput?.duration == undefined ||
        userCourseInput?.video == undefined ||
        userCourseInput?.noOfchapters == undefined)
    ) {
      return true
    }
    return false
  }

  /* Ollama to generate the content */
  const Ollama_Generate = async (prompt) => {
    try {
      const response = await fetch('/api/ollama', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: prompt }),
      })
      if (!response.ok) {
        throw new Error('Failed to get response from Ollama API')
      }
      const data = await response.json()
      return data.message
    } catch (error) {
      console.error('Client callOllama error:', error)
      return 'Sorry, there was a problem getting a response.'
    }
  }

  const GenerateCourseLayout = async () => {
    setLoading(true)
    const BASIC_PROMPT =
      'Generate a course tutorial on following detail with field as course name, description, along with chapter name, about, duration :'
    const USER_INPUT_PROMPT =
      ' Category:' +
      userCourseInput?.category +
      ',Topic:' +
      userCourseInput?.topic +
      ',Level:' +
      userCourseInput?.level +
      ',Duration:' +
      userCourseInput?.duration +
      ', include video:' +
      userCourseInput?.video +
      ',No Of Chapters:' +
      userCourseInput?.noOfchapters +
      ',in JSON format and remember in response mention the response in small letters , like category, topic, level, duration, no_of_chapters, video in json format '
    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT

    /* Prompt that AI will receive */
    console.log(FINAL_PROMPT)

    /* Using Gemini Api */
    const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT)

    /* Using Ollama */
    // const result = await Ollama_Generate(FINAL_PROMPT)

    /* Response in text format */
    console.log(result)

    /* TO Convert into Json format --> JSON.parse(result) --> from text to json format */
    console.log(JSON.parse(result))
    setLoading(false)
    SaveCourselayoutInDb(JSON.parse(result))
  }

  const SaveCourselayoutInDb = async (courseLayout) => {
    var id = uuid4()
    setLoading(true)
    const result = await db.insert(CourseList).values({
      courseID: id,
      name: userCourseInput?.topic,
      level: userCourseInput?.level,
      includeVideo: userCourseInput?.video,
      category: userCourseInput?.category,
      courseOutput: courseLayout,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      userProfileImage: user?.imageUrl,
    })

    console.log('finish')
    setLoading(false)
    router.push('/create-course/' + id)
  }

  return (
    <div>
      {/* Stepper*/}
      <div className='flex flex-col justify-center items-center mt-10'>
        <h2 className='text-4xl  text-purple-500 font-medium'>
          {' '}
          Create Course{' '}
        </h2>
        <div className='flex mt-10'>
          {StepperOptions.map((item, index) => (
            <div className='flex items-center' key={item.id}>
              <div className='flex flex-col items-center w-[50px] md:w-[100px]'>
                <div
                  className={`bg-gray-200 p-3 rounded-full text-white ${activeIndex >= index && 'bg-purple-500'}`}
                >
                  {item.icon}
                </div>
                <h2 className='hidden md:block md:text-sm'> {item.name} </h2>
              </div>
              {index != StepperOptions?.length - 1 && (
                <div
                  className={`h-1 w-[50px] md:w-[100px] round-full lg:w-[170px] bg-gray-300 ${activeIndex - 1 >= index && 'bg-purple-500'}`}
                >
                  {' '}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className='px-10 md:px-20 lg:px-44 mt-10'>
        {/* Component */}
        {activeIndex == 0 ? (
          <SelectCategory />
        ) : activeIndex == 1 ? (
          <TopicDescription />
        ) : (
          <SelectOption />
        )}

        {/*Next Previous Button */}
        <div className='flex justify-center gap-4 mt-10'>
          <Button
            disabled={activeIndex === 0}
            variant='outline'
            onClick={() => setActiveIndex(activeIndex - 1)}
            className='bg-blue-600 however:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition flex items-center gap-2'
          >
            Previous
          </Button>
          {activeIndex < 2 && (
            <Button
              disabled={checkStatus()}
              onClick={() => setActiveIndex(activeIndex + 1)}
              className='bg-blue-600 however:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition flex items-center gap-2'
            >
              Next
            </Button>
          )}
          {activeIndex == 2 && (
            <Button
              disabled={checkStatus()}
              onClick={() => GenerateCourseLayout()}
              className='bg-blue-600 however:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition flex items-center gap-2'
            >
              Generate Course
            </Button>
          )}
        </div>
      </div>
      <LoadingDialog loading={loading} />
    </div>
  )
}

export default CreateCourse
