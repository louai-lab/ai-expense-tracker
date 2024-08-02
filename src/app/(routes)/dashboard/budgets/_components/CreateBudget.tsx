'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { useState } from "react"
import React from "react";
import { DatePickerDemo } from "@/components/ui/datePicker";
import { useUser } from "@clerk/nextjs";
import { createBudget } from "../../../../../../lib/actions/budget.actions";

export default function CreateBudget({ userData }: any) {

    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState<number>(0);
    const [beginDate, setBeginDate] = useState<Date | undefined>(undefined);
    const [endingDate, setEndingDate] = useState<Date | undefined>(undefined);
    const { isLoaded, isSignedIn } = useUser()
    const [error, setError] = useState<string | null>(null);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [newBudget, setNewBudget] = useState<any>(null);

    // console.log(userData)

    const handleCreateBudget = async () => {

        if (!userData?.id) {
            console.error("User ID is missing");
            return;
        }

        if (amount < 0) {
            setError('Amount cannot be less than 0');
            return
        }

        try {
            const success = await createBudget({
                description: description,
                amount: amount,
                beginDate: beginDate,
                endingDate: endingDate,
                userId: userData.id
            });


            if (success) {
                console.log('Budget created successfully');
                setDialogOpen(false)
            } else {
                console.error('Failed to create budget');
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (!isLoaded) return <div className='w-[100px] bg-slate-200 rounded-lg h-[100px] animate-pulse'></div>;
    if (!isSignedIn) return <div>Please sign in</div>;

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>
                <div
                    onClick={() => setDialogOpen(true)}
                    className='w-fit h-[150px] p-10 border-2 border-dashed rounded-2xl
                         bg-slate-100 flex flex-col items-center 
                          justify-center cursor-pointer hover:shadow-md sm:h-[145px] sm:w-[223px]'>
                    <h1 className='text-3xl'>+</h1>
                    <h1>Create New Budget</h1>
                </div>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Budget</DialogTitle>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    <DialogDescription>
                        <div className='bg-white mt-4'>
                            <div className='mt-2'>
                                <h2 className='text-black font-bold'>Budget description or purpose</h2>
                                <Input
                                    type="text"
                                    placeholder="description & purpose"
                                    className='mt-1 border rounded-full'
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className='mt-2'>
                                <h2 className='text-black font-bold'>Budget Amount</h2>
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

                            <div className="mt-2">
                                <h2 className='text-black font-bold'>Begin Date</h2>

                                <DatePickerDemo
                                    date={beginDate}
                                    setDate={setBeginDate}
                                />
                            </div>

                            <div className="mt-2">
                                <h2 className='text-black font-bold'>Ending Date</h2>

                                <DatePickerDemo
                                    date={endingDate}
                                    setDate={setEndingDate}
                                />
                            </div>
                        </div>

                        <Button
                            disabled={!(description && amount && beginDate && endingDate)}
                            className='mt-4 w-full rounded-full'
                            onClick={() => handleCreateBudget()}>
                            Create Budget
                        </Button>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
