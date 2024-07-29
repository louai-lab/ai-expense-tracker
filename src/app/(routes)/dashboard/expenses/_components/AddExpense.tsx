'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import { createExpense } from "../../../../../../lib/actions/expense.actions"


function AddExpense({ budget, userData }: any) {

    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState<number>(0);

    const handleCreateExpense = async () => {
        if (!description || !amount || !budget.id || !userData.id) {
            console.log("All fields required")
            return
        }

        try {
            await createExpense({
                description: description,
                amount: amount,
                budgetId: budget.id,
                userId: userData.id
            })

        } catch (error) {
            console.log(error)
        }
    }

    // console.log(budget.id)
    // console.log(userData.id)
    return (
        <div className="border rounded-2xl p-2 hover:shadow-md w-96">
            <div className='bg-white flex flex-col gap-4'>
                <h1 className="text-2xl font-bold">Add Expense</h1>
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