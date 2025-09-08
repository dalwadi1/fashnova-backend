import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

// Add New Product
export const addProduct = async (req, res) => {
    try {
        const price = req.body.price ? JSON.parse(req.body.price) : {};
        const sizes = req.body.sizes ? JSON.parse(req.body.sizes) : [];
        const colors = req.body.colors ? JSON.parse(req.body.colors) : [];
        const tags = req.body.tags ? JSON.parse(req.body.tags) : [];

        let mainImageUrl = "";
        if (req.files?.main?.[0]) {
            mainImageUrl = req.files.main[0].path;
        }

        let sideImagesUrls = [];
        if (req.files?.side) {
            sideImagesUrls = req.files.side.map(file => file.path);
        }

        const product = new Product({
            name: req.body.name,
            slug: req.body.slug,
            category: req.body.category,
            subCategory: req.body.subCategory,
            ageGroup: req.body.ageGroup,
            description: req.body.description,
            images: { main: mainImageUrl, side: sideImagesUrls },
            price,
            sizes,
            colors,
            stock: req.body.stock,
            rating: req.body.rating || 0,
            reviews: req.body.reviews || 0,
            views: req.body.views || 0,
            tags,
            status: req.body.status || "active",
        });

        await product.save();

        res.status(201).json({ success: true, message: "Product added successfully", product });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
            stack: error.stack
        });
    }
};

// Get All Products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Single Product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });
        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Product
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });
        res.status(200).json({ success: true, message: "Product updated successfully", product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete Product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
