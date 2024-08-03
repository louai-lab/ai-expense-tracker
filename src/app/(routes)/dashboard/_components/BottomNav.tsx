'use client'

import { LayoutGrid, PiggyBank, ReceiptText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {

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
        <div className="flex justify-evenly pt-2 pr-2 fixed bottom-0 w-full z-10 bg-white bg-opacity-50 backdrop-blur-md border-t-2 shadow-sm">
            {menuList.map((menu, index) => (
                <Link href={menu.path} key={index}>
                    <h2 className={`link ${pathname === `${menu.path}`
                        ? "text-blue-700 bg-blue-200"
                        : "text-gray-500"} 
                        flex gap-2  font-medium
                            mb-2 cursor-pointer rounded-full p-4 hover:text-blue-700 hover:bg-blue-200 transition duration-300`}
                    >
                        <menu.icon />
                        <span className="hidden sm:block">{menu.name}</span>
                    </h2>
                </Link>
            ))}
        </div>
    )
}