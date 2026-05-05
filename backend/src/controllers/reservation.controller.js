import Reservation from "../models/reservation.models.js";
import SeatingArea from "../models/seatingArea.model.js";
import { ErrorHandler } from "../error/error.js";

// Helper: convert "07:00 PM" → minutes since midnight
const timeToMinutes = (timeStr) => {
    const [time, modifier] = timeStr.trim().split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
};

// POST /api/v1/reservations/send  — public
export const sendReservation = async (req, res, next) => {
    const {
        name, email, phone, date, time, guests,
        seatingAreaId, seatingAreaName,
        specialRequest, paymentMethod,
    } = req.body;

    if (!name || !email || !phone || !date || !time || !guests || !seatingAreaId || !seatingAreaName) {
        return next(new ErrorHandler("All required fields must be provided.", 400));
    }

    try {
        const reservation = await Reservation.create({
            name, email, phone,
            date: new Date(date),
            time, guests,
            seatingAreaId, seatingAreaName,
            specialRequest: specialRequest || "",
            paymentMethod: paymentMethod || "later",
            status: "confirmed",
        });

        res.status(201).json({
            success: true,
            message: "Reservation created successfully.",
            reservation,
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((e) => e.message);
            return next(new ErrorHandler(messages.join(", "), 400));
        }
        return next(new ErrorHandler("Failed to create reservation.", 500));
    }
};

export const checkAvailability = async (req, res, next) => {};

// GET /api/v1/reservations  — admin only
export const getAllReservations = async (req, res, next) => {
    try {
        const { date } = req.query;
        const filter = {};

        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
            filter.date = { $gte: startOfDay, $lte: endOfDay };
        }

        const reservations = await Reservation.find(filter)
            .populate("seatingAreaId", "name capacity")
            .sort({ date: -1, createdAt: -1 });

        res.status(200).json({
            success: true,
            reservations,
            count: reservations.length,
        });
    } catch (error) {
        return next(new ErrorHandler("Failed to fetch reservations.", 500));
    }
};

// PUT /api/v1/reservations/:id/status  — admin only
export const updateReservationStatus = async (req, res, next) => {
    const { status } = req.body;

    if (!status || !["confirmed", "cancelled", "completed"].includes(status)) {
        return next(new ErrorHandler("status must be 'confirmed', 'cancelled', or 'completed'.", 400));
    }

    try {
        const reservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!reservation) {
            return next(new ErrorHandler("Reservation not found.", 404));
        }

        res.status(200).json({
            success: true,
            message: `Reservation marked as ${status}.`,
            reservation,
        });
    } catch (error) {
        return next(new ErrorHandler("Failed to update reservation status.", 500));
    }
};

// DELETE /api/v1/reservations/:id  — admin only
export const deleteReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);

        if (!reservation) {
            return next(new ErrorHandler("Reservation not found.", 404));
        }

        res.status(200).json({
            success: true,
            message: "Reservation deleted.",
        });
    } catch (error) {
        return next(new ErrorHandler("Failed to delete reservation.", 500));
    }
};