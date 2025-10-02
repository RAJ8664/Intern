'use client'

export const dynamic = 'force-dynamic'
import React from 'react'
import Header from '../dashboard/_components/Header'
import { UserInputContext } from '../_context/UserInputContext'
import { useState } from 'react'

function CreateCourseLayout({ children }) {
    const [userCourseInput, setUserCourseInput] = useState([])
    return (
        <div>
            <UserInputContext.Provider
                value={{ userCourseInput, setUserCourseInput }}
            >
                <>
                    <Header />
                    {children}
                </>
            </UserInputContext.Provider>
        </div>
    )
}

export default CreateCourseLayout
