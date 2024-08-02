import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String },
    totalBudgetAmount: { type: Number },
    totalSpendAmount: { type: Number },
    totalBudgetLength: { type: Number }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;