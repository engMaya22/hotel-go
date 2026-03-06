


import express from "express"
import { protect } from "../middleware/authMiddleware.js";
import createRoom, { getRooms, getRoomsForHotel, toggleRoomAvailability } from "../controllers/room.Controller.js";
import upload from "../middleware/uploadMiddleware.js";

const roomRouter = express.Router();
roomRouter.post('/',upload.array('images',4) ,protect,createRoom);//max four images  upload
roomRouter.get('/',getRooms);
roomRouter.get('/owner',protect,getRoomsForHotel);
roomRouter.post('/toggle-room-availability',protect,toggleRoomAvailability);


export default roomRouter;