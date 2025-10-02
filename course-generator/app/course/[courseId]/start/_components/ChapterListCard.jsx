export const dynamic = 'force-dynamic'
import React from 'react'
import { IoMdClock } from 'react-icons/io'

function ChapterListCard({ chapter, index }) {
    return (
        <div className='grid grid-cols-5 p-3 item-center border-b border-gray-200 hover:bg-gray-50 transition-all duration-200'>
            <div>
                <h2 className='p-1 bg-purple-500 w-8 h-8 text-white rounded-full text-center'>
                    {index + 1}
                </h2>
            </div>
            <div className='col-span-2'>
                <h2 className='font-medium'>{chapter?.chapter_name}</h2>
                <h2 className='flex items-center gap-2 text-sm text-primary'>
                    {' '}
                    <IoMdClock />
                    {chapter?.duration}
                </h2>
            </div>
        </div>
    )
}

export default ChapterListCard
