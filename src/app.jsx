import React from 'react'
import "./index.css"
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Hero from './components/Hero'
import Home from './components/pages/Home'
import Hotels from './components/pages/Hotels'

export const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");


  return (
    <div className=''>
     { !isOwnerPath && <Navbar />}

     <div className='min-h-[70vh]'>
       <Routes >
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<Hotels />} />
       </Routes>
     </div>


    </div>
  )
}


