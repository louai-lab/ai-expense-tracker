'use server'

import { connectToDB } from "../mongoose";
import Budget from "../models/budget.model";
import Expense from "../models/expense.model";
import Income from "../models/income.model";
import User from "../models/user.model";

interface CreateBudgetParams {
    description: string;
    amount: number;
    beginDate: Date | undefined;
    endingDate: Date | undefined;
    userId: string;
}

export async function createBudget({
    description, amount, beginDate, endingDate, userId
}: CreateBudgetParams) {
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

        return true

    } catch (error) {
        console.error('Error creating budget:', error);
    }
}

interface Props {
    userId: string
}

export async function getAllBudgets(userId: string) {
    // console.log("userIDdd", userId)
    await connectToDB()

    const budgetList = await Budget.find({ userId: userId })
        .populate({
            path: "expenses",
            model: Expense,
            select: 'description amount userId createdAt',
        })
        .populate({
            path: "incomes",
            model: Income,
            select: 'description amount userId createdAt',
        })
        .sort({ createdAt: -1 })
        .exec();

    let totalBudgetAmount = 0
    let totalSpendAmount = 0
    let totalBudgetLength = 0

    for (const budget of budgetList) {
        const totalSpend = budget.expenses.reduce((sum: number, expense: any) => sum + expense.amount, 0);

        const remainingAmount = budget.amount - totalSpend;

        budget.spend = totalSpend;
        budget.remain = remainingAmount

        totalBudgetAmount += budget.amount
        totalSpendAmount += totalSpend
        totalBudgetLength = budgetList.length


        await budget.save()
    }

    const user = await User.findById(userId);

    if (user) {
        user.totalBudgetAmount = totalBudgetAmount;
        user.totalSpendAmount = totalSpendAmount;
        user.totalBudgetLength = totalBudgetLength;
        await user.save();
    }

    return budgetList;
}


export async function getOneBudget(id: string) {
    // console.log(id)

    await connectToDB()

    try {
        const budget = await Budget.findById(id)
            .populate({
                path: "expenses",
                model: Expense,
                select: 'description amount userId createdAt',
            })
            .populate({
                path: "incomes",
                model: Income,
                select: 'description amount userId createdAt',
            })

        const totalSpend = budget.expenses.reduce((sum: number, expense: any) => {
            return sum + expense.amount;
        }, 0);

        const remainingAmount = budget.amount - totalSpend;

        budget.spend = totalSpend;
        budget.remain = remainingAmount

        await budget.save();

        return budget
    } catch (error) {
        console.error("Error while fetching budget:", error);
        throw new Error("Unable to fetch budget");
    }
}

interface EditProps {
    budgetId: string,
    editDescription: string,
    editAmount: number
    editFrom: Date | undefined,
    editTo: Date | undefined
}


export async function updateBudget({ budgetId, editDescription, editAmount, editFrom, editTo }: EditProps) {

    await connectToDB()

    try {

        await Budget.findOneAndUpdate(
            { _id: budgetId },
            {
                description: editDescription,
                amount: editAmount,
                from: editFrom,
                to: editTo
            },
            { new: true })

        return true

        // console.log(budgetId, editDescription, editAmount, editFrom, editTo)
    } catch (error: any) {
        throw new Error(`Failed to create/update budget: ${error.message}`);

    }
}

export async function deleteBudget(budgetId: string, expenseIds: string[]) {
    console.log(budgetId)
    console.log(expenseIds)

    try {
        await connectToDB();

        await Expense.deleteMany({ _id: { $in: expenseIds } });

        await Budget.findByIdAndDelete(budgetId)

        return true
    } catch (error) {
        console.error('Error deleting budget and expenses:', error);
    }
}


