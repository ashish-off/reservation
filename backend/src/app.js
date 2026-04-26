import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservations.route.js";
import adminRouter from "./routes/admin.route.js";
import menuRouter from "./routes/menu.route.js";
import seatingAreaRouter from "./routes/seatingArea.route.js";

dotenv.config();
const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true,
        optionsSuccessStatus: 200,
    }),
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/menu', menuRouter);
app.use('/api/v1/reservations', reservationRouter);
app.use('/api/v1/seating-areas', seatingAreaRouter);

connectDB();

app.use(errorMiddleware);

export default app;