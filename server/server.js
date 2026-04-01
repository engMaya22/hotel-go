import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookRoutes.js";
import { stripePayment } from "./controllers/bookingController.js";
import { stripeWebHooks } from "./controllers/stripeWebhooks.js";

const app = express();
const PORT = process.env.PORT || 3000;

// ------------------- DATABASE & CLOUD -------------------
connectDB();
connectCloudinary();

// ------------------- CORS -------------------
app.use(cors());

// ------------------- STRIPE WEBHOOK -------------------
// Stripe requires raw body for signature verification
app.post(
  "/api/stripe",
  express.raw({ type: "application/json" }),
  stripeWebHooks
);

// ------------------- JSON PARSER -------------------
// Must be after raw middleware for webhook
app.use(express.json());

// ------------------- CLERK -------------------
app.use(clerkMiddleware());

// ------------------- ROUTES -------------------
app.use("/api/clerk", clerkWebhooks);
app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);

// Test route
app.get("/", (req, res) => res.send("API is working"));

// ------------------- STRIPE PAYMENT (Controller Route) -------------------
app.post("/api/create-checkout-session", stripePayment);

// ------------------- START SERVER -------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;