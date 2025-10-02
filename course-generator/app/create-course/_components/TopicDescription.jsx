export const dynamic = 'force-dynamic'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FcIdea } from 'react-icons/fc'
import { FcBookmark } from 'react-icons/fc'
import { UserInputContext } from '@/app/_context/UserInputContext'
import { useContext } from 'react'

function TopicDescription() {
    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext)

    const handleInputChange = (fieldName, value) => {
        setUserCourseInput((prev) => ({
            ...prev,
            [fieldName]: value,
        }))
    }

    return (
        <div className='mx-20 lg:mx-44'>
            {/* Input Topic */}
            <div className='mt-5'>
                <div className='flex items-center gap-2'>
                    <FcIdea />
                    <span>
                        Write the topic for which you want to generate the course (e.g.,
                        React, python Course, Cryptocurrency, Git and Github, etc.):
                    </span>
                </div>
                <Input
                    placeholder='Topic'
                    className='mt-2'
                    defaultValue={userCourseInput?.topic}
                    onChange={(e) => handleInputChange('topic', e.target.value)}
                />
            </div>

            {/* Text Area Description */}
            <div className='mt-5'>
                <div className='flex items-center gap-2'>
                    <FcBookmark />
                    <span>
                        Tell us more about your course, what you want to include in the
                        course (Optional)
                    </span>
                </div>
                <Textarea
                    placeholder='About your course'
                    className='mt-2'
                    defaultValue={userCourseInput?.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                />
            </div>
        </div>
    )
}

export default TopicDescription
