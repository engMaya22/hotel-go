import mongoose from "mongoose";
import Room from "../models/Room.js";
import dotenv from "dotenv";

dotenv.config();

// 1. Connect to DB
await mongoose.connect( `${process.env.MONGODB_URI}/hotel-go`);

console.log("MongoDB connected");

// 2. Update existing documents
const result = await Room.updateMany(
  { isFeatured: { $exists: false } },
  { $set: { isFeatured: false } }
);

console.log("Migration completed");
console.log(result);

// 3. Exit process
process.exit();