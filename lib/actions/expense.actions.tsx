'use server'

import Budget from "../models/budget.model";
import Expense from "../models/expense.model"
import { connectToDB } from "../mongoose"

interface CreateExpenseProps {
    description: string;
    amount: number;
    userId: string;
    budgetId: string;
}

export async function createExpense({ description, amount, userId, budgetId }: CreateExpenseProps): Promise<void> {
    try {
        await connectToDB()

        const newExpense = await new Expense({
            description: description,
            amount: amount,
            userId: userId,
            budgetId: budgetId
        })

        await newExpense.save()

        await Budget.findByIdAndUpdate(
            budgetId,
            { $push: { expenses: newExpense._id } },
            { new: true, useFindAndModify: false }
        )
    } catch (error) {
        console.error('Error creating expense:', error);
    }
}