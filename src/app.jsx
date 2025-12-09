import React from 'react'
import "./index.css"
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Hero from './components/Hero'
import Home from './components/pages/Home'
import Footer from './components/Footer'
import AllRooms from './components/pages/AllRooms'

export const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");


  return (
    <div className=''>
     { !isOwnerPath && <Navbar />}

     <div className='min-h-[70vh]'>
       <Routes >
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<AllRooms/>} />
       </Routes>
     </div>
     <Footer />


    </div>
  )
}


