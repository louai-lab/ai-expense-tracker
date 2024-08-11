'use client'
import { UserButton } from "@clerk/nextjs";
import { CircleDollarSign, LayoutGrid, PiggyBank, ReceiptText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
    const pathname = usePathname()

    const menuList = [
        {
            id: 1,
            name: "Dashboard",
            icon: LayoutGrid,
            path: "/dashboard",
        },
        // {
        //     id: 2,
        //     name: "Incomes",
        //     icon: CircleDollarSign,
        //     path: "/dashboard/incomes",
        // },
        {
            id: 2,
            name: "Budgets",
            icon: PiggyBank,
            path: "/dashboard/budgets",
        },
        {
            id: 3,
            name: "Expenses",
            icon: ReceiptText,
            path: "/dashboard/expenses",
        },
    ]


    return (
        <div className="w-64 h-screen p-5 border-r-2">

            <div className="flex items-center">
                <Image src={'/chart-donut.svg'} alt="logo" width={40} height={25} />
                <span className="text-indigo-800 font-bold text-2xl">FinanSmart</span>
            </div>

            <div className="flex flex-col gap-3 mt-5">
                {menuList.map((menu, index) => (
                    <Link href={menu.path} key={index}>
                        <h2 className={`link ${pathname === `${menu.path}`
                            ? "text-blue-700 bg-blue-200"
                            : "text-gray-500"} 
                        flex gap-2  font-medium
                            mb-2 cursor-pointer rounded-full p-4 hover:text-blue-700 hover:bg-blue-200 transition duration-300`}
                        >
                            <menu.icon />
                            {menu.name}
                        </h2>
                    </Link>
                ))}
            </div>

            <div className="fixed bottom-10 p-5 flex gap-2 items-center">
                <UserButton />
                Profile
            </div>
        </div>
    )
}