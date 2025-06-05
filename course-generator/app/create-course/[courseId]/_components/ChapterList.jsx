import React from 'react'
import { Clock, CheckCircle } from "lucide-react"; 

function ChapterList({course}) {
    return (
        <div className='mt-3 '> 
            <h2 className='font-medium text-xl'>Chapters</h2>
            <div className='mt-2'> 
                {course?.courseOutput?.[0]?.chapters.map((chapter, index) => ( 
                    <div className='border p-5 rounded-lg mb-2 flex item-center justify-between '>
                    <div className='flex gap-5 items-center'>
                        <h2 className='bg-purple-600 flex-none h-10 w-10 text-white rounded-full text-center p-2'>{index+1}</h2>
                        <div>
                            <h2 className='font-medium text-lg'>{chapter?.chapter_name}</h2>
                            <p className='text-sm text-gray-500 '>{chapter?.about}</p>
                            <p className='flex gap-2 text-purple-500 items-center'><Clock />{chapter?.duration}</p>
                        </div>
                    </div>
                    <CheckCircle className='text-4xl text-gray-300 flex-none' />
                    </div>
                ))}
            </div>
        </div>

    )
}

export default ChapterList