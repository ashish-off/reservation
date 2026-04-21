//  One-time script to create the admin user in MongoDB. (no signup as ther is only one admin)
//  Run ONCE with: node src/scripts/seedAdmin.js

import dotenv from "dotenv";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Admin from "../models/admin.model.js";

dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@everestdining.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB.");

        const existing = await Admin.findOne({ email: ADMIN_EMAIL });

        if (existing) {
            console.log(`Admin already exists: ${ADMIN_EMAIL}`);
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
        await Admin.create({ email: ADMIN_EMAIL, password: hashedPassword });

        console.log(`Admin created: ${ADMIN_EMAIL}`);
        console.log(`Password: ${ADMIN_PASSWORD}`);
        console.log("Save this password somewhere safe!");
    } catch (error) {
        console.error("Seed failed:", error.message);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

seed();
