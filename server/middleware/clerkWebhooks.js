import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try {
        // Debug: check env var is loaded
        console.log("CLERK_WEBHOOK_SECRET exists:", !!process.env.CLERK_WEBHOOK_SECRET);

        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        const headers = {
            "svix-id": req.headers['svix-id'],
            "svix-timestamp": req.headers['svix-timestamp'],
            "svix-signature": req.headers['svix-signature'],
        };

        // Debug: check headers received
        console.log("Headers received:", headers);

        await whook.verify(JSON.stringify(req.body), headers)

        const { data, type } = req.body
        console.log("data is", data);
        console.log("type is", type);

        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            user_name: data.first_name + ' ' + data.last_name,
            image: data.image_url
        }

        switch (type) {
            case 'user.created':
                await User.create(userData);
                break;
            case 'user.updated':
                await User.findByIdAndUpdate(data.id, userData)
                break;
            case 'user.deleted':
                await User.findByIdAndDelete(data.id)
                break;
            default:
                break;
        }

        res.json({ success: true, message: "webhook received" })

    } catch (error) {
        //  log full error details
        console.log("Webhook error name:", error.name);
        console.log("Webhook error message:", error.message);
        console.log("Webhook error stack:", error.stack);
        res.json({ success: false, message: error.message })
    }
}

export default clerkWebhooks;