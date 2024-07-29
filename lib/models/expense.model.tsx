import mongoose, { Schema } from "mongoose";

const expenseSchema = new mongoose.Schema({
    description: { type: String, required: true },
    amount: { type: Number, default: 0 },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    budgetId: { type: Schema.Types.ObjectId, ref: 'Budget', required: true }
}, { timestamps: true })

const Expense = mongoose.models.Expense || mongoose.model("Expense", expenseSchema)

export default Expense;