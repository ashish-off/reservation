import Reservation from "../models/reservation.models.js";
import SeatingArea from "../models/seatingArea.model.js";
import { ErrorHandler } from "../error/error.js";


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

