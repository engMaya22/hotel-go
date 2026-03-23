import React, { useMemo, useState } from "react";
import { assets, facilityIcons, roomsDummyData } from "../assets/assets";
import { useNavigate, useSearchParams } from "react-router-dom";
import StarRating from "../components/StarRating";
import { useAppContext } from "../context/AppContext";

const CheckBox = ({ label, selected = false, onChange = () => { } }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

const RadioButton = ({ label, selected = false, onChange = () => { } }) => {

  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="radio"
        name="sortOption"
        checked={selected}
        onChange={(e) => onChange(label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};
const AllRooms = () => {
  const [searchParams, setSearchParams ] = useSearchParams();
  const { navigate, rooms, currency } = useAppContext();
 
  const [openFilters, setOpenFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    roomType: [],
    priceRanges: [],

  });
  const [selectedSort, setSelectedSort] = useState('');



  const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];
  const priceRanges = [
    "0 to 500",
    "500 to 1000",
    "1000 to 2000",
    "2000 to 3000",
  ];
  const sortOptions = [
    "Price Low to High",
    "Price Hight to Low",
    "Newest First",
  ];

  //handle changes for filters and sorting
  const handleFilterChange = (checked, value, type) => {
    setSelectedFilters((previousFilters) => {
      const updatedFilters = { ...previousFilters };
      if (checked)//If checked → ADD
       // updatedFilters[type].push(value); this make mutate state React prefers immutable updates because it can track changes efficiently.
        updatedFilters[type] = [...updatedFilters[type], value];
      else
        updatedFilters[type] = updatedFilters[type].filter(item => item !== value);//If unchecked → REMOVE

      return updatedFilters;


    })

  }

  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
  }

  //check if a room matches the selected room types
  const matchRoomType = (room) => {
    return selectedFilters.roomType.length === 0 // if no filter → show all
    || selectedFilters.roomType.includes(room.roomType)

  }

  //check if a room matches the selected room price range
  const matchPriceRange = (room) => {
    return selectedFilters.priceRanges.length === 0 || selectedFilters.priceRanges.some((range) => {
      const [min, max] = range.split(' to ').map(Number);
      return room.pricePerNight >= min && room.pricePerNight <= max
    })
  }


  //function to sort rooms based on selected sort options
  const sortRooms = (a, b) => {
    if (selectedSort === 'Price Low to High')
      return a.pricePerNight - b.pricePerNight; //Standard JS sort function

    if (selectedSort === 'Price Hight to Low')
      return b.pricePerNight - a.pricePerNight;

    if (selectedSort === 'Newest First')
      return new Date(b.createdAt) - new Date(a.createdAt);

    return 0;
  }

  //filter destination
  const filterDestination = (room) => {
    const destination = searchParams.get('destination');
    if (!destination) return true;
    return room.hotel.city.toLowerCase().includes(destination.toLowerCase());

  }

  //filter and sort rooms  based on selected filters and sort options
  const filteredRooms = useMemo(() => {//filtering runs on EVERY render // calculate value so use memo ,, if it is get data api then we use useEffect
    return rooms.filter((room) => matchRoomType(room) && matchPriceRange(room) && filterDestination(room)).sort(sortRooms);

  }, [rooms, selectedFilters, selectedSort, searchParams]);

  //clear all filters 
  const clearAllFilters = () => {
    setSelectedFilters({
      roomType: [],
      priceRanges: [],

    });
    setSelectedSort('');
    setSearchParams({})
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row items-start  justify-between  pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32">
      <div>
        <div className="text-left flex flex-col items-start">
          <h1 className="font-playfair text-4xl md:text-[40px">Hotel Rooms</h1>
          <p className="text-sm  md:text-base text-gray-500/900 mt-2">
            Take advantages of limited-time offers and special packages to
            enhance your stay and create unforgettable memories.{" "}
          </p>
        </div>
        {filteredRooms.map((room) => (
          
          <div
            key={room._id}
            className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30  last:border-0"
          >
            <img
              onClick={() => {
                navigate(`/rooms/${room._id}`);
                scrollTo(0, 0);
              }}
              src={room.images[0]}
              alt="hotel-img"
              title="View Room Details"
              className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
            />
            <div className="flex flex-col gap-2 md:w-1/2">
              <p className="text-gray-500">{room.hotel.city}</p>
              <p
                className="text-gray-800 cursor-pointer  font-playfair text-3xl"
                onClick={() => {
                  navigate(`rooms/${room._id}`);
                  scrollTo(0, 0);
                }}
              >
                {room.hotel.name}
              </p>
              <div className="flex items-center">
                <StarRating />
                <p className="ml-2">200+ reviews</p>
              </div>
              <div className="flex gap-1 items-center text-sm mt-2 text-gray-500">
                <img src={assets.locationIcon} alt="location-icon" />
                <span>{room.hotel.address}</span>
              </div>
              <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                {room.amenities.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70 "
                  >
                    <img
                      src={facilityIcons[item]}
                      alt={item}
                      className="w-5 h-5"
                     // onClick={console.log(facilityIcons[item])}
                    />
                    <p className="text-xs">{item}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-700 text-xl font-medium">
                {currency}{room.pricePerNight} /night
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* filters */}

      <div className="bg-white w-80 border border-gray-300  text-gray-600 max-lg:mb-8 min-lg:mt-16">
        <div
          className={`flex items-center justify-between px-5 py-2.5 min-lg:border-b border-gray-300  ${openFilters && "border-b"
            }`}
        >
          <p className="text-gray-800 font-medium text-base">FILTERS</p>
          <div className="cursor-pointer text-xs">
            <span
              className="lg:hidden"
              onClick={() => setOpenFilters(!openFilters)}
            >
              {openFilters ? "HIDE" : "SHOW"}
            </span>
            <span className="hidden lg:block" onClick={clearAllFilters}>CLEAR</span>
          </div>
        </div>

        <div
          className={`${openFilters ? "h-auto" : "h-0 lg:h-auto"
            } overflow-hidden transition-all duration-700`}
        >
          <div className="px-5 pt-5">
            <p className="pb-2 text-gray-800 font-medium">Popular filters</p>
            {roomTypes.map((room, index) => (
              <CheckBox key={index} label={room} selected={selectedFilters.roomType.includes(room)} onChange={(checked)=>handleFilterChange(checked ,room,'roomType')}/>
            ))}
          </div>
          <div className="px-5 pt-5">
            <p className="pb-2 text-gray-800 font-medium">Price Range</p>
            {priceRanges.map((range, index) => (
              <CheckBox key={index} label={`${currency} ${range}`} selected={selectedFilters.priceRanges.includes(range)}  onChange={(checked)=>handleFilterChange(checked ,range,'priceRanges')}/>
            ))}
          </div>
          <div className="px-5 pt-5 pb-7">
            <p className="pb-2 text-gray-800 font-medium">Sort By</p>
            {sortOptions.map((option, index) => (
              <RadioButton key={index} label={option} selected ={selectedSort === option}  onChange={()=>handleSortChange(option)}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
