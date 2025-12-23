import express from "express";
import Notification from "../models/Notification.js";
import auth from "../authMiddleware.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
    const notifications = await Notification.find({ userId: req.user.id });
    res.json(notifications);
});

router.patch("/", auth, async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await Notification.updateMany(
            {
                userId: userId,
                read: false
            },
            {
                $set: { read: true }
            }
        );
    } catch (error) {
        console.error("Error marking all notifications as read:", error);
        res.status(500).json({ message: "Server error while updating notifications." });
    }
})

export default router;
