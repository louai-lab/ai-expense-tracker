import React, { useState } from 'react'
import BudgetList from './_components/BudgetList'
import { currentUser } from '@clerk/nextjs/server';
import { fetchUser } from '../../../../../lib/actions/user.actions';


async function Budgets() {

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
        <div className='p-8'>
            <h1 className='font-bold text-3xl'>My Budgets</h1>
            <BudgetList userData={userData} />
        </div>
    )
}

export default Budgets
