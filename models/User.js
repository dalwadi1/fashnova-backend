import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        mobile: {
            type: String,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        
        profile: {
            type: String,
            default: ""  
        },
        
        bio: {
            type: String,
            maxlength: 200, 
            default: ""
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
