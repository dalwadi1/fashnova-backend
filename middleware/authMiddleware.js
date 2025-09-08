import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ msg: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ email: decoded.email }).select("-password");

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token invalid" });
    }
};
