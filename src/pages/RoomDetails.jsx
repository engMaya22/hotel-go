import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {  assets, roomsDummyData } from "../assets/assets";
import StarRating from "../components/StarRating";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    // 
    const room = roomsDummyData.find(room => room._id === id);
  
    room && setRoom(room) ;
    room &&setMainImage(room.images[0]);
  }, [id]);

  return room &&  (<div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">

    <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
        <h1 className="text-xl md:text-4xl font-playfair">
             {room.hotel.name}
            <span className="font-inter text-sm">({room.roomType})</span>
        </h1>
        <p className="font-xs font-inter py-1.5 px-3 bg-orange-500 rounded-full">20% OFF</p>
    </div>

    <div className="flex  gap-1 items-center mt-2">

      <StarRating />
       <p className="ml-2"> 200+ reviews</p>


    </div>
    {/* address */}
    <div className="flex items-center mt-2 gap-1 text-gray-500">
        <img src={assets.locationIcon} alt="location-icon" />
        <span> {room.hotel.address}</span>
    </div>

    {/* room images */}
    <div className="flex flex-col lg:flex-row mt-6 gap-6">
       <div className="w-full md:w-1/2">
          <img src={mainImage} alt=" room image" className="rounded-xl w-full shadow-lg object-cover" />
       </div>
       <div className="grid grid-cols-2 gap-4 w-full md:w-1/2">
        {room?.images.length > 1 && room.images.map((image , index)=>(
          <img onClick={()=>setMainImage(image)} src={image} key={index}  alt=" room image" 
              className={`cursor-pointer w-full rounded-xl object-cover shadow-md ${mainImage == image && "outline-3 outline-orange-500"}`}       />

        ))}
       </div>
    </div>

  </div>);
};

export default RoomDetails;
