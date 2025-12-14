import mongoose from "mongoose";

export default mongoose.model(
    "Task",
    new mongoose.Schema({
        title: String,
        description: String,
    })
);
