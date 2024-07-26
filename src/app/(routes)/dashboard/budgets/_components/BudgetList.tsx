import { fetchUser } from "../../../../../../lib/actions/user.actions";
import CreateBudget from "./CreateBudget";
import { currentUser } from "@clerk/nextjs/server";


export default async function BudgetList() {

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
            // console.log("user infoo", userInfo)
        }
    } catch (error: any) {
        console.error('Error fetching user data:', error)
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

    return (
        <div className="mt-6">
            <CreateBudget userData={userData} />
        </div>
    )
}