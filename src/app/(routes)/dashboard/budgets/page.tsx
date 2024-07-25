import React, { useState } from 'react'
import CreateBudget from './_components/CreateBudget'
import BudgetList from './_components/BudgetList'


function Budgets() {

    return (
        <div className='p-8'>
            <h1 className='font-bold text-3xl'>My Budgets</h1>
            <BudgetList />
        </div>
    )
}

export default Budgets
