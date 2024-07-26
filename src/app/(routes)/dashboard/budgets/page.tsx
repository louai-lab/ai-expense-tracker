import React, { useState } from 'react'
import BudgetList from './_components/BudgetList'


async function Budgets() {

    return (
        <div className='p-8'>
            <h1 className='font-bold text-3xl'>My Budgets</h1>
            <BudgetList />
        </div>
    )
}

export default Budgets
