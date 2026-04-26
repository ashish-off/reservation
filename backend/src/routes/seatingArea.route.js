import express from "express";
import {
    getAllSeatingAreas,
    createSeatingArea,
    updateSeatingArea,
    deleteSeatingArea,
} from "../controllers/seatingArea.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getAllSeatingAreas);
router.post("/", authMiddleware, createSeatingArea);

export default router;
