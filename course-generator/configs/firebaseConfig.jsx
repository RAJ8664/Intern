// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'ai-course-generator-7aeee.firebaseapp.com',
  projectId: 'ai-course-generator-7aeee',
  storageBucket: 'ai-course-generator-7aeee.firebasestorage.app',
  messagingSenderId: '474721505605',
  appId: '1:474721505605:web:55507546dfc29ec054ee2c',
  measurementId: 'G-HYYMJCDLEX',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
