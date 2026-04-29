import express from 'express';
import {
    getAllReservations,
} from '../controllers/reservation.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authMiddleware, getAllReservations);

export default router;