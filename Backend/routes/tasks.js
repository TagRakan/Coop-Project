import express from "express";
import Task from "../models/Task.js";
import auth from "../authMiddleware.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.post("/", auth, async (req, res) => {
    if (req.user.role !== "Supervisor") return res.sendStatus(403);
    if (!req.body.title || !req.body.description) return res.status(400).json({ message: "Title and description are required" });

    const task = await Task.create({
        title: req.body.title,
        description: req.body.description,
    });

    res.json(task);
});

export default router;