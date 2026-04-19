import mongoose from "mongoose";
import validator from "validator";

const reservationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [validator.isEmail, 'Please enter a valid email'],
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        minlength: [10, "Phone number must be 10 digits"],
        maxlength: [10, "Phone number must be 10 digits"],
    },
    date: {
        type: Date,
        required: [true, "Date is required"],
    },
    time: {
        type: String,
        required: [true, "Time is required"],
    },
    guests: {
        type: Number,
        required: [true, "Number of guests is required"],
        min: [1, "At least 1 guest is required"],
        max: [15, "Maximum 15 guests allowed"],
    },
    seatingAreaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SeatingArea",
        required: [true, "Seating area is required"],
    },
    seatingAreaName: {
        type: String,
        required: [true, "Seating area name is required"],
    },
    specialRequest: {
        type: String,
        default: "",
        trim: true,
    },
    paymentMethod: {
        type: String,
        enum: ["now", "later"],
        default: "later",
    },
    status: {
        type: String,
        enum: ["confirmed", "cancelled", "completed"],
        default: "confirmed",
    },
}, { timestamps: true });

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;