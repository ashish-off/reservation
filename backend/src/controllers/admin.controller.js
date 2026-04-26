import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";
import { ErrorHandler } from "../error/error.js";

const COOKIE_NAME = "admin_token";
const isProduction = process.env.NODE_ENV === "production";
const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

// POST /api/v1/admin/login
export const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Email and password are required.", 400));
    }

    try {
        const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

        if (!admin) {
            return next(new ErrorHandler("Invalid credentials.", 401));
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return next(new ErrorHandler("Invalid credentials.", 401));
        }

        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie(COOKIE_NAME, token, cookieOptions);

        res.status(200).json({
            success: true,
            message: "Login successful.",
            admin: {
                id: admin._id,
                email: admin.email,
            },
        });
    } catch (error) {
        return next(new ErrorHandler("Login failed.", 500));
    }
};

// GET /api/v1/admin/me  (protected)
export const getMe = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.admin.id).select("-password");

        if (!admin) {
            return next(new ErrorHandler("Admin not found.", 404));
        }

        res.status(200).json({
            success: true,
            admin,
        });
    } catch (error) {
        return next(new ErrorHandler("Failed to fetch admin info.", 500));
    }
};

// POST /api/v1/admin/logout
export const logout = (req, res) => {
    res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully.",
    });
};
