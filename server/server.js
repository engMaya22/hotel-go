import express from "express"
import "dotenv/config"
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./middleware/clerkWebhooks.js";

const app = express();

app.use(cors());//Allows cross-origin requests
app.use(express.json());//Parses incoming JSON request bodies.
app.use(clerkMiddleware());//Protects routes & attaches Clerk user info to req.

app.use("/api/clerk", clerkWebhooks)
app.get('/', (req, res) => res.send("Api is working"))

connectDB()

export default app;