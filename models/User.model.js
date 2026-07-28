import mongoose from "mongoose";
const { Schema, model } = mongoose

const userSchema = new Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    name: { type: String },
    profilePic: { type: String },
    coverPic: { type: String },
}, { timestamps: true })

const User = model("User", userSchema)
export default mongoose.models.User || User