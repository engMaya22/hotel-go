
import React, { useEffect } from 'react'
import Navbar from '../../components/hotelOwner/Navbar'
import Sidebar from '../../components/hotelOwner/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {

  const { user, isOwner , navigate} = useAppContext();

  useEffect(()=>{
    if(!isOwner)
      navigate('/');

  },[user]);
  
  return (
    <div className='flex flex-col h-screen'>
        <Navbar />
       <div className="flex h-full">
         <Sidebar />
         <div className='flex-1 pt-10 p-4 md:px-10 h-full'>
            <Outlet />
         </div>
       </div>
      
    </div>
  )
}

export default Layout
