'use client'

import { ArrowLeft, Trash } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PenBox } from "lucide-react";
import { DatePickerDemo } from "@/components/ui/datePicker";
import { deleteBudget, updateBudget } from "../../../../../../lib/actions/budget.actions";

interface Expense {
    id: string;
    description: string;
    amount: number;
    createdAt: Date | string;
    budgetId: string
}

interface EditExpenseProps {
    budgetId: string;
    description: string,
    amount: number,
    from: Date | string,
    to: Date | string
    expenses: Expense[]
}

function ExpensesHeader({ budgetId, description, amount, from, to, expenses }: EditExpenseProps) {
    const router = useRouter();

    const [editDescription, setEditDescription] = useState(description);
    const [editAmount, setEditAmount] = useState(amount);
    const [editFrom, setEditFrom] = useState<Date | undefined>(new Date(from));
    const [editTo, setEditTo] = useState<Date | undefined>(new Date(to));
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // console.log(expenses)

    const onUpdateBudget = async () => {

        const success = await updateBudget({ budgetId, editDescription, editAmount, editFrom, editTo })

        if (success) {
            console.log('Budget updated successfully');
        } else {
            console.error('Failed to update budget');
        }
    }


    const handleDeleteBudget = async () => {
        const expenseIds = expenses.map(expense => expense.id);

        const success = await deleteBudget(budgetId, expenseIds)

        if (success) {
            console.log('Budget deleted successfully');
            router.push('/dashboard/budgets')
        } else {
            console.error('Failed to delete budget');
        }

        setIsDialogOpen(false)
    }

    return (
        <div className="flex justify-between">
            <span className="flex gap-2 items-center">
                <ArrowLeft onClick={() => router.push('/budgets')} className="cursor-pointer" />
                <h1 className="text-2xl font-bold">My Expenses</h1>
            </span>

            <div className="flex items-center gap-2">

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="flex space-x-2 gap-2 rounded-full">
                            {" "}
                            <PenBox className="w-4" /> Edit
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Update Budget</DialogTitle>
                            <DialogDescription>
                                <div className="mt-5">
                                    <div className="mt-2">
                                        <h2 className='text-black font-bold'>Budget Description</h2>
                                        <Input
                                            placeholder="e.g. Home Decor"
                                            className='mt-1 border rounded-full'
                                            type="text"
                                            value={editDescription}
                                            onChange={(e) => setEditDescription(e.target.value)}
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <h2 className='text-black font-bold'>Budget Amount</h2>
                                        <Input
                                            type="number"
                                            className='mt-1 border rounded-full'
                                            placeholder="e.g. 5000$"
                                            value={editAmount}
                                            onChange={(e) => setEditAmount(parseFloat(e.target.value))}
                                        />
                                    </div>

                                    <div className="mt-2">
                                        <h2 className='text-black font-bold'>From Date</h2>
                                        <DatePickerDemo
                                            date={editFrom}
                                            setDate={setEditFrom}
                                        />
                                    </div>

                                    <div className="mt-2">
                                        <h2 className='text-black font-bold'>To Date</h2>
                                        <DatePickerDemo
                                            date={editTo}
                                            setDate={setEditTo}
                                        />
                                    </div>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button
                                    disabled={!(editDescription && editAmount && editFrom && editTo)}
                                    onClick={() => onUpdateBudget()}
                                    className="mt-5 w-full rounded-full"
                                >
                                    Update Budget
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* <EditBudget /> */}
                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <AlertDialogTrigger asChild>
                        <Button className="flex gap-2 rounded-full" variant="destructive" onClick={() => setIsDialogOpen(true)}>
                            <Trash className="w-4" /> Delete
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete
                                your current budget along with expenses and remove your data
                                from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteBudget}>
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    )
}

export default ExpensesHeader