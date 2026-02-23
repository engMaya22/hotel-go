

// import User from "../models/User.js";
// import { Webhook } from "svix";

// const clerkWebhooks = async (req, res)=>{

//     try{
//         //create svix instance with clerk webhook secret
//         const Webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

//         //getting headers
//         const headers ={
//             "svix-id":req.headers['svix-id'],
//             "svix-timestamp":req.headers['svix-timestamp'],
//             "svix-signature":req.headers['svix-signature'],

//         };

//         //verify headers
//         await webhook .verify(JSON.stringify(req.body),headers)

//         //getting data from req body
//         const{data, type} = req.body
//         console.log("data is " , data);
//         console.log("type is " , type);

//         const userData = {
//             _id: data.id,
//             email: data.email_addresses[0].email_address,
//             user_name: data.first_name + ' ' + data.last_name,
//             image : data.image_url
//         }

//         // switch case for different events
//         switch (type) {
//             case 'user.created':{
//                 await User.create(userData);
//                 break;
//             }
//             case 'user.updated':{
//                await User.findByIdAndUpdate(data.id,userData)
//                 break;
//             }
                
//             case 'user.deleted':{
//                await User.findByIdAndDelete(data.id)
//                 break;
//             }
        
//             default:
//                 break;
//         }
//         res.json({success:true , message:"webhook received"})


//     }catch(error){
//         console.log(error.message);
//         res.json({success:false , message : error.message})

//     }

// }
// export default  clerkWebhooks;

import { verifyWebhook } from '@clerk/express/webhooks'
import express from 'express'

const router = express.Router()

router.post(
  '/',
  express.raw({ type: 'application/json' }), // raw body required
  async (req, res) => {
    try {
      const evt = await verifyWebhook(req) // handles everything internally

      const { id } = evt.data
      const eventType = evt.type
      console.log(`Received webhook: ${eventType} for user ${id}`)

      if (eventType === 'user.created') {
        await User.create({
          clerkId: evt.data.id,
          email: evt.data.email_addresses[0].email_address,
          name: `${evt.data.first_name} ${evt.data.last_name}`.trim(),
          imageUrl: evt.data.image_url,
        })
      }

      if (eventType === 'user.updated') {
        await User.findOneAndUpdate(
          { clerkId: evt.data.id },
          {
            email: evt.data.email_addresses[0].email_address,
            name: `${evt.data.first_name} ${evt.data.last_name}`.trim(),
            imageUrl: evt.data.image_url,
          }
        )
      }

      if (eventType === 'user.deleted') {
        await User.findOneAndDelete({ clerkId: evt.data.id })
      }

      return res.status(200).json({ success: true })
    } catch (err) {
      console.error('Webhook verification failed:', err)
      return res.status(400).json({ error: 'Webhook verification failed' })
    }
  }
)

export default router