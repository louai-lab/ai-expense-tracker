import Income from "../models/income.model";
import { connectToDB } from "../mongoose";


interface CreateIncomeProps {
    description: string;
    amount: number;
    userId: string;
    budgetId: string;
}

export async function createIncome({ description, amount, userId, budgetId }: CreateIncomeProps) {
    try {
        await connectToDB()

        const newIncome = await new Income({
            description: description,
            amount: amount,
            userId: userId,
            budgetId: budgetId
        })

        await newIncome.save()

        const updatedIncome = await Income.findByIdAndUpdate(
            budgetId,
            { $push: { incomes: newIncome._id } },
            { new: true }
        )


        if (!updatedIncome) {
            console.log("Budget not found")
            return
        }

        return true

    } catch (error) {
        console.error('Error creating income:', error);
    }
}