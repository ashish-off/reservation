import mongoose from "mongoose";

const seatingAreaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    description: {
        type: String,
        default: "",
        trim: true,
    },
    features: {
        type: [String],
        default: [],
    },
    image: {
        type: String,
        required: [true, "Image URL is required"],
        trim: true,
    },
    cost: {
        type: Number,
        default: 0,
        min: [0, "Cost cannot be negative"],
    },
    capacity: {
        type: Number,
        required: [true, "Capacity is required"],
        min: [1, "Capacity must be at least 1"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Must have at least 1 table in this area"],
    },
    available: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

const SeatingArea = mongoose.model("SeatingArea", seatingAreaSchema);

export default SeatingArea;
