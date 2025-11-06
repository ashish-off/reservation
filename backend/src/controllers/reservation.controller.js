import { ErrorHandler } from "../error/error.js";
import Reservation from "../models/reservation.models.js";

export const sendReservation = async (req, res, next) => {
    const { name, email, phone, time, date } = req.body;

    if (!name || !email || !phone || !time || !date) {
        return next(new ErrorHandler("All fields are required", 400));
    }

    try {
        const reservation = await Reservation.create({
            name,
            email,
            phone,
            time,
            date
        });

        res.status(200).json({
            success: true,
            message: "Reservation created successfully",
            reservation
        });

    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message); // returns array of error messages came from mongoose validation
            return next(new ErrorHandler(messages.join(', '), 400));
        }
        return next(new ErrorHandler("Failed to create reservation", 500));
    }
}