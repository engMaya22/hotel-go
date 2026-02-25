// import express from "express"
// import "dotenv/config"
// import cors from "cors";
// import connectDB from "./configs/db.js";
// import { clerkMiddleware } from '@clerk/express'
// import clerkWebhooks from "./middleware/clerkWebhooks.js";

// connectDB();
// const app = express();
// app.use(cors());//enable cross-origin resource sharing

// //middleware
// app.use(express.json())//parse to json
// app.use(clerkMiddleware())

// //API to listen to clerk webhook
// app.use("/api/clerk" , clerkWebhooks)


// app.get('/',(req , res)=> res.send("Api is working"))
// const PORT = process.env.PORT || 3000

// app.listen(PORT , ()=>console.log(`Server running on port  ${PORT}`))

// export default app;

import express from "express"
import "dotenv/config"
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./middleware/clerkWebhooks.js";

const app = express();
app.use(cors());

// middleware FIRST
app.use(express.json())
app.use(clerkMiddleware())

// API routes
app.use("/api/clerk", clerkWebhooks)
app.get('/', (req, res) => res.send("Api is working"))

const PORT = process.env.PORT || 3000

// Connect DB first, THEN start server
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}).catch(err => {
    console.log("Failed to connect to DB:", err.message)
    process.exit(1)
})

export default app;