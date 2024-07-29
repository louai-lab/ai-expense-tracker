'use server'

import { connectToDB } from "../mongoose";
import Budget from "../models/budget.model";
import Expense from "../models/expense.model";

interface CreateBudgetParams {
    description: string;
    amount: number;
    beginDate: Date | undefined;
    endingDate: Date | undefined;
    userId: string;
}

export async function createBudget({
    description, amount, beginDate, endingDate, userId
}: CreateBudgetParams): Promise<void> {
    try {

        await connectToDB();

        const newBudget = await new Budget({
            description: description,
            amount: amount,
            from: beginDate,
            to: endingDate,
            userId: userId
        });

        await newBudget.save();

    } catch (error) {
        console.error('Error creating budget:', error);
    }
}

interface Props {
    userId: string
}

export async function getAllBudgets() {
    // console.log("userIDdd", userId)
    await connectToDB()

    const budgetList = await Budget.find()
        .populate({
            path: "expenses",
            model: Expense,
            select: 'description amount userId budgetId',
        })
        .sort({ createdAt: -1 })
        .exec();

    return budgetList;
}


export async function getOneBudget(id: string) {
    // console.log(id)

    await connectToDB()

    try {
        const budget = await Budget.findById(id)

        return budget
    } catch (error) {
        console.error("Error while fetching budget:", error);
        throw new Error("Unable to fetch budget");
    }
}
