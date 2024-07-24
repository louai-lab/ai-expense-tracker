import { UserButton } from "@clerk/nextjs"

export default function DashboardHeader() {

    return (
        <div className="flex justify-end border-b-2 p-4">
            <UserButton afterSwitchSessionUrl="/" />
        </div>
    )
}