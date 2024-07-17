import React, { useState } from 'react';
import './App.css';

function App() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('');

  const addTransaction = (type) => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0 || description.trim() === '') {
      setError('Please enter a valid amount and description.');
      return;
    }
    setError('');

    const transaction = {
      id: Math.random().toString(),
      description,
      amount: value,
      type,
    };

    setTransactions([...transactions, transaction]);

    if (type === 'Income') {
      setBalance(balance + value);
    } else {
      setBalance(balance - value);
    }

    setAmount('');
    setDescription('');
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
    const deletedTransaction = transactions.find(transaction => transaction.id === id);

    if (deletedTransaction.type === 'Income') {
      setBalance(balance - deletedTransaction.amount);
    } else {
      setBalance(balance + deletedTransaction.amount);
    }

    setTransactions(updatedTransactions);
  };

  const renderTransaction = (transaction) => (
    <div className="transaction" key={transaction.id}>
      <span className="description">{transaction.description}</span>
      <span className={`amount ${transaction.type === 'Income' ? 'income' : 'expense'}`}>
        {transaction.type === 'Income' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
      </span>
      <button onClick={() => deleteTransaction(transaction.id)} className="delete-button">X</button>
    </div>
  );

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <h2>Balance: ₹{balance.toFixed(2)}</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="input"
      />
      <div className="button-container">
        <button onClick={() => addTransaction('Income')} className="button">Add Income</button>
        <button onClick={() => addTransaction('Expense')} className="button">Add Expense</button>
      </div>
      <div className="transaction-list">
        {transactions.map(renderTransaction)}
      </div>
    </div>
  );
}

export default App;
