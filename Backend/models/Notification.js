import mongoose from "mongoose";

export default mongoose.model(
    "Notification",
    new mongoose.Schema({
        userId: mongoose.Schema.Types.ObjectId,
        message: String,
        read: { type: Boolean, default: false },
    })
);
