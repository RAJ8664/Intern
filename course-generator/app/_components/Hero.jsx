import React from 'react'
import { Button } from '@/components/ui/button'

function hero() {
  return (
    <section className='bg-white lg:grid  lg:place-content-center dark:bg-gray-900'>
      <div className='mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32'>
        <div className='mx-auto max-w-prose text-center'>
          <h1 className='text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white'>
            AI Course Generator
            <strong className='text-purple-600'>
              {' '}
              Custome Learning Path Powered by AI{' '}
            </strong>
          </h1>
          <p className='mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed dark:text-gray-200'>
            Unlock personalized education with Al-driven course creation. Tailor
            your learning journey to fit your unique goals and pace
          </p>
          <div className='mt-4 flex justify-center gap-4 sm:mt-6'>
            <a
              className='inline-block rounded border border-purple-600 bg-purple-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700'
              href='/dashboard'
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default hero
