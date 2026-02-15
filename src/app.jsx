import React from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Hero from "./components/Hero";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AllRooms from "./pages/AllRooms";
import RoomDetails from "./pages/RoomDetails";
import MyBookings from "./pages/MyBookings";
import HotelRegister from "./components/HotelRegister";

export const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <div className="">
      {!isOwnerPath && <Navbar />}
      {false && <HotelRegister />}

      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
