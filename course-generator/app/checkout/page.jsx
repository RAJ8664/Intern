'use client'

export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Checkout() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const val = 50

    const loadRazorpay = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => resolve(true)
            script.onerror = () => resolve(false)
            document.body.appendChild(script)
        })
    }

    const handlePayment = async () => {
        setLoading(true)
        const res = await loadRazorpay(
            'https://checkout.razorpay.com/v1/checkout.js',
        )
        if (!res) {
            alert('Razorpay SDK failed to load.')
            return
        }

        const handlePayment = async () => {
            const res = await fetch('/api/razorpay', {
                method: 'POST',
            })

            const data = await res.json()
            console.log('Order:', data)
        }

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            name: 'Team NVNR',
            description: 'Test Transaction',
            // order_id: 'order_rcptid_11',
            handler: (response) => {
                alert('Payment successful!')
                console.log(response)
                router.push(`/dashboard?val=${val}`)
            },
            theme: {
                color: '#3399cc',
            },
        }

        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
        setLoading(false)
    }

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                fontFamily: 'Inter, sans-serif',
            }}
        >
            <div
                style={{
                    background: '#fff',
                    padding: 48,
                    borderRadius: 20,
                    boxShadow: '0 8px 32px rgba(60,60,120,0.15)',
                    minWidth: 340,
                    textAlign: 'center',
                }}
            >
                <h1
                    style={{
                        marginBottom: 32,
                        fontWeight: 700,
                        fontSize: 28,
                        color: '#2d3748',
                    }}
                >
                    Razorpay Payment Page
                </h1>
                <button
                    onClick={handlePayment}
                    disabled={loading}
                    style={{
                        padding: '16px 48px',
                        fontSize: 20,
                        fontWeight: 600,
                        borderRadius: 12,
                        border: 'none',
                        background: loading
                            ? 'linear-gradient(90deg, #b2bec3 0%, #636e72 100%)'
                            : 'linear-gradient(90deg, #38b2ac 0%, #4299e1 100%)',
                        color: '#fff',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        boxShadow: '0 4px 16px rgba(56,178,172,0.15)',
                        transition: 'background 0.2s, transform 0.2s',
                        outline: 'none',
                        transform: loading ? 'scale(1)' : 'scale(1.03)',
                    }}
                >
                    {loading ? 'Processing...' : 'Pay ₹500'}
                </button>
            </div>
        </div>
    )
}
