import express from "express";
import Request from "../models/Request.js";
import auth from "../authMiddleware.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
    const requests = await Request.find({ status: "Pending" });
    res.json(requests);
});

export default router;
