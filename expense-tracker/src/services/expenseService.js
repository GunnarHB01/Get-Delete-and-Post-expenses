import axios from 'axios';

const API_BASE_URL = '/api';

export const getExpenses = async () => {
    const response = await axios.get(`${API_BASE_URL}/expenses`);
    return response.data;
  };
  
  export const createExpense = async (expense) => {
    console.log("Creating expense:", expense);
    const response = await axios.post(`${API_BASE_URL}/create-expense`, expense, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("Response:", response.data);
    return response.data;
  };  
  
  export const deleteExpense = async (id) => {
    await axios.delete(`${API_BASE_URL}/expense/${id}`);
  };
  