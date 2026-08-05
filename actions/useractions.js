"use server"

import Safepay from "@sfpy/node-core"
import Payment from "@/models/Payment.model"
import User from "@/models/User.model"
import connectDB from "@/db/connectDB"

const safepay = new Safepay(process.env.SAFEPAY_SECRET_KEY, {
    authType: "secret",
    host: "https://sandbox.api.getsafepay.com"
})

export const initiate = async (amount, to_username, paymentform) => {

    await connectDB()

    const user = await User.findOne({
        username: to_username
    })

    if (!user) {
        throw new Error("User not found")
    }

    // Create Passport Token
    const passport = await safepay.client.passport.create()

    const tbt = passport.data

    // Create Payment Session
    const session = await safepay.payments.session.setup({
        merchant_api_key: process.env.SAFEPAY_API_KEY,
        intent: "CYBERSOURCE",
        mode: "payment",
        entry_mode: "raw",
        currency: "PKR",
        amount: Number(amount) * 100,
        metadata: {
            order_id: Date.now().toString()
        },
        include_fees: false
    })

    const tracker = session.data.tracker.token

    const checkoutUrl = safepay.checkout.createCheckoutUrl({

        env: "sandbox",

        tracker,

        tbt,

        source: "hosted",

        redirect_url: `${process.env.NEXT_PUBLIC_URL}/success`,

        cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`

    })

    await Payment.create({
        tracker,
        amount,
        to_user: to_username,
        name: paymentform.name,
        message: paymentform.message,
        status: "pending"
    })

    return {
        checkoutUrl
    }
}

export const fetchPaymentByTracker = async (tracker) => {

    await connectDB();

    const payment = await Payment.findOne({ tracker }).lean();

    return payment;

}

export const fetchPayments = async (username) => {
    await connectDB()
    // Find all payments sorted by decrising order of amount and flatten them 
    const payments = await Payment.find(
        {
            to_user: username,
            status: "success"
        },
        {
            name: 1,
            amount: 1,
            message: 1,
            _id: 0
        }
    )
        .sort({ amount: -1 })
        .lean();

    return payments;
}

export const fetchUser = async (username) => {
    await connectDB();

    const user = await User.findOne({ username }).lean();

    return JSON.parse(JSON.stringify(user));
}

export const updateProfile = async (data, oldusername) => {
    await connectDB()
    let ndata = Object.fromEntries(data)

    // Check if username already exists
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return error("Username already exists")
        }
    }

    await User.updateOne({ email: ndata.email }, ndata)
    await Payment.updateMany(
        { to_user: oldusername },
        { $set: { to_user: ndata.username } }
    );
}