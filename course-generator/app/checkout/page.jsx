'use client'
import { useState } from 'react'

export default function Checkout() {
  const [loading, setLoading] = useState(false)

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

    console.log('first')

    const handlePayment = async () => {
      const res = await fetch('/api/razorpay', {
        method: 'POST',
      })

      const data = await res.json()
      console.log('Order:', data)
    }

    console.log('second')

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      name: 'Team NVNR',
      description: 'Test Transaction',
      // order_id: 'order_rcptid_11',
      handler: (response) => {
        alert('Payment successful!')
        console.log(response)
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
    <div style={{ padding: 40 }}>
      <h1>Razorpay Payment Page</h1>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Pay ₹500'}
      </button>
    </div>
  )
}
