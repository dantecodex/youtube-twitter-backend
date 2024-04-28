import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videosSchema = new Schema({
    videoFile: {
        type: String, // Cloundnary URL
        required: true
    },
    thumbnail: {
        type: String, // Cloundnary URL
        required: true
    },
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

videosSchema.plugin(mongooseAggregatePaginate)
export const video = mongoose.model('Video', videosSchema)