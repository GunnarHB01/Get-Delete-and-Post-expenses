export let expenses = [];

export function addExpense(expense) {
  expenses.push(expense);
}

export function deleteExpenseById(id) {
  expenses = expenses.filter((expense) => expense.id !== id);
}

export function getExpenses() {
  return expenses;
}
