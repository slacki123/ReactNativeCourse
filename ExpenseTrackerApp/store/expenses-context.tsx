import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }: any) => {},
  deleteExpense: (id: string) => {},
  updateExpense: (id: string, { description, amount, date }: any) => {},
  setExpenses: (expenses: any) => {}
});

// always return a new state value htrough reducer
function expensesReducer(state: any, action: any) {
  switch (action.type) {
    case "ADD":
      return [{ ...action.payload }, ...state];
    case 'SET':
      return action.payload.reverse();
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense: any) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updateExpenses = [...state];
      updateExpenses[updatableExpenseIndex] = updatedItem;
      return updateExpenses;
    case "DELETE":
      return state.filter((expense: any) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }: any) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData: any) {
    dispatch({ type: "ADD", payload: expenseData }); // check the type from reducer
  }

  function setExpenses(expenses: any){
    dispatch({type: 'SET', payload: expenses })
  }

  function deleteExpense(id: string) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id: string, expenseData: any) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  // why can't we just use a global variable like that, and instead we need this reducer??...
  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    setExpenses: setExpenses,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
