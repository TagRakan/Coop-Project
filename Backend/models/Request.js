import mongoose from "mongoose";

export default mongoose.model(
    "Request",
    new mongoose.Schema({
        taskId: mongoose.Schema.Types.ObjectId,
        student: mongoose.Schema.Types.ObjectId,
        taskName: String,
        fileName: String,
        filePath: String,
        studentName: String,
        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending",
        },
    })
);
