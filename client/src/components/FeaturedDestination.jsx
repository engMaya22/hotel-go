
import HotelCard from "./HotelCard";
import Title from "./Title";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";

const FeaturedDestination = () => {

  const {navigate , rooms} = useAppContext();
  const [featuredRooms , setFeaturedRooms] = useState([]);
  useEffect(()=>{
    const featuredRooms = rooms.filter((room)=>room.isFeatured);
    setFeaturedRooms(featuredRooms);

  },[rooms])

  return featuredRooms.length > 0 && (
    <div className="px-6 md:px-16 lg:px-24  bg-slate-50 flex flex-col items-center py-20">

      <Title title="Featured Destination" subtitle="Discover our selection of properties around the world, offering luxury and unforgettable experience." />
      <div className="flex items-center justify-center gap-6 mt-20 max-md:flex-wrap">
        {featuredRooms.slice(0, 4).map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
        ))}
      </div>

       <button onClick={()=>{navigate('/rooms');scrollTo(0,0)}} className="px-4 py-2 my-16 text-sm font-medium border rounded border-gray-300 hover:bg-gray-50
                    bg-white cursor-pointer transition-all">
        View All Destination
      </button>
    </div>
  );
};

export default FeaturedDestination;
