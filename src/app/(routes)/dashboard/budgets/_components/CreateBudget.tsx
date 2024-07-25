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
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import React from "react";
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


export default function CreateBudget() {

    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")

    const handleCreateBudget = async () => {
        console.log(description)
        console.log(amount)
        console.log(date)
    }

    const [date, setDate] = useState<Date | null>(null)


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
                                <h2 className='text-black font-medium'>Budget description or purpose</h2>
                                <Input
                                    type="text"
                                    placeholder="description & purpose"
                                    className='mt-1 border rounded-full'
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className='mt-2'>
                                <h2 className='text-black font-medium'>Budget Amount</h2>
                                <Input
                                    type="number"
                                    placeholder="e.g. 5000$"
                                    className='mt-1 border rounded-full'
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>

                            <div className="mt-2">
                                <h2 className='text-black font-medium'>Begin Date</h2>

                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[280px] justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            // selected={date}
                                            // onSelect={setDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        <Button
                            disabled={!(description && amount)}
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