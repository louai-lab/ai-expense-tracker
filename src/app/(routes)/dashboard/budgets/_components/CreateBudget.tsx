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

interface Props {
    userData: {
        id: string,
        clerkId: string,
        firstName: string,
        lastName: string,
        email: string,
        image: string
    }
}

export default function CreateBudget({ userData }: Props) {

    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")
    const [beginDate, setBeginDate] = useState<Date | undefined>(undefined);
    const [endingDate, setEndingDate] = useState<Date | undefined>(undefined);
    const { isLoaded, isSignedIn } = useUser()

    // console.log(userData)

    const handleCreateBudget = async () => {

        if (!userData?.id) {
            console.error("User ID is missing");
            return;
        }

        // console.log("try")

        await createBudget({
            description: description,
            amount: amount,
            beginDate: beginDate,
            endingDate: endingDate,
            userId: userData.id
        });
    }

    if (!isLoaded) return <div>Loading ...</div>;
    if (!isSignedIn) return <div>Please sign in</div>;

    return (
        <Dialog>
            <DialogTrigger>
                <div
                    className='p-10 border-2 border-dashed rounded-2xl
                         bg-slate-100 flex flex-col items-center 
                          justify-center cursor-pointer hover:shadow-md'>
                    <h1 className='text-3xl'>+</h1>
                    <h1>Create New Budget</h1>
                </div>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Budget</DialogTitle>
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
                                    onChange={(e) => setAmount(e.target.value)}
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
