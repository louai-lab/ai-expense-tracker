import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String },
    // budgets: [{
    //     type: Schema.Types.ObjectId, ref: "Budget"
    // }],
    // incomes: [{
    //     type: Schema.Types.ObjectId, ref: "Income"
    // }],
    // expenses: [{
    //     type: Schema.Types.ObjectId, ref: "Expense"
    // }],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;