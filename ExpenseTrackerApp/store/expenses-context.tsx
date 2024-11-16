import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "An Apple",
    amount: 2.99,
    date: new Date("2021-10-19"),
  },
  {
    id: "e3",
    description: "Some Book",
    amount: 17.88,
    date: new Date("2022-12-22"),
  },
  {
    id: "e4",
    description: "Laptop",
    amount: 172.88,
    date: new Date("2020-12-22"),
  },
  {
    id: "e5",
    description: "Some Book",
    amount: 17.88,
    date: new Date("2022-12-22"),
  },
  {
    id: "e6",
    description: "Laptop",
    amount: 172.88,
    date: new Date("2020-12-22"),
  },
  {
    id: "e7",
    description: "Some Book",
    amount: 17.88,
    date: new Date("2022-12-22"),
  },
  {
    id: "e8",
    description: "Laptop",
    amount: 172.88,
    date: new Date("2020-12-22"),
  },
  {
    id: "e9",
    description: "Some Book",
    amount: 17.88,
    date: new Date("2022-12-22"),
  },
  {
    id: "e10",
    description: "Laptop",
    amount: 172.88,
    date: new Date("2020-12-22"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }: any) => {},
  deleteExpense: (id: string) => {},
  updateExpense: (id: string, { description, amount, date }: any) => {},
});

// always return a new state value htrough reducer
function expensesReducer(state: any, action: any) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
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
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData: any) {
    dispatch({ type: "ADD", payload: expenseData }); // check the type from reducer
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
