import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { fetchUser } from "../../../../lib/actions/user.actions";
import { Sparkles } from "lucide-react";
import CardInfo from "./_components/CardInfo";
import { PiggyBank, ReceiptText, Wallet } from "lucide-react";
import { getAllBudgets } from "../../../../lib/actions/budget.actions";
import { BarChartsDashboard } from "./_components/BarChartsDashboard";

export default async function Content() {

    console.log("Dashboard page launching")

    let user;
    let userInfo;

    try {
        console.log("before clerk")
        user = await currentUser()
        console.log("after clerk!", user?.id)

        if (!user) {
            console.log("no user from clerk")
        }
        else {
            userInfo = await fetchUser(user?.id)
            console.log(userInfo?._id)
        }
    } catch (error: any) {
        console.error('Error fetching user data dash:', error)
    }

    const budgetList = await getAllBudgets(userInfo?._id)

    const chartData = budgetList
        .slice(0, 5)
        .map(budget => ({
            from: budget.from,
            to: budget.to,
            amount: budget.amount,
            spend: budget.spend,
        }));


    return (
        <div className="p-8 mb-5">
            <div>
                <h1 className="text-4xl font-bold flex">
                    Hi, {userInfo
                        ? `${userInfo?.firstName} ${userInfo?.lastName}`
                        : <div className='w-[150px] bg-slate-200 rounded-lg
                        h-[50px] animate-pulse'>

                        </div>} 👋
                </h1>
                <p className="mt-2 text-base text-gray-500">
                    Here's what happening with your money, let's Manage your expenses
                </p>
            </div>

            <div className="border-2 rounded-lg py-8 px-6 mt-4">
                <div className="flex gap-2 items-center">
                    <p className="text-md">Finan Smart AI</p>
                    <Sparkles
                        className="rounded-full text-white w-10 h-10 p-2
                         bg-gradient-to-r
                         from-pink-500
                         via-red-500
                         to-yellow-500
                         background-animate"
                    />
                </div>
                <p className="pt-4">Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a type
                    specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum passages,
                    and more recently with desktop publishing software like Aldus
                    PageMaker including versions of Lorem Ipsum.
                </p>
                {/* <p>
                    {advice}
                </p> */}
            </div>

            <div className="flex flex-col gap-4 items-center justify-between mt-4 lg:flex lg:flex-row ">
                <CardInfo image={PiggyBank} caption="total Budget" total={userInfo?.totalBudgetAmount} />
                <CardInfo image={ReceiptText} caption="total Spend" total={userInfo?.totalSpendAmount} />
                <CardInfo image={Wallet} caption="No. Of Budget" total={userInfo?.totalBudgetLength} />
            </div>

            <div className="mt-5 mb-5">
                <BarChartsDashboard data={chartData} />
            </div>
        </div>
    )

}