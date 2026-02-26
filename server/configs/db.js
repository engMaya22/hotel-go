
// import mongoose  from "mongoose"

// const connectDB = async()=>{

//     try{
//         mongoose.connection.on('connected',()=>{
//             console.log('Database Connected')
//         });
//        await mongoose.connect(`${process.env.MONGODB_URI}/hotel-go`)
       
//     }catch(error){
//         console.log(error.message)

//     }

// }
// export default connectDB;

import mongoose from "mongoose"

let isConnected = false

const connectDB = async () => {
    if (isConnected) return

    try {
        const db = await mongoose.connect(
            `${process.env.MONGODB_URI}/hotel-go`
        )

        isConnected = db.connections[0].readyState
        console.log("Database Connected")

    } catch (error) {
        console.log("DB error:", error.message)
        throw error
    }
}

export default connectDB