import express from "express"
import "dotenv/config"
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";

const app = express();

app.use(cors());//Allows cross-origin requests
app.use(express.json());//Parses incoming JSON request bodies.
app.use(clerkMiddleware());//Protects routes & attaches Clerk user info to req.

app.use("/api/clerk", clerkWebhooks)
app.get('/', (req, res) => res.send("Api is working"))

app.use('/api/user' , userRouter);
app.use('/api/hotels' , hotelRouter);
app.use('/api/rooms' , roomRouter);

connectDB()
connectCloudinary()

export default app;