


import express from "express"
import { protect } from "../middleware/authMiddleware.js";
import { createRoom , getOwnerRooms, getRooms, toggleRoomAvailability } from "../controllers/room.Controller.js";
// we write import createRoom  from "../controllers/room.Controller.js"; just if creaetRoom is default otherwise write {createRoom}
import upload from "../middleware/uploadMiddleware.js";

const roomRouter = express.Router();
roomRouter.post('/',upload.array('images',4) ,protect,createRoom);//max four images  upload
roomRouter.get('/',getRooms);
roomRouter.get('/owner',protect,getOwnerRooms);
roomRouter.post('/toggle-room-availability',protect,toggleRoomAvailability);


export default roomRouter;