"use server"
import Razorpay from "razorpay"
import Payment from "@/models/Payment.model"
import connectDB from "@/db/connectDB"
import User from "@/models/User.model"

export const initiate = async (amount, to_username, paymentform) => {
    try {
        await connectDB();

        console.log("KEY_ID:", process.env.KEY_ID)
        console.log("KEY_SECRET:", process.env.KEY_SECRET ? "Loaded" : "Missing")
        const instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET,
        });

        const options = {
            amount: Number(amount),
            currency: "INR",
        };

        console.log("Options:", options);

        const order = await instance.orders.create(options);

        console.log("Order:", order);

        await Payment.create({
            oid: order.id,
            amount,
            to_username,
            name: paymentform.name,
            message: paymentform.message,
        });

        return order;
    } catch (err) {
        console.error("Razorpay Error:", err);
        console.error("Response:", err.error);
        console.error("Status:", err.statusCode);
        throw err;
    }
};