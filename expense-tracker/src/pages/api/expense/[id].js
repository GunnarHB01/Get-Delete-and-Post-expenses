import { deleteExpenseById } from '../data';

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    deleteExpenseById(parseInt(id, 10));
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
