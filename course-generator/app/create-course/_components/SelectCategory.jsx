import React from 'react'
import CategoryList from '@/app/_shared/CategoryList'
import { UserInputContext } from '@/app/_context/UserInputContext'
import { useContext } from 'react'

function SelectCategory() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext)

  const handleCategoryChange = (category) => {
    setUserCourseInput((prev) => ({
      ...prev,
      category: category,
    }))
  }

  return (
    <div className='px-10 md:px-20'>
      <h2 className='my-5 text-center text-xl font-medium'>
        {' '}
        Select the Course Category{' '}
      </h2>
      <div className='grid grid-cols-3 gap-10 px-10 md:px-20'>
        {CategoryList.map((item, index) => (
          <div
            key={item.name}
            className={`flex flex-col p-5 border items-center rounded-xl hover:border-purple-400 hover:bg-purple-200 cursor-pointer ${
              userCourseInput?.category == item.name &&
              'border-purple-200 bg-purple-200'
            }`}
            onClick={() => handleCategoryChange(item.name)}
          >
            <img src={item.icon} width={150} height={50} />
            <h2 className='text-red-500 font-semibold'> {item.name} </h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectCategory
