import { currentUser } from '@clerk/nextjs/server';
import React from 'react'
import { fetchUser } from '../../../../../lib/actions/user.actions';
import { getAllExpenses } from '../../../../../lib/actions/expense.actions';
import Link from 'next/link';

async function Expenses() {

  console.log("Expenses page launching")

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
    console.error('Error fetching user data expen:', error)
  }

  const expensesList = await getAllExpenses(userInfo?._id)

  // console.log("exxx", expensesList)

  return (
    <div className='p-3 sm:p-8 mb-4'>
      <h2 className='font-bold text-3xl'>My Expenses</h2>
      <div className='flex flex-wrap gap-4 mt-4'>
        {expensesList?.map((item, index: number) => (
          <Link href={`/dashboard/expenses/${item?.budgetId?._id}`} key={index}>
            <div className='flex flex-col gap-4 border rounded-2xl p-3 cursor-pointer w-fit shadow-md'>
              <div className='flex justify-between'>
                <p className="font-bold text-xl">{item?.description}</p>
                <p className="text-blue-600 font-bold">{item?.amount}</p>
              </div>
              <p>{item?.budgetId?.description}</p>
              <div className='flex gap-4'>
                <p>{new Date(item?.budgetId?.from).toLocaleDateString()}</p>
                <p>{new Date(item?.budgetId?.to).toLocaleDateString()}</p>
              </div>
            </div></Link>
        ))}
      </div>
    </div>
  )
}

export default Expenses
