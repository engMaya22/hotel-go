import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL //Since your React project likely uses Vite, environment variables are accessed using:
import { useNavigate } from "react-router-dom";
import { useAuth , useUser } from "@clerk/clerk-react";
import {toast} from "react-hot-toast"

const AppContext = createContext();
export const AppProvider = ({children})=>{

    const currency = import.meta.env.VITE_CURRENCY || "$";//we need to use it in multi pages
    const navigate =useNavigate();

    const {user} = useUser();
    const {getToken} = useAuth();

    const [isOwner , setIsOwner] = useState(false);
    const [showHotelReg , setShowHotelReg] = useState(false);
    const [recentSearchedCities , setRecentSearchedCities] = useState([]);



    const fetchUser = async()=>{
        try {
           const {data} =  await axios.get('/api/user',{headers:{Authorization:`Bearer ${ await getToken()}`}});
           if(data.success){
              setIsOwner(data.role === 'hotelOwner');
              setRecentSearchedCities(data.recentSearchedCities)
             
           }else{
            setTimeout(()=>{
                fetchUser();
            }, 5000)//retry to fetch data after 5 sec
           }
            
        } catch (error) {

            toast.error(error.message)
        }
    }
    // useEffect(()=>{},[])

    useEffect(()=>{
        if(user){
            fetchUser();
        }
     },[user])
    const value = {//this value attributes accessed by any component in app 
         currency , navigate , user , getToken , isOwner ,setIsOwner , showHotelReg , setShowHotelReg ,axios , recentSearchedCities
    }

    return (
        <AppContext.Provider value={value}>
            {children}

        </AppContext.Provider>
    )

}

export const  useAppContext = ()=>useContext(AppContext)