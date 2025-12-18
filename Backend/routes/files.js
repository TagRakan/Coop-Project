import express from "express";
import multer from "multer";
import File from "../models/File.js";
import Request from "../models/Request.js";
import Notification from "../models/Notification.js";
import Task from "../models/Task.js";
import User from "../models/User.js";
import auth from "../authMiddleware.js";
import fs from 'fs';

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/upload/:taskId", auth, upload.single("file"), async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const username = await User.findById(req.user.id);
    const xTask = await Task.findById(req.params.taskId);
    if (!xTask) return res.status(404).json({ message: "Task not found" });

    if (req.user.role === "Student") {
        const request = await Request.create({
            taskId: req.params.taskId,
            student: req.user.id,
            taskName: xTask.title,
            studentName: username.name,
            fileName: req.file.originalname,
            filePath: req.file.path,
        });

        const supervisors = await User.find({ role: 'Supervisor' }).exec();
        for (const supervisor of supervisors) {
            await Notification.create({
                userId: supervisor._id,
                message: "New file upload request from " + username.name,
            });
        }
        return res.json({ requested: true });
    }

    const file = await File.create({
        name: req.file.originalname,
        path: req.file.path,
        taskId: req.params.taskId,
        uploadedBy: req.user.id,
        uploadedByName: username.name,
    });

    const usersToSend = await User.find({ role: { $in: ["Supervisor", "Employee", "Student"] } }).exec();
    for (const auser of usersToSend) {
        await Notification.create({
            userId: auser._id,
            message: "The file " + req.file.originalname + " uploaded within " + xTask.title,
        });
    }

    res.json(file);
});

router.get("/task/:taskId", auth, async (req, res) => {
    const files = await File.find({ taskId: req.params.taskId });
    res.json(files);
});

router.get("/reqdownload/:id", async (req, res) => {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.download(request.filePath, request.fileName);
});

router.get("/download/:id", async (req, res) => {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });
    res.download(file.path, file.name);
});

router.post("/request/:id", auth, async (req, res) => {
    if (req.user.role !== "Supervisor") return res.sendStatus(403);
    if (!req.body.status) return res.status(400).json({ message: "Status is required" });

    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = req.body.status;
    await request.save();

    if (req.body.status === "Approved") {
        await File.create({
            name: request.fileName,
            path: request.filePath,
            taskId: request.taskId,
            uploadedBy: request.student,
            uploadedByName: request.studentName,
        });
    } else if (req.body.status === "Rejected") {
        if (fs.existsSync(request.filePath)) {
            fs.unlinkSync(request.filePath);
        }
    }

    await Notification.create({
        userId: request.student,
        message: `Your request to upload the file ${request.fileName} within ${request.taskName} was ${request.status}`,
    });

    res.sendStatus(200);
});

router.delete('/:id', auth, async (req,res)=>{
    const file = await File.findById(req.params.id);
    if(!file) return res.status(404).json({message:"File not found"});
    if(req.user.role==='Student') return res.status(403).json({message:"Not allowed"});
    if(req.user.role==='Employee' && !file.uploadedBy.equals(req.user.id))
        return res.status(403).json({message: "You can only delete your own files"});

    if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
    await file.deleteOne();
    res.json({message:"File deleted"});
});

export default router;