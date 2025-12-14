import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";
import fileRoutes from "./routes/files.js";
import notificationRoutes from "./routes/notifications.js";
import requestRoutes from "./routes/requests.js";


dotenv.config({ quiet: true });

const app = express();
app.use(cors());
app.use(express.json());

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Atlas connected");

        app.use("/auth", authRoutes);
        app.use("/tasks", taskRoutes);
        app.use("/files", fileRoutes);
        app.use("/notifications", notificationRoutes);
        app.use("/requests", requestRoutes);

        app.listen(5000, () => {
            console.log("Server running on port 5000");
        });
    } catch (err) {
        console.error("Mongo connection error:", err.message);
        process.exit(1);
    }
};

start();
