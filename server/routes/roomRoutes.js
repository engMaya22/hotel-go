


import express from "express"
import { protect } from "../middleware/authMiddleware.js";
import { createRoom , deleteRoom, getFeaturedRooms, getOwnerRooms, getRooms, toggleRoomAvailability, updateRoom } from "../controllers/room.Controller.js";
// we write import createRoom  from "../controllers/room.Controller.js"; just if creaetRoom is default otherwise write {createRoom}
import upload from "../middleware/uploadMiddleware.js";

const roomRouter = express.Router();
roomRouter.post('/',upload.array('images',4) ,protect,createRoom);//max four images  upload
roomRouter.get('/',getRooms);
roomRouter.get('/owner',protect,getOwnerRooms);
roomRouter.get('/featured-rooms',getFeaturedRooms);
roomRouter.put('/update-room', protect, upload.array('images', 4), updateRoom);
roomRouter.delete('/delete-room', protect, deleteRoom);


roomRouter.post('/toggle-room-availability',protect,toggleRoomAvailability);

roomRouter.put('/update-room-test', (req, res) => res.json({ ok: true }));

export default roomRouter;