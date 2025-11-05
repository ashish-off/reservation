import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import { errorMiddleware } from "./error/error.js";

const app = express();
dotenv.config({ path: './.env' });
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true, //to send cookies, authorization headers
    methods: ['POST'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use(errorMiddleware);

export default app;