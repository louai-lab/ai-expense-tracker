import { getOneBudget } from "../../../../../../lib/actions/budget.actions"
import BudgetItem from "../../budgets/_components/BudgetItem";
import ExpensesHeader from "../_components/ExpensesHeader";
import AddExpense from "../_components/AddExpense";
import { currentUser } from "@clerk/nextjs/server";
import { fetchUser } from "../../../../../../lib/actions/user.actions";


export default async function expensesScreen({ params }: any) {
    const budgetData = await getOneBudget(params?.id)

    // console.log(budgetData)

    let user;
    let userInfo;
    let loading = true;
    let noUser = false

    try {
        user = await currentUser()

        // console.log(user)

        if (!user) {
            noUser = true
        }
        else {
            userInfo = await fetchUser(user?.id)
            // console.log(userInfo)
        }
    } catch (error: any) {
        console.error('Error fetching user data expenses Screen:', error)
    } finally {
        loading = false
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (noUser) {
        return <div>No user found</div>;
    }

    const userData = {
        id: userInfo?._id.toString(),
        clerkId: userInfo?.clerkId,
        firstName: userInfo?.firstName,
        lastName: userInfo?.lastName,
        email: userInfo?.email,
        image: userInfo?.image
    }

    const budget = {
        id: budgetData?._id.toString(),
        description: budgetData?.description,
        amount: budgetData?.amount,
        from: budgetData?.from,
        to: budgetData?.to,
        icomes: budgetData?.incomes,
        expenses: budgetData?.expenses,
        spend: budgetData?.spend,
        remain: budgetData?.remain,
        userId: budgetData?.userId.toString()
    }

    return (
        <div className="p-2 sm:p-8">
            <ExpensesHeader />
            <div className="mt-4 flex gap-5">
                {budget ? (
                    <BudgetItem budget={budget} />
                ) : (<div
                    className="h-[150px] w-full bg-slate-200 
                    rounded-lg animate-pulse"
                ></div>)}
                <AddExpense budget={budget} userData={userData} />
            </div>
        </div>
    )
}