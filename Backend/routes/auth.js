import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });

        if (/\d/.test(name)) {
            return res.status(400).json({ message: "Name cannot contain numbers" });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const normalizedName = name.trim().split(/\s+/).map(w => w[0].toUpperCase() + w.substring(1).toLowerCase()).join(" ");

        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) return res.status(400).json({ message: "Email already registered" });

        const hashed = await bcrypt.hash(password, 10);
        await User.create({
            name: normalizedName,
            email: normalizedEmail,
            password: hashed,
            role: "Student",
        });

        res.sendStatus(201);
    } catch (error) {
        res.status(500).json({ message: "Server error during registration" });
    }
});

router.post("/login", async (req, res) => {
    const email = req.body.email?.toLowerCase().trim();
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const ok = await bcrypt.compare(req.body.password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET
    );

    res.json({ user, token });
});

export default router;