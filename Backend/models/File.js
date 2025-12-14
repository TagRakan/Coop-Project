import mongoose from "mongoose";

export default mongoose.model(
    "File",
    new mongoose.Schema({
        name: String,
        path: String,
        uploadedByName: String,
        taskId: mongoose.Schema.Types.ObjectId,
        uploadedBy: mongoose.Schema.Types.ObjectId,
    })
);
