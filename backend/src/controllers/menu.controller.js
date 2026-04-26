import MenuItem from "../models/menuItem.model.js";
import { ErrorHandler } from "../error/error.js";

// GET /api/v1/menu  — public
export const getAllMenuItems = async (req, res, next) => {
    try {
        const items = await MenuItem.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, items });
    } catch (error) {
        return next(new ErrorHandler("Failed to fetch menu items.", 500));
    }
};

// POST /api/v1/menu  — admin only
export const createMenuItem = async (req, res, next) => {
    const { title, image, category, price, available } = req.body;

    if (!title || !image || !category || price === undefined) {
        return next(new ErrorHandler("title, image, category, and price are required.", 400));
    }

    try {
        const item = await MenuItem.create({
            title: title.trim(),
            image: image.trim(),
            category: Array.isArray(category) ? category : [category],
            price,
            available: available !== undefined ? available : true,
        });

        res.status(201).json({
            success: true,
            message: "Menu item created.",
            item,
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((e) => e.message);
            return next(new ErrorHandler(messages.join(", "), 400));
        }
        return next(new ErrorHandler("Failed to create menu item.", 500));
    }
};

