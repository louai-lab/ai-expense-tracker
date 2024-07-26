import mongoose, { Schema } from "mongoose";

const budgetSchema = new mongoose.Schema({
    description: { type: String, required: true },
    amount: { type: String, default: 0 },
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    incomes: [{
        type: Schema.Types.ObjectId, ref: "Income"
    }],
    expenses: [{
        type: Schema.Types.ObjectId, ref: "Expense"
    }],
    spend: {
        type: Number,
        default: 0
    },
    remain: {
        type: Number,
        default: 0
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

const Budget = mongoose.models.Budget || mongoose.model("Budget", budgetSchema)

export default Budget;