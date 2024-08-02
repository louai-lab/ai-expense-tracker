import Link from "next/link"
import React from "react"
import { getOneBudget } from "../../../../../../lib/actions/budget.actions";

interface BudgetWithExpenses {
    id: string;
    description: string;
    amount: number;
    spend: number;
    remain: number;
    from: Date | string;
    to: Date | string;
    expenses: {
        _id: string;
        description: string;
        amount: number;
        userId: string;
        budgetId: string;
    }[];
}

interface BudgetItemProps {
    budget: BudgetWithExpenses;
}

export default async function BudgetItem({ budget }: BudgetItemProps) {

    // console.log(budget)

    const calculateProgressPerc = () => {
        const perc = (budget?.spend / budget?.amount) * 100;
        return perc > 100 ? 100 : perc.toFixed(2);
    };

    return (
        <Link href={'/dashboard/expenses/' + budget?.id} className=" w-[100%] lg:w-[70%] ">
            <div
                className="border rounded-2xl p-3 cursor-pointer hover:shadow-md flex flex-col justify-between
                 h-[150px]"
            >
                <div className="flex justify-between">
                    <div>
                        <h1 className="font-bold text-xl">{budget?.description}</h1>
                        <h1 className="text-gray-500">{budget?.expenses?.length} items</h1>
                    </div>
                    <div className="text-blue-600 font-bold">
                        ${budget?.amount}
                    </div>
                </div>

                <div className="flex flex-col gap-2">

                    <div className="flex justify-between">
                        <h1 className={`text-sm text-center`}>
                            {new Date(budget?.from).toLocaleDateString()}
                        </h1>
                        <h1 className={`text-sm text-center`}>
                            {new Date(budget?.to).toLocaleDateString()}
                        </h1>
                    </div>


                    <div className="flex justify-between">
                        <h1 className="text-gray-500 text-sm">${budget?.spend}</h1>
                        <h1 className={`text-sm text-center ${budget?.remain > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            ${budget?.remain} {budget?.remain > 0 ? "Remaining" : "Deficit"}
                        </h1>
                    </div>

                    <div className="w-full bg-slate-300 h-2 rounded-full">
                        <div
                            className={`h-2 rounded-full ${budget.remain > 0 ? 'bg-primary' : 'bg-red-500'}`}
                            style={{ width: `${calculateProgressPerc()}%` }}
                        >
                        </div>

                    </div>
                </div>
            </div>
        </Link>
    )
}


