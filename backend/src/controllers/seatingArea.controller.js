import SeatingArea from "../models/seatingArea.model.js";
import { ErrorHandler } from "../error/error.js";

// GET /api/v1/seating-areas  — public
export const getAllSeatingAreas = async (req, res, next) => {
    try {
        const areas = await SeatingArea.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, areas });
    } catch (error) {
        return next(new ErrorHandler("Failed to fetch seating areas.", 500));
    }
};

// POST /api/v1/seating-areas  — admin only
export const createSeatingArea = async (req, res, next) => {
    const { name, description, features, image, cost, capacity, quantity, available } = req.body;

    if (!name || !image || capacity === undefined || quantity === undefined) {
        return next(new ErrorHandler("name, image, capacity, and quantity are required.", 400));
    }

    try {
        const area = await SeatingArea.create({
            name: name.trim(),
            description: description?.trim() || "",
            features: Array.isArray(features) ? features : [],
            image: image.trim(),
            cost: cost || 0,
            capacity,
            quantity,
            available: available !== undefined ? available : true,
        });

        res.status(201).json({
            success: true,
            message: "Seating area created.",
            area,
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((e) => e.message);
            return next(new ErrorHandler(messages.join(", "), 400));
        }
        return next(new ErrorHandler("Failed to create seating area.", 500));
    }
};
