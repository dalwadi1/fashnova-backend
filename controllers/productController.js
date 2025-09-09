import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

// Add New Product
export const addProduct = async (req, res) => {
    try {
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
            price: req.body.price,
            sizes: req.body.sizes,
            colors: req.body.colors,
            stock: req.body.stock,
            rating: req.body.rating,
            reviews: req.body.reviews,
            views: req.body.views,
            tags: req.body.tags,
            status: req.body.status,
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
        const { id } = req.query;
        let updateData = { ...req.body };

        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: "products",
            });
            updateData.image = uploadResult.secure_url;
        }

        const product = await Product.findByIdAndUpdate(id, updateData, { new: true });

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete Product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.query.id);
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
