import { Link, NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";





const Sidebar = () => {

    const sidebarLinks = [
     { name:"Dashboard" ,path:"/owner" , icon:assets.dashboardIcon},
     { name:"Add Room" ,path:"/owner/add-room" , icon:assets.addIcon},
     { name:"List Room" ,path:"/owner/list-room" , icon:assets.listIcon}
    ];
  return (
  <div className="w-16 md:w-64 border-r h-full text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
       {sidebarLinks.map((link , index)=>
           <NavLink key={index} to={link.path} end="/owner" className={({isActive})=> `flex items-center px-3 py-4 md:px-8 gap-3
              ${isActive ? " border-r-4 md:border-r-[60px] bg-blue-600/10 border-blue-600 text-blue-600" : 
                "hover:bg-gray-100/90 border-white text-gray-700"}`
           }> <img src={link.icon} className="min-w-6 min-h-6" alt= {link.name} /> <p className="hidden md:block text-center"> {link.name}</p></NavLink>)}
  </div>
  )
}

export default Sidebar
