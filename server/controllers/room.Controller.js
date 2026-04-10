import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

import { v2 as cloudinary } from "cloudinary";

//api to create new room for a hotel

export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities , isFeatured } = req.body;
    const userId = req.auth.userId;
    const hotel = await Hotel.findOne({ owner: userId });

    if (!hotel) {
      return res.json({ success: false, message: "No Hotel found" });
    }

    //upload images to cloudinary
    const uploadImages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });
    //await all  uploads to complete
    const images = await Promise.all(uploadImages);

    await Room.create({
      roomType,
      pricePerNight: +pricePerNight,
      amenities: JSON.parse(amenities), //To convert the string back to a real JavaScript array.
      images,
      isFeatured,
      hotel: hotel._id,
    });
    res.json({ success: true, message: "Room Created" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// api to get all rooms
export const getRooms = async (req, res) => {
  try {
    //Using .populate("hotel") tells Mongoose:Replace the hotel ID with the actual hotel document.

    const rooms = await Room.find({ isAvailable: true })
      .populate({
        //1️⃣ Populate hotel2️⃣ Then inside the hotel document populate owner
        path: "hotel", //get hotel data
        populate: {
          path: "owner",
          select: "image", //Only return the image field from the owner.
        },
      })
      .sort({ createdAt: -1 });
    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// api to get all rooms for specific hotel for dashboard list rooms
export const getOwnerRooms = async (req, res) => {
  try {
    const hotelData = await Hotel.findOne({ owner: req.auth.userId });
    const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate(
      "hotel",
    );

    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// get featured rooms


export const getFeaturedRooms = async (req, res) => {
  try {

    const rooms = await Room.find({ isFeatured: true })
      .populate({
        //1️⃣ Populate hotel2️⃣ Then inside the hotel document populate owner
        path: "hotel", //get hotel data
        populate: {
          path: "owner",
          select: "image", //Only return the image field from the owner.
        },
      })
      .sort({ createdAt: -1 });
    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//api to update room
export const updateRoom = async (req, res) => {
  try {
    const { roomId, roomType, pricePerNight, amenities ,isFeatured } = req.body;

    const room = await Room.findById(roomId);
    if (!room)
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });

    // Update fields if provided
    room.roomType = roomType ?? room.roomType;
    room.pricePerNight = pricePerNight ?? room.pricePerNight;
    room.amenities = amenities ? JSON.parse(amenities) : room.amenities;
    room.isFeatured = JSON.parse(isFeatured ?? "false");
    

    // Update images if uploaded
    if (req.files && req.files.length > 0) {
      const uploadImages = req.files.map(async (file) => {
        const response = await cloudinary.uploader.upload(file.path);
        return response.secure_url;
      });

      room.images = await Promise.all(uploadImages);
    }

    await room.save();

    res.json({ success: true, message: "Room updated successfully", room });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
//delete room
export const deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.body;

    const room = await Room.findById(roomId);
    if (!room)
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });

  

    await room.deleteOne();

    res.json({ success: true, message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// api to toggle availability for room
export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;

    const roomData = await Room.findById(roomId); //
    roomData.isAvailable = !roomData.isAvailable;
    await roomData.save();

    res.json({ success: true, message: "Room has been toggled" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
