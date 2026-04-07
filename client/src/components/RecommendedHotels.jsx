import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext"
import Title from "./Title";
import HotelCard from "./HotelCard";




const RecommendedHotels = () => {
    const { recentSearchedCities, rooms } = useAppContext();
    const [recommendedRooms, setRecommendedRooms] = useState([]);

    const filterHotels = ()=>{
       
        const filteredRooms = rooms.slice().filter((room) =>
            recentSearchedCities.includes(room.hotel.city));
        setRecommendedRooms(filteredRooms);

    }
    useEffect(() => {
      filterHotels();
      console.log(recentSearchedCities);
        
    }, [rooms , recentSearchedCities])

    return recommendedRooms.length > 0 && (
        <div className="px-6 md:px-16 lg:px-24  bg-slate-50 flex flex-col items-center py-20">

            <Title title="Recommendation Hotels" subtitle="Discover our selection of properties around the world, offering luxury and unforgettable experience." />
            <div className="flex items-center justify-center gap-6 mt-20 max-md:flex-wrap">
                {recommendedRooms.slice(0, 4).map((room, index) => (
                    <HotelCard key={room._id} room={room} index={index} />
                ))}
            </div>

        </div>
    );

}

export default RecommendedHotels
