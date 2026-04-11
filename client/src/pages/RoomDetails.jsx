import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, facilityIcons, roomCommonData } from "../assets/assets";
import StarRating from "../components/StarRating";
import { useUser } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import ConfirmModal from "../components/ConfirmModal";
import { useRoomBooking } from "../hooks/useRoomBooking";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { user } = useUser();
  const { navigate, rooms, axios, getToken } = useAppContext();
  const { isAvailable, checkAvailability, bookRoom } = useRoomBooking({
    axios,
    getToken,
    roomId: id,
    navigate,
    toast,


  });

  // Check availability




  // Form submit: either check availability or open modal
  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (!isAvailable) {
      await checkAvailability(checkInDate,
        checkOutDate);
    } else {
      setIsConfirmOpen(true);
    }
  };

  useEffect(() => {
    const room = rooms.find((room) => room._id === id);
    if (room) {
      setRoom(room);
      setMainImage(room.images[0]);
    }
  }, [rooms]);

  return room && (
    <>
      <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">

        {/* Room title */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <h1 className="text-xl md:text-4xl font-playfair">
            {room.hotel.name}
            <span className="font-inter text-sm">({room.roomType})</span>
          </h1>
          <p className="font-xs font-inter py-1.5 px-3 bg-orange-500 rounded-full">20% OFF</p>
        </div>

        {/* Rating */}
        <div className="flex gap-1 items-center mt-2">
          <StarRating />
          <p className="ml-2">200+ reviews</p>
        </div>

        {/* Address */}
        <div className="flex items-center mt-2 gap-1 text-gray-500">
          <img src={assets.locationIcon} alt="location-icon" />
          <span>{room.hotel.address}</span>
        </div>

        {/* Room images */}
        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          <div className="w-full md:w-1/2">
            <img
              src={mainImage}
              alt="room"
              className="rounded-xl w-full shadow-lg object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 w-full md:w-1/2">
            {room.images.map((image, index) => (
              <img
                key={index}
                onClick={() => setMainImage(image)}
                src={image}
                alt="room"
                className={`cursor-pointer w-full rounded-xl object-cover shadow-md ${mainImage === image && "outline-3 outline-orange-500"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Highlights and price */}
        <div className="flex flex-col md:flex-row md:justify-between mt-10">
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-playfair">Experience Luxury Like Never Before</h1>
            <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
              {room.amenities.map((item, index) => (
                <div key={index} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100">
                  <img src={facilityIcons[item]} alt={item} className="w-5 h-5" />
                  <p className="text-xs">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-2xl font-medium">${room.pricePerNight} /night</p>
        </div>

        {/* Booking form */}
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-6 rounded-xl mx-auto mt-16 max-w-6xl shadow-[0px_0px_20px_rgba(0,0,0,0.15)]"
        >
          <div className="flex flex-col md:flex-row flex-wrap items-start md:items-center gap-4 md:gap-10 text-gray-500">
            <div className="flex flex-col">
              <label htmlFor="checkInDate" className="font-medium">Check-In</label>
              <input
                type="date"
                id="checkInDate"
                onChange={(e) => setCheckInDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>

            <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>

            <div className="flex flex-col">
              <label htmlFor="checkOutDate" className="font-medium">Check-Out</label>
              <input
                type="date"
                id="checkOutDate"
                onChange={(e) => setCheckOutDate(e.target.value)}
                min={checkInDate || new Date().toISOString().split("T")[0]}
                disabled={!checkInDate}
                className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>

            <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>

            <div className="flex flex-col">
              <label htmlFor="Guests" className="font-medium">Guests</label>
              <input
                type="number"
                id="Guests"
                min="1"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-primary hover:bg-primary-dull active:scale-95 transition-all
            text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer"
          >
            {isAvailable ? "Book Now" : "Check Availability"}
          </button>
        </form>

        {/* Common specifications */}
        <div className="space-y-4 mt-25">
          {roomCommonData.map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <img src={item.icon} alt={`${item.title}-icon`} className="w-6.5" />
              <div>
                <p className="text-base">{item.title}</p>
                <p className="text-gray-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Room description */}
        <div>
          <p className="text-gray-500 border-gray-300 my-15 py-10 max-w-3xl border-y">
            Enjoy a comfortable stay in our elegant room, featuring a cozy bed, modern furnishings, air conditioning, free Wi-Fi, and a private bathroom. Perfect for relaxation after a long day, with everything you need for a pleasant experience.
          </p>
        </div>

        {/* Hosted by */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex gap-4">
            <img src={room.hotel.owner.image} alt="Host" className="h-14 w-14 md:h-18 md:w-18 rounded-full" />
            <div>
              <p className="text-lg md:text-xl">Hosted By {room.hotel.name}</p>
              <div className="flex items-center mt-1">
                <StarRating />
                <p className="ml-2">200+ reviews</p>
              </div>
            </div>
          </div>
{/* 
          <button className="px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer">
            Contact Now
          </button> */}
        </div>
      </div>

      {/* Confirm modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Confirm Booking"
        message={`Are you sure you want to book this room "${room?.roomType}"?`}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={async () => {
          await bookRoom({
            checkInDate,
            checkOutDate,
            guests: Number(guests),
          });
          setIsConfirmOpen(false);
        }}
        buttonTitle="Book"
      />
    </>
  );
};

export default RoomDetails;