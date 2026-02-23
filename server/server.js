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
import cors from "cors"
import connectDB from "./configs/db.js"
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./middleware/clerkWebhooks.js"

connectDB()
const app = express()
app.use(cors())

// ✅ Webhook route BEFORE express.json() — needs raw body
app.use("/api/clerk", clerkWebhooks)

// ✅ Everything else gets JSON parsing
app.use(express.json())
app.use(clerkMiddleware())

app.get('/', (req, res) => res.send("Api is working"))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

export default app
