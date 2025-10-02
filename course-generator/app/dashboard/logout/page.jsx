export const dynamic = 'force-dynamic'
    ; ('use client')
import { useClerk } from '@clerk/nextjs'
function Page() {
    const { signOut } = useClerk()

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-200'>
            <div className='bg-white p-8 rounded-2xl shadow-xl text-center'>
                <h1 className='text-2xl font-semibold text-gray-800 mb-4'>
                    Ready to sign out?
                </h1>
                <p className='text-gray-600 mb-6'>
                    Click the button below to log out of your account.
                </p>
                <button
                    onClick={() => signOut({ redirectUrl: '/' })}
                    className='px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow transition duration-300'
                >
                    Sign out
                </button>
            </div>
        </div>
    )
}

export default Page
