import express, { application, json } from "express"
import "dotenv/config"
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import bookingRouter from "./routes/bookRoutes.js";
import { stripePayment } from "./controllers/bookingController.js";
import { stripeWebHooks } from "./controllers/stripeWebhooks.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});

app.use(cors());//Allows cross-origin requests

//API TO listen to stripe webhooks
app.post('/api/stripe', express.raw({ type: 'application/json' }), stripeWebHooks)



app.use(express.json());//Parses incoming JSON request bodies.
app.use(clerkMiddleware());//Protects routes & attaches Clerk user info to req.

app.use("/api/clerk", clerkWebhooks)
app.get('/', (req, res) => res.send("Api is working"))

app.use('/api/user' , userRouter);
app.use('/api/hotels' , hotelRouter);
app.use('/api/rooms' , roomRouter);
app.use('/api/bookings' , bookingRouter);
connectDB()
connectCloudinary()

export default app;