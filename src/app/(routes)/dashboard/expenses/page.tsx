import { currentUser } from '@clerk/nextjs/server';
import React from 'react'
import { fetchUser } from '../../../../../lib/actions/user.actions';
import { getAllExpenses } from '../../../../../lib/actions/expense.actions';

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
    console.error('Error fetching user data dash:', error)
  }

  const expensesList = await getAllExpenses(userInfo?._id)

  console.log("exxx", expensesList)

  return (
    <div>
      {expensesList?.map((item, index: number) => (
        <div key={index}>
          {item.description}
        </div>
      ))}
    </div>
  )
}

export default Expenses
