'use client'
export const dynamic = 'force-dynamic'
import Link from 'next/link'

function page() {
    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
            }}
        >
            <h1
                style={{
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    color: '#1e293b',
                }}
            >
                Secure Payment
            </h1>
            <p
                style={{
                    color: '#64748b',
                    marginBottom: '2rem',
                }}
            >
                Complete your purchase safely and quickly.
            </p>
            <Link href='/checkout' passHref>
                <button
                    style={{
                        padding: '1rem 2.5rem',
                        background: 'linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)',
                        color: '#fff',
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        border: 'none',
                        borderRadius: '9999px',
                        boxShadow: '0 4px 14px rgba(59,130,246,0.15)',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                    }}
                    onMouseOver={(e) =>
                    (e.currentTarget.style.background =
                        'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)')
                    }
                    onMouseOut={(e) =>
                    (e.currentTarget.style.background =
                        'linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)')
                    }
                >
                    Pay Here
                </button>
            </Link>
        </div>
    )
}

export default page
