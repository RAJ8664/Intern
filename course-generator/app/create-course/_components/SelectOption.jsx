import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { FaStar, FaClock, FaVideo } from 'react-icons/fa'
import { FcReading } from 'react-icons/fc'
import { UserInputContext } from '@/app/_context/UserInputContext'
import { useContext } from 'react'

function SelectOption() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext)

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }))
  }

  return (
    <div className='flex justify-center items-center py-8'>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-row gap-12 justify-center'>
          <div className='flex flex-col items-center'>
            <label className='text-sm mb-2 flex items-center gap-1'>
              <FaStar className='text-yellow-500' />
              Difficulty Level
            </label>
            <Select
              onValueChange={(value) => handleInputChange('level', value)}
              defaultValue={userCourseInput?.level}
            >
              <SelectTrigger className='w-56 h-12 text-base'>
                <SelectValue placeholder='Select' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Beginner'>Beginner</SelectItem>
                <SelectItem value='Intermediate'>Intermediate</SelectItem>
                <SelectItem value='Advanced'>Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-col items-center'>
            <label className='text-sm mb-2 flex items-center gap-1'>
              <FaClock className='text-blue-500' />
              Course Duration
            </label>
            <Select
              onValueChange={(value) => handleInputChange('duration', value)}
              defaultValue={userCourseInput?.duration}
            >
              <SelectTrigger className='w-56 h-12 text-base'>
                <SelectValue placeholder='Select' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='1 Hour'>1 Hour</SelectItem>
                <SelectItem value='2 Hours'>2 Hours</SelectItem>
                <SelectItem value='More than 3 Hours'>
                  More than 3 Hours
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='flex flex-row gap-12 justify-center'>
          <div className='flex flex-col items-center'>
            <label className='text-sm mb-2 flex items-center gap-1'>
              <FaVideo className='text-red-500' />
              Add Video
            </label>
            <Select
              onValueChange={(value) => handleInputChange('video', value)}
              defaultValue={userCourseInput?.video}
            >
              <SelectTrigger className='w-56 h-12 text-base'>
                <SelectValue placeholder='Select' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Yes'>Yes</SelectItem>
                <SelectItem value='No'>No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* TODO*/}
          <div className='flex flex-col items-center'>
            <label className='text-sm mb-2 flex items-center gap-1'>
              <FcReading />
              Number of Chapters
            </label>
            <Input
              type='number'
              className='w-56 h-9 text-base'
              onChange={(e) =>
                handleInputChange('noOfchapters', e.target.value)
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectOption
