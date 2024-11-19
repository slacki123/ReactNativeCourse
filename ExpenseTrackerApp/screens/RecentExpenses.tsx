import React, { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverloay";


const RecentExpenses = () => {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState('');
    const expensesCtx = useContext(ExpensesContext); // local db

    useEffect(() =>{
        // useEffect should not be async, so we should be creating an async function inside the function...
        async function getExpenses(){
            setIsFetching(true);
            try{
                const expenses = await fetchExpenses();
                expensesCtx.setExpenses(expenses);
            } catch (error){
                setError('Could not fetch expenses!');
            }
            setIsFetching(false);
        }
        getExpenses();
    }, []);

    if(error && !isFetching){
        return <ErrorOverlay message={error} onPress={() => {setError(''); setIsFetching(true); }}/>
    }

    if(isFetching) {
        return <LoadingOverlay />
    }

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