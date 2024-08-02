import React, { useState } from 'react'
import BudgetList from './_components/BudgetList'
import { currentUser } from '@clerk/nextjs/server';
import { fetchUser } from '../../../../../lib/actions/user.actions';


async function Budgets() {

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
        console.error('Error fetching user data budg:', error)
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
        <div className='p-3 sm:p-8'>
            <h1 className='font-bold text-3xl'>My Budgets</h1>
            <BudgetList userData={userData} />
        </div>
    )
}

export default Budgets

