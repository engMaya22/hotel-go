

import React, { useState } from 'react'
import { assets, cities } from '../assets/assets'

const HotelRegister = () => {
  
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70'>
      <form action="" className='flex bg-white rounded-xl max-w-4xl max-md:mx-2'>
        <img src={assets.regImage} alt="reg-img" className='w-1/2 rounded-xl hidden md:block' />
        <div className=' relative flex flex-col items-center md:w-1/2 p-8 md:p-10 '>
          <img src={assets.closeIcon} alt="close-icon" onClick={setClose(true)} className='absolute top-4 right-4 h-4 w-4 cursor-pointer' />
          <p className='text-2xl font-semibold mt-6'>
            Register your hotel
          </p>
          {/* hotel name */}
          <div className="mt4 w-full">
            <label htmlFor="name" className='font-medium text-gray-500'>Hotel Name</label>
            <input type="text" id='name' placeholder='Type here' className='w-full border border-gray-200 px-3 py-2.5 mt-1  outline-indigo-500 font-light'
              required />

          </div>

          {/* phone */}
          <div className="mt4 w-full">
            <label htmlFor="phone" className='font-medium text-gray-500'>Phone</label>
            <input type="text" id='phone' placeholder='Type here' className='w-full border border-gray-200 px-3 py-2.5 mt-1  outline-indigo-500 font-light'
              required />

          </div>


          {/* address */}
          <div className="mt4 w-full">
            <label htmlFor="address" className='font-medium text-gray-500'>Address</label>
            <input type="text" id='address' placeholder='Type here' className='w-full border border-gray-200 px-3 py-2.5 mt-1  outline-indigo-500 font-light'
              required />

          </div>

          {/* select city drop down */}
          <div className="mt4 w-full mr-auto max-w-60">
            <label htmlFor="city" className='font-medium text-gray-500'>City</label>
            <select name="" id="city" className='w-full border border-gray-200 rounded px-3 py-2.5 mt-1  outline-indigo-500 font-light' required>
              <option value="">Select City</option>
              {
                cities.map((city, index) =>
                  <option value={city} key={index}>{city}</option>

                )
              }

            </select>

          </div>
          <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white
               mr-auto px-6 py-2 rounded cursor-pointer mt-6">
            Register
          </button>
        </div>
      </form>
    </div>
  )
}

export default HotelRegister
