import { getOneBudget } from "../../../../../../lib/actions/budget.actions"
import BudgetItem from "../../budgets/_components/BudgetItem";
import ExpensesHeader from "../_components/ExpensesHeader";
import AddExpense from "../_components/AddExpense";
import { currentUser } from "@clerk/nextjs/server";
import { fetchUser } from "../../../../../../lib/actions/user.actions";
import ExpensesList from "../../budgets/_components/ExpensesList";

interface Expense {
    _id: string;
    description: string;
    amount: number;
    createdAt: Date | string;
    budgetId: string
}

export default async function expensesScreen({ params }: any) {
    const budgetData = await getOneBudget(params?.id)

    let user;
    let userInfo;

    try {
        user = await currentUser()
        console.log(user?.id)

        if (!user) {
            console.log("no user from clerk")
        }
        else {
            userInfo = await fetchUser(user?.id)
        }
    } catch (error: any) {
        console.error('Error fetching user data expenses Screen:', error)
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

    const transformedExpenses = budget?.expenses.map((expense: Expense) => ({
        id: expense?._id.toString(),
        description: expense?.description,
        amount: expense?.amount,
        createdAt: expense?.createdAt,
        budgetId: budgetData?._id.toString()
    }));

    return (
        <div className="p-2 sm:p-8 mb-4">
            <ExpensesHeader
                budgetId={budget?.id}
                description={budget?.description}
                amount={budget?.amount}
                from={budget?.from}
                to={budget?.to}
                expenses={transformedExpenses}
            />
            <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:gap-5">
                {budget ? (
                    <BudgetItem budget={budget} />
                ) : (<div
                    className="h-[150px] w-full bg-slate-200 
                    rounded-lg animate-pulse"
                >
                </div>)}
                <AddExpense budgetId={budget?.id} userId={userData?.id} />
            </div>

            <div className="mt-8">
                <h1 className="text-2xl font-bold">Expenses of this budget</h1>
                <ExpensesList expenses={transformedExpenses} />
            </div>
        </div>
    )
}