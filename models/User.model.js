import mongoose from "mongoose";
const { Schema, model } = mongoose

const userSchema = new Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    name: { type: String },
    profilePic: { type: String },
    coverPic: { type: String },
    bankId: { type: String },
    bankSecret: { type: String },
}, { timestamps: true })

export default mongoose.models.User || model("User", userSchema)