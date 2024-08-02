'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import { createExpense } from "../../../../../../lib/actions/expense.actions"
import { useRouter } from "next/navigation"


interface AddExpenseProps {
    budgetId: string;
    userId: string;
}

function AddExpense({ budgetId, userId }: AddExpenseProps) {

    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter()

    const handleCreateExpense = async () => {
        if (!description || !amount || !budgetId || !userId) {
            console.log("All fields required")
            return
        }

        if (amount < 0) {
            setError('Amount cannot be less than 0');
            return
        }

        try {
            const success = await createExpense({
                description: description,
                amount: amount,
                budgetId: budgetId,
                userId: userId
            })

            if (success) {
                console.log('Expense created successfully');
            } else {
                console.error('Failed to create expense');
            }

        } catch (error) {
            console.log(error)
        }
    }

    // console.log(budget.id)
    // console.log(userData.id)
    return (
        <div className="border rounded-2xl p-2 hover:shadow-md w-[100%] lg:w-11/12" >
            <div className='bg-white flex flex-col gap-4'>
                <h1 className="text-2xl font-bold">Add Expense</h1>
                {error && <p className="text-red-500 mt-2">{error}</p>}

                <div>
                    <h2 className='text-black font-bold'>Expense purpose</h2>
                    <Input
                        type="text"
                        placeholder="purpose"
                        className='mt-1 border rounded-full'
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div>
                    <h2 className='text-black font-bold'>Expense Amount</h2>
                    <Input
                        type="number"
                        placeholder="e.g. 5000$"
                        className='mt-1 border rounded-full'
                        onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            setAmount(isNaN(value) ? 0 : value);
                        }}
                    />
                </div>
            </div>

            <Button
                disabled={!(description && amount)}
                className='mt-4 w-full rounded-full'
                onClick={() => handleCreateExpense()}
            >
                Create Expense
            </Button>
        </div>
    )
}

export default AddExpense