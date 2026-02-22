import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const HotelCard = ({ room, index }) => {
  return (
    <Link
      to={"/rooms" + room._id}
      onClick={() => scrollTo(0, 0)}
      key={room._id}
      className="relative max-w-70 rounded-xl w-full overflow-hidden bg-white text-gray-500/900
      shadow-[0px_4px_4px_rgba(0,0,0,0.05)]"
    >
      <img src={room.images[0]} alt="" />
      {index % 2 === 0 && (
        <p className="px-3 py-1 absolute top-3 left-3 bg-white text-xs rounded-full text-gray-800 font-medium">
          Best Seller
        </p>
      )}
      <div className="pt-5 p-7">
        <div className="flex items-center justify-between">
          <p className="font-medium font-playfair text-gray-800 text-xl">
            {room.hotel.name}
          </p>
          <div className="flex items-center gap-1">
            <img src={assets.starIconFilled} alt="star-icon" /> 4.5
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <img src={assets.locationIcon} alt="location-icon" />
          <span>{room.hotel.address}</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p>
            <span className="text-xl text-gray-800">
              {" "}
              ${room.pricePerNight}{" "}
            </span>{" "}
            / night
          </p>
          <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer ">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
