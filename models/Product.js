import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    category: String,
    subCategory: String,
    ageGroup: String,
    description: String,
    images: {
        main: String,
        side: [String],
    },
    price: Object,
    sizes: [String],
    colors: [String],
    stock: Number,
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    tags: [String],
    status: { type: String, default: "active" },
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
