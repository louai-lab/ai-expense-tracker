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

export async function createExpense({ description, amount, userId, budgetId }: CreateExpenseProps) {
    try {
        await connectToDB()

        const newExpense = await new Expense({
            description: description,
            amount: amount,
            userId: userId,
            budgetId: budgetId
        })

        await newExpense.save()

        const updatedBudget = await Budget.findByIdAndUpdate(
            budgetId,
            { $push: { expenses: newExpense._id } },
            { new: true }
        )


        if (!updatedBudget) {
            console.log("Budget not found")
            return
        }

        return true

    } catch (error) {
        console.error('Error creating expense:', error);
    }
}

interface deleteProps {
    id: string,
    budgetId: string
}

export async function deleteExpense({ id, budgetId }: deleteProps) {

    try {
        await connectToDB();

        const updatedBudget = await Budget.findByIdAndUpdate(
            budgetId,
            { $pull: { expenses: id } },
            { new: true }
        )

        if (!updatedBudget) {
            console.log('Budget not found')
            return
        }


        const deletedExpense = await Expense.findByIdAndDelete(id);

        if (!deletedExpense) {
            console.log('Expense not found')
            return
        }
        return true;

    } catch (error) {
        console.error('Error deleting expense:', error);
    }
}


export async function getAllExpenses(id: string) {
    // console.log("exxx",id)

    await connectToDB()

    const expensesList = await Expense.find({ userId: id })
        .populate({
            path: "budgetId",
            model: Budget,
            select: 'description from to',
        })

    // console.log(expensesList)

    return expensesList
}
