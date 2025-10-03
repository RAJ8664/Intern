export const dynamic = 'force-dynamic'
import { UserButton } from '@clerk/nextjs'
import React, { Suspense } from 'react'
import AddCourse from './_components/AddCourse'
import UserCourseList from './_components/UserCourseList'

function Dashboard() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <AddCourse />
            </Suspense>
            {/*Display List of Course*/}
            <UserCourseList />
        </div>
    )
}

export default Dashboard
