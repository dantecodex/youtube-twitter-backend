import mongoose, { Schema, model } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler";

const subscriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId, // one who is subscribing
        ref: "User"
    },

    channel: {
        type: Schema.Types.ObjectId, // one to whom subscriber is subscribing
        ref: "User"
    }
}, { timestamps: true })


export const subscription = mongoose.model("subscription", subscriptionSchema)