import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, mobile } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ msg: "Passwords do not match", success: false });
        }

        const userExists = await User.findOne({ email });
        if (userExists) return res.json({ msg: "Email already registered", success: false });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, mobile, password: hashedPassword });

        res.json({ msg: "User registered successfully", user, success: true });
    } catch (err) {
        res.status(500).json({ msg: err.message, success: false });
    }
};

// Login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) return res.json({ msg: "User not found", success: false });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.json({ msg: "Invalid credentials", success: false });

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({
            msg: "User login successfully",
            token,
            user: { id: user._id, name: user.name, email: user.email },
            success: true
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

//get profile
export const getUserProfile = (req, res) => {
    res.json({
        msg: "User profile fetched successfully",
        user: req.user,
        success: true
    });
};
