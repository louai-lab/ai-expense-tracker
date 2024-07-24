import mongoose, { Schema } from "mongoose";

const budgetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: String, required: true },
    icon: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

const Budget = mongoose.models.Budget || mongoose.model("Budget", budgetSchema)

export default Budget;