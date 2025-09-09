import express from "express";
import { registerUser, loginUser, getUserProfile, updateUserProfile } from "../controllers/authController.js";
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import { protect } from "../middleware/authMiddleware.js";
// import { createOrder, getOrders } from "../controllers/orderController.js";

const router = express.Router();

//Auth Routes
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/profile", protect, getUserProfile);
router.put("/auth/profile", protect, upload.single("profile"), updateUserProfile);

//Product Routes
router.get("/products", getProducts);
router.get("/product/:id", getProductById);
router.post(
    "/products",
    upload.fields([
        { name: "main", maxCount: 1 },
        { name: "side", maxCount: 5 },
    ]),
    addProduct
);
router.put("/product",
    upload.fields([
        { name: "main", maxCount: 1 },
        { name: "side", maxCount: 5 },
    ]),
    updateProduct);
router.delete("/product", deleteProduct);

//Order Routes
// router.get("/orders", getOrders);
// router.post("/orders", createOrder);

export default router;
