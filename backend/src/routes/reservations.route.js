import express from 'express';
import {
    sendReservation,
    checkAvailability,
    getAllReservations,
    updateReservationStatus,
    deleteReservation,
} from '../controllers/reservation.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public
router.post('/send', sendReservation);
router.get('/check-availability', checkAvailability);

// Admin only
router.get('/', authMiddleware, getAllReservations);
router.put('/:id/status', authMiddleware, updateReservationStatus);
router.delete('/:id', authMiddleware, deleteReservation);

export default router;