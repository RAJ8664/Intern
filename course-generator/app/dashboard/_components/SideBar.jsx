'use client'
import React from 'react'
import { Home, Search, Crown, LogOut } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { UserCourseListContext } from '@/app/_context/UserCourseListContext'
import { useContext } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

function SideBar() {
  const { user } = useUser()
  let myEmail = user?.primaryEmailAddress?.emailAddress
  let val = 5
  let count = 0
  const [isCollege, setisCollege] = useState(false)

  if (true && count <= 1) count++
  if (
    typeof myEmail === 'string' &&
    myEmail.endsWith('nits.ac.in') &&
    isCollege == false &&
    count <= 1
  ) {
    setisCollege(true)
    count++
  }
  if (isCollege == true) val = 50

  const router = useRouter()

  const { userCourseList, setUserCourseList } = useContext(
    UserCourseListContext,
  )
  const Menu = [
    {
      id: 1,
      name: 'Home',
      icon: <Home size={20} />,
      path: '/dashboard',
    },
    {
      id: 2,
      name: 'Explore',
      icon: <Search size={20} />,
      path: '/dashboard/explore',
    },
    {
      id: 3,
      name: 'Upgrade',
      icon: <Crown size={20} />,
      path: '/dashboard/upgrade',
    },
    {
      id: 4,
      name: 'Logout',
      icon: <LogOut size={20} />,
      path: '/dashboard/logout',
    },
  ]
  const path = usePathname()
  return (
    <div className='fixed h-full md:w-64 bg-white border-r border-gray-200 shadow-sm'>
      <div className='p-6 border-b border-gray-100'>
        <div className='flex items-center gap-2'>
          <img
            src='/logo.png'
            onClick={() => router.push('/')}
            width={50}
            height={50}
            alt='Logo'
          />
          <hr className='my-5' />
          <div>
            <h1 className='text-xl font-bold text-white'>TEAM NVNR</h1>
            <p className='text-xs text-gray-500'>AI Course Generator</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className='p-4'>
        <ul className='space-y-2'>
          {Menu.map((item) => {
            const isActive = path === item.path
            return (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:shadow-sm ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 shadow-sm'
                      : 'text-gray-600 hover:text-purple-700'
                  }`}
                >
                  <div
                    className={`transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? 'text-purple-600' : ''
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span className='font-medium'>{item.name}</span>
                  {item.id === 3 && (
                    <span className='ml-auto bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-2 py-1 rounded-full'>
                      Pro
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className='absolute bottom-4 left-4 right-4'>
        <Progress
          value={(userCourseList?.length / 15) * 100}
          className='mb-2'
        />
        <h2 className='text-xs text-gray-600 mb-3'>
          {userCourseList?.length} Out of {val} Course created
        </h2>
        <div className='bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-3 text-white'>
          <div className='flex items-center justify-between mb-2'>
            <div className='flex items-center gap-1'>
              <Crown size={14} />
              <span className='font-medium text-xs'>Upgrade Pro</span>
              <Link
                href='/dashboard/upgrade'
                className='bg-white text-purple-600 text-xs font-medium px-4 py-1 rounded-md hover:bg-gray-50 transition-colors'
              >
                {''}
                Get Pro
              </Link>
            </div>
          </div>
          <p className='text-xs opacity-80'>Unlimited courses & AI features</p>
        </div>
      </div>
    </div>
  )
}

export default SideBar
