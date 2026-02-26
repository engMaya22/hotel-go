import express from "express"
import "dotenv/config"
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./middleware/clerkWebhooks.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/clerk", clerkWebhooks)
app.get('/', (req, res) => res.send("Api is working"))

connectDB()

export default app;