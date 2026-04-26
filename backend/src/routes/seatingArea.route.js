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
router.put("/:id", authMiddleware, updateSeatingArea);
router.delete("/:id", authMiddleware, deleteSeatingArea);

export default router;
