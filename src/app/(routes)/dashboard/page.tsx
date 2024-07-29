import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { fetchUser } from "../../../../lib/actions/user.actions";
import { Sparkles } from "lucide-react";

export default async function Content() {

    let user;
    let userInfo;
    let loading = true;
    let noUser = false

    try {
        user = await currentUser()

        if (!user) {
            noUser = true
        }
        else {
            userInfo = await fetchUser(user?.id)
            // console.log(userInfo)
        }
    } catch (error: any) {
        console.error('Error fetching user data dash:', error)
    } finally {
        loading = false
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (noUser) {
        return <div>No user found</div>;
    }

    return (
        <div className="p-8">
            <div>
                <h1 className="text-4xl font-bold">
                    Hi, {userInfo?.firstName}{" "}{userInfo?.lastName} 👋
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
                    PageMaker including versions of Lorem Ipsum.</p>
            </div>
        </div>
    )

}