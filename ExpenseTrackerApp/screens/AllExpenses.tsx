import React, { useContext } from "react";
import { Text } from "react-native"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";


const AllExpenses = () => {
    const expensesCtx = useContext(ExpensesContext);

    return (
        <ExpensesOutput expenses={expensesCtx.expenses} periodName="All expenses" fallbackText="No registered expenses found" />
    );
}

export default AllExpenses;