import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import Payment from "@/models/Payment.model";

export async function POST(req) {
    try {

        await connectDB();

        const body = await req.json();
        
        // Find payment using tracker
        const payment = await Payment.findOne({
            tracker: body.data.tracker
        });

        if (!payment) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Payment not found"
                },
                {
                    status: 404
                }
            );
        }

        // Update payment status
        if (body.type === "payment.succeeded") {
            payment.status = "success";
        }
        else if (body.type === "payment.failed") {
            payment.status = "failed";
        }

        await payment.save();

        return NextResponse.json(
            {
                success: true,
                message: "Webhook received"
            },
            {
                status: 200
            }
        );

    } catch (error) {

        console.error("Webhook Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Invalid webhook"
            },
            {
                status: 400
            }
        );

    }
}