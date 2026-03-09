


//function to check  availability of  room 

import Book from "../models/Booking.js";
import Room from "../models/Room.js";

const checkAvailability = async({checkInDate , checkOutDate , room})=>{
   try {
 
    const bookings =  await Book.find({
        room , 
        checkInDate : {$lte:checkOutDate} ,
        checkOutDate: {$gte : checkInDate} });
        const isAvailable = bookings.length === 0;
        return isAvailable;
    
   } catch (error) {
       console.log(error.message);
    
   }

}

//Api to check availability of room

export const checkAvailabilityAPI = async(req , res)=>{

    try {
        const {roomId} = req.body;
      //  const roomData = await Room.find(roomId);
        const {room , checkInDate , checkOutDate} = req.body;
        
        isAvailable =  await checkAvailability({checkInDate , checkOutDate, room})
        return res.json({success:true ,  isAvailable})

        
    } catch (error) {
        res.json({success:false , message: error.message})
    }

}

