import { getAllBudgets } from "../../../../../../lib/actions/budget.actions";
import { fetchUser } from "../../../../../../lib/actions/user.actions";
import BudgetItem from "./BudgetItem";
import CreateBudget from "./CreateBudget";
import { currentUser } from "@clerk/nextjs/server";


export default async function BudgetList({ userData }: any) {

    const budgetList = await getAllBudgets(userData?.id)

    return (
        <div className="mt-6">
            <div className="flex flex-wrap gap-5">
                <CreateBudget userData={userData} />
                {budgetList?.length > 0
                    ? budgetList.map((budget, index) => (
                        <BudgetItem budget={budget} key={index} />
                    ))
                    : [1, 2, 3, 4, 5].map((item, index) => (
                        <div key={index} className='w-full bg-slate-200 rounded-lg
                    h-[150px] animate-pulse'>

                        </div>
                    ))}
            </div>
        </div>
    )
}