'use client'

import React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useUser, UserButton } from "@clerk/nextjs"
import Link from "next/link"

function Header() {
    const { user, isSignedIn } = useUser()

    return (
        <div className=" p-5 flex justify-between items-center shadow-sm">
            <div className="flex justify-center items-center">
                <Image src={'/chart-donut.svg'} alt="logo" width={40} height={25} />
                <span className="text-indigo-800 font-bold text-2xl">FinanSmart</span>
            </div>
            {isSignedIn
                ? (<>
                    <Link href='/dashboard'>
                        <Button
                            variant="outline"
                            className="rounded-full font-bold">
                            Dashboard
                        </Button>
                    </Link>
                    <UserButton />
                </>)
                : <div className="flex gap-3 items-center">
                    <Link href='/dashboard'>
                        <Button
                            variant="outline"
                            className="rounded-full font-bold">
                            Dashboard
                        </Button>
                    </Link>
                    <Link href='/dashboard'>
                        <Button className="bg-blue-800 border rounded-full font-bold">
                            Get Started
                        </Button>
                    </Link>
                </div >
            }
        </div >
    )
}

export default Header;