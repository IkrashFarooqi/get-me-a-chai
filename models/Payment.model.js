import mongoose from "mongoose";
const { Schema, model } = mongoose

const paymentSchema = new Schema({
    name: { type: String, required: true },
    to_user: { type: String, required: true },
    tracker: { type: String, default: null },
    status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
    message: { type: String },
    amount: { type: Number, required: true },
}, { timestamps: true })

export default mongoose.models.Payment || model("Payment", paymentSchema)