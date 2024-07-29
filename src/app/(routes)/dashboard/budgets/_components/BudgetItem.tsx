import Link from "next/link"
import React from "react"

export default async function BudgetItem({ budget }: any) {

    console.log(budget)

    return (
        <Link href={'/dashboard/expenses/' + budget?.id}>
            <div className="border rounded-2xl p-3 w-80 h-[170px]
         cursor-pointer hover:shadow-md flex flex-col justify-between sm:h-[145px] sm:w-[223px]"
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

                {/* <div>
                    {budget.expenses.map((expense) => (
                        <div key={expense._id}>
                            <h1>{expense.description}</h1>
                        </div>
                    ))}
                </div> */}

                <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <h1 className="text-gray-500 text-sm">$0 Spend</h1>
                        <h1 className="text-gray-500 text-sm text-center">$2000 Remaining</h1>
                    </div>

                    <div className="w-full bg-slate-300 h-2 rounded-full">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "70px" }}>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}