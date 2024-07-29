'use client'

import { ArrowLeft, Trash } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import EditBudget from "./EditBudget";

function ExpensesHeader() {

    const route = useRouter();

    return (
        <div className="flex justify-between">
            <span className="flex gap-2 items-center">
                <ArrowLeft onClick={() => route.back()} className="cursor-pointer" />
                <h1 className="text-2xl font-bold">My Expenses</h1>
            </span>

            <div className="flex items-center gap-2">
                <EditBudget />
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="flex gap-2 rounded-full" variant="destructive">
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
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>
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