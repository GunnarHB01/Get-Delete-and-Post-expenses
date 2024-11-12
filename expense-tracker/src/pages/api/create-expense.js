import { addExpense, getExpenses } from './data';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, cost } = req.body;
    const newExpense = {
      id: getExpenses().length + 1,
      name,
      cost: parseFloat(cost),
    };
    addExpense(newExpense);
    res.status(201).json(newExpense);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
