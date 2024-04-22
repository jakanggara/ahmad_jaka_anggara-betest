import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    emailAddress: { type: String, required: true },
    identityNumber: { type: String, required: true }})

export const User = mongoose.model('User', userSchema) 
