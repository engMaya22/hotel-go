

import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res)=>{

    try{
        //create svix instance with clerk webhook secret
        const Webhook = new Webhook(process.env.CLERK_WEEBHOOK_SECRET)

        //gettimng headers
        const headers ={
            "svix-id":req.headers['svix-id'],
            "svix-timestamp":req.headers['svix-timestamp'],
            "svix-signature":req.headers['svix--signature'],

        };

        //verify headers
        await whook.verify(JSON.stringify(req.body),headers)

        //getting data from req body
        const{data, type} = req.body

        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            user_name: data.firs_name + ''+data.last_name,
            image : data.image_url
        }


    }catch(error){

    }

}