import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12'>
      <div className='relative py-3 sm:max-w-xl sm:mx-auto'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
        <div className='relative bg-white shadow-lg sm:rounded-3xl p-8'>
          <div className='md:grid md:grid-cols-2 md:gap-6'>
            <div className='md:col-span-1'>
              <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
                Welcome Back!
              </h2>
              <p className='text-md text-gray-600 mb-4'>
                Create your account to continue your learning journey.
              </p>
              <div className='bg-blue-50 rounded-lg p-4'>
                <p className='text-sm text-gray-500 italic'>
                  <img
                    src='/course_image.jpg'
                    alt='course_image'
                    className='w-full h-full'
                  />
                </p>
              </div>
            </div>
            <div className='mt-5 md:mt-0 md:col-span-1'>
              <SignUp
                appearance={{
                  elements: {
                    formButtonPrimary:
                      'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
