'use client'

import React from "react";
import { deleteExpense } from "../../../../../../lib/actions/expense.actions";
import { getOneBudget } from "../../../../../../lib/actions/budget.actions";

interface Expense {
    id: string;
    description: string;
    amount: number;
    // userId: string;
    createdAt: Date | string;
    budgetId: string
}

interface ExpensesListProps {
    expenses: Expense[];
}

const handleDelete = async (id: string, budgetId: string) => {

    const success = await deleteExpense({ id, budgetId })

    if (success) {
        console.log('Expense deleted successfully');
        // await getOneBudget(budgetId)
    } else {
        console.error('Failed to delete expense');
    }
}

export default function ExpensesList({ expenses }: ExpensesListProps) {

    // console.log(expenses)

    return (
        <div className="mt-3">
            <h2 className="font-bold">Latest Expenses</h2>

            <div className="grid grid-cols-4 rounded-tl-xl rounded-tr-xl bg-slate-200 p-2 mt-3">
                <h2 className="font-bold">Description</h2>
                <h2 className="font-bold">Amount</h2>
                <h2 className="font-bold">Date</h2>
                <h2 className="font-bold">Action</h2>
            </div>

            {expenses.map((expense, index) => (
                <div key={index} className="grid grid-cols-4 bg-slate-50 rounded-bl-xl rounded-br-xl p-2">
                    <h2>{expense?.description}</h2>
                    <h2>{expense?.amount}</h2>
                    <h2>{new Date(expense.createdAt).toLocaleDateString()}</h2>
                    <h2
                        onClick={() => handleDelete(expense?.id, expense?.budgetId)}
                        className="text-red-500 cursor-pointer"
                    >
                        Delete
                    </h2>
                </div>
            ))}
        </div>
    );
}
