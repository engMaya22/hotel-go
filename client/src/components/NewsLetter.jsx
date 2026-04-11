import React, { useState } from 'react'
import { assets } from '../assets/assets'
import Title from './Title'
import toast from 'react-hot-toast'

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const handleSubscribe = () => {
    if (!email) {
      setError('Email is required');
      return;
    }

    // simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setError('');
    toast.success('Success!');
    setEmail('');
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl lg:w-full rounded-2xl px-4 py-12 md:py-16 mx-2 lg:mx-auto my-30 bg-gray-900 text-white">
      <Title title='Stay Inspired' subtitle='Join our newsletter and be the first to discover new destinations,exclusive offers, and travel inspiration.' />
      <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-4 mt-6">
        <div className="flex flex-col w-full max-w-66">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 px-4 py-2.5 border border-white/20 rounded outline-none w-full"
            placeholder="Enter your email"
          />

          {error && (
            <p className="text-red-400 text-xs mt-1 pl-1">
              {error}
            </p>
          )}
        </div>
        <button onClick={handleSubscribe} className="flex items-center justify-center gap-2 group bg-black px-4 md:px-7 py-2.5 rounded active:scale-95 transition-all">Subscribe
          <img src={assets.arrowIcon} alt='arrow-icon' className='w-3.5 invert group-hover:translate-x-1 transition-all' />
        </button>

      </div>

      <p className="text-gray-500 mt-6 text-xs text-center">By subscribing, you agree to our Privacy Policy and consent to receive updates.</p>
    </div>
  )
}

export default NewsLetter
