'use server'

import { connectToDB } from "../mongoose";
import Budget from "../models/budget.model";

interface CreateBudgetParams {
    description: string;
    amount: string;
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

export async function getAllBudgets( userId : Props) {
    console.log("userIDdd", userId)
    await connectToDB()

    const budgetList = Budget.find()

    return budgetList;
}
