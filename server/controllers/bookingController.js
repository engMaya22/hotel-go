


//function to check  availability of  room 

import Book from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
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
      //  const {roomId} = req.body;
      //  const roomData = await Room.find(roomId);
        const {room , checkInDate , checkOutDate} = req.body;
        
        isAvailable =  await checkAvailability({checkInDate , checkOutDate, room})
        return res.json({success:true ,  isAvailable})

        
    } catch (error) {
        res.json({success:false , message: error.message})
    }

}


//API to create a new booking

export const createBooking = async(req,res)=>{
    try {
        const {room , checkInDate , checkOutDate, guests} = req.body;
        const user = req.user._id;
        const isAvailable = await checkAvailability(room , checkInDate , checkOutDate);
     
        if(!isAvailable)
             return res.json({success:false , message: 'Room is not available'});

        const roomData = await Room.findById(room).populate('hotel');
        //calc total price base on price per night of room 
        let totalPrice = roomData.pricePerNight;
        const checkIn = new Date(roomData.checkInDate);
        const checkOut = new Date(roomData.checkOutDate);
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights  = Math.ceil(timeDiff / (1000*3600*24));
        totalPrice  *= nights;



        //const hotel = await Hotel.find({room});

        const booking = await Book.create({
            room ,
            hotel:roomData.hotel._id ,//from populate
            totalPrice ,
            checkInDate ,
            checkOutDate,
            guests: +guests,
            user})
            return res.json({success:true , message: 'Booking created'});


            
        
    } catch (error) {
          console.log(error);
          res.json({success:false , message: error.message})
    }
}


//API to get all bookings for a user
//get /bookings/user
export const getUserBookings = async(req,res)=>{
    try {
        const user = req.user._id;
        const bookings = await Book.find({user}).populate('hotel room').sort({createdAt : -1});
        res.json({success:true , bookings});
        
    } catch (error) {
          console.log(error);
          res.json({success:false , message: error.message})
    }
}


//get booking of hotel auth owner
export const getHotelBookings = async(req, res)=>{
   try {
      const hotel = await Hotel.findOne({owner:req.auth.userId});
      if(!hotel){
        res.json({success:false , message: 'Not hotel found'})

      }
      const bookings = await Book.find({hotel:hotel._id}).populate('hotel room user').sort({createdAt : -1});

      const totalBookings = bookings.length;
      //total revenue
      const totalRevenue = bookings.reduce((acc , booking)=>
        acc + booking.totalPrice,0

      );
      res.json({success:true ,dashboardData:{bookings , totalRevenue,totalBookings}});

   } catch (error) {
          console.log(error);
          res.json({success:false , message: "Failed to fetch bookings"})
    
   }
}