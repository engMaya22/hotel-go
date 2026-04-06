

import stripe from "stripe"
import Book from "../models/Booking.js";


//API to handle stripe webhooks
export const stripeWebHooks = async (request, response) => {
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
  const sig = request.headers['stripe-signature'];

  let event;
  //console.log('hit this');//this not hit never

  try {
    event = stripeInstance.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEB_HOOK_SECRETE
    );
  } catch (error) {
    return response.status(400).send(`Webhook Error: ${error.message}`);
  }

  //   correct event
  if (event.type === "payment_intent.succeeded") {
    const session = event.data.object;

    const { bookingId } = session.metadata;

    //  Update booking
    await Book.findByIdAndUpdate(bookingId, {
      isPaid: true,
      paymentMethod: "Stripe",
    });

    console.log("✅ Booking marked as paid:", bookingId);
  } else {
    console.log("Unhandled event type:", event.type);
  }

  response.json({ received: true });
};