import express from "express";
import {
    getAllMenuItems,
    createMenuItem,
} from "../controllers/menu.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getAllMenuItems);
router.post("/", authMiddleware, createMenuItem);

export default router;
