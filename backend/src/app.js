import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from "./config/db.js";
import { errorMiddleware } from "./error/error.js";
import router from "./routes/reservations.route.js";

dotenv.config();
const app = express();
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true, //to send cookies, authorization headers
    methods: ['POST'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/reservations', router)
connectDB();

app.use(errorMiddleware);

export default app;