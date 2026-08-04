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