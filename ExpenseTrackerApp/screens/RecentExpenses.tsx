import React, { useContext } from "react";
import { Text } from "react-native"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";


const RecentExpenses = () => {
    const expensesCtx = useContext(ExpensesContext);

    const recentExpenses = expensesCtx.expenses.filter( (expense: any) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return expense.date > date7DaysAgo && expense.date <= today;
    })
    
    return (
        <ExpensesOutput expenses={recentExpenses} periodName="Last 7 days" fallbackText="No expenses from last 7 days" />
    );
}

export default RecentExpenses;