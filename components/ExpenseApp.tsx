'use client';
import { useState } from "react";

interface Expense {
  id: number;
  title: string;
  amount: number;
}

export default function ExpenseApp() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const addExpense = () => {
    if (!title || !amount) return;
    const newExpense: Expense = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
    };
    setExpenses([newExpense, ...expenses]);
    setTitle("");
    setAmount("");
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Expense Tracker</h1>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 p-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Belopp"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-28 p-2 border rounded-lg"
        />
        <button
          onClick={addExpense}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Lägg till
        </button>
      </div>

      <ul className="space-y-2 mb-4 max-h-64 overflow-y-auto">
        {expenses.map((expense) => (
          <li
            key={expense.id}
            className="flex justify-between p-2 bg-gray-100 rounded-lg"
          >
            <span>{expense.title}</span>
            <span className="font-semibold">{expense.amount} kr</span>
          </li>
        ))}
      </ul>

      <div className="text-right font-bold text-lg">
        Totalt: {total} kr
      </div>
    </div>
  );
}
