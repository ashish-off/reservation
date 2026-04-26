import jwt from "jsonwebtoken";
import { ErrorHandler } from "../error/error.js";

export const authMiddleware = (req, res, next) => {
    const token = req.cookies?.admin_token;

    if (!token) {
        return next(new ErrorHandler("Access denied. No token provided.", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (error) {
        return next(new ErrorHandler("Invalid or expired token.", 401));
    }
};