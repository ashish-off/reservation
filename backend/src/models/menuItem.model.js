import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    image: {
        type: String,
        required: [true, "Image URL is required"],
        trim: true,
    },
    category: {
        type: [String],
        required: [true, "At least one category is required"],
        validate: {
            validator: (arr) => arr.length > 0,
            message: "At least one category is required",
        },
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"],
    },
    available: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

export default MenuItem;
