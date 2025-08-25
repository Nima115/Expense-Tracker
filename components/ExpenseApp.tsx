"use client";
import { useState } from "react";

interface Expense {
  id: number;
  title: string;
  amount: number;
}

export default function ExpenseApp() {
  const [justAddedId, setJustAddedId] = useState<number | null>(null);
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
    setJustAddedId(newExpense.id);
    setTitle("");
    setAmount("");
    setTimeout(() => setJustAddedId(null), 700);
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-2 py-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 tracking-tight">Expense Tracker</h1>

        <form
          className="flex flex-col sm:flex-row gap-3 mb-6"
          onSubmit={e => { e.preventDefault(); addExpense(); }}
          aria-label="Lägg till utgift"
        >
          <input
            type="text"
            placeholder="Titel på utgift"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-gray-50 placeholder-gray-400 text-base"
            aria-label="Titel"
            required
          />
          <input
            type="number"
            placeholder="Belopp (kr)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-28 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-gray-50 placeholder-gray-400 text-base"
            aria-label="Belopp"
            min="0"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded font-semibold shadow hover:bg-blue-700 transition text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Lägg till
          </button>
        </form>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700 font-semibold">Utgifter</span>
            <span className="text-gray-500 text-sm">Totalt: <span className="font-bold text-blue-700">{total} kr</span></span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-3 text-left font-medium text-gray-600">Titel</th>
                  <th className="py-2 px-3 text-right font-medium text-gray-600">Belopp</th>
                </tr>
              </thead>
              <tbody>
                {expenses.length === 0 && (
                  <tr>
                    <td colSpan={2} className="text-center text-gray-400 py-6">Inga utgifter ännu</td>
                  </tr>
                )}
                {expenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className={`border-b last:border-b-0 transition-all duration-700 ${
                      expense.id === justAddedId
                        ? 'bg-blue-50 scale-105 opacity-100'
                        : 'opacity-100'
                    }`}
                    style={{
                      transform: expense.id === justAddedId ? 'scale(1.05)' : 'scale(1)',
                      opacity: expense.id === justAddedId ? 1 : 1,
                    }}
                  >
                    <td className="py-2 px-3 text-gray-800">{expense.title}</td>
                    <td className="py-2 px-3 text-right font-bold text-blue-600">{expense.amount} kr</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mt-8">
          <span className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-bold shadow">
            Totalt: {total} kr
          </span>
        </div>
      </div>
    </div>
  );
}
