import React, { useEffect, useState } from 'react';
import { getExpenses, createExpense, deleteExpense } from '../services/expenseService';

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [cost, setCost] = useState('');

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    const data = await getExpenses();
    console.log("Loaded expenses:", data);
    setExpenses(data);
  };
  
  const handleAddExpense = async () => {
    if (!expenseName || !cost) {
      console.log("Please provide both name and cost");
      return;
    }
  
    console.log("Adding expense:", { name: expenseName, cost: parseFloat(cost) });
    
    await createExpense({ name: expenseName, cost: parseFloat(cost) });
  
    setExpenseName('');
    setCost('');
  
    console.log("Reloading expenses after adding");
    loadExpenses();
  };  

  const handleDeleteExpense = async (id) => {
    await deleteExpense(id);
    loadExpenses();
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">Expense Tracker</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Expense</h2>
        <input
          type="text"
          placeholder="Expense Name"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
          className="border border-gray-300 rounded-md w-full p-2 mb-4 text-gray-700 focus:outline-none focus:border-blue-500"
        />
        <input
          type="number"
          placeholder="Cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          className="border border-gray-300 rounded-md w-full p-2 mb-4 text-gray-700 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleAddExpense}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Expense
        </button>
      </div>
      
      <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">Your Expenses</h2>
      <ul className="w-full max-w-md">
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <li
              key={expense.id}
              className="flex justify-between items-center bg-white p-4 rounded-md shadow-md mb-3"
            >
              <span className="text-gray-700">{expense.name} - ${expense.cost.toFixed(2)}</span>
              <button
                onClick={() => handleDeleteExpense(expense.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <li className="text-gray-500 text-center">No expenses yet</li>
        )}
      </ul>
    </div>
  );
}
