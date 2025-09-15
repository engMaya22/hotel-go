import React from 'react'
import "./index.css"
import Navbar from './components/Navbar'
import { useLocation } from 'react-router-dom'

export const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");


  return (
    <div className=''>
     { !isOwnerPath && <Navbar />}
    </div>
  )
}


