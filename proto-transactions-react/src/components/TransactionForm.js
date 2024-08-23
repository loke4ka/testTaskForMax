import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = () => {
  const [transaction, setTransaction] = useState({
    dateTime: '',
    author: '',
    sum: '',
    category: '',
    comment: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/transactions', transaction);
      console.log('Transaction added:', response.data);
      setTransaction({
        dateTime: '',
        author: '',
        sum: '',
        category: '',
        comment: ''
      });

      window.location.reload();
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
  <div className="form-group mb-2">
    <label>Date:</label>
    <input
      type="datetime-local"
      name="dateTime"
      value={transaction.dateTime}
      onChange={handleChange}
      required
      className="form-control"
    />
  </div>
  <div className="form-group mb-2">
    <label>Author:</label>
    <input
      type="text"
      name="author"
      value={transaction.author}
      onChange={handleChange}
      required
      className="form-control"
    />
  </div>
  <div className="form-group mb-2">
    <label>Sum:</label>
    <input
      type="number"
      name="sum"
      value={transaction.sum}
      onChange={handleChange}
      required
      className="form-control"
    />
  </div>
  <div className="form-group mb-2">
    <label>Category:</label>
    <select
      name="category"
      value={transaction.category}
      onChange={handleChange}
      required
      className="form-control"
    >
      <option value="">Select category</option>
      <option value="Groceries">Groceries</option>
      <option value="Transport">Transport</option>
      <option value="Utilities">Utilities</option>
    </select>
  </div>
  <div className="form-group mb-2">
    <label>Comment:</label>
    <input
      type="text"
      name="comment"
      value={transaction.comment}
      onChange={handleChange}
      className="form-control"
    />
  </div>
  <button type="submit" className="btn btn-primary mt-3">Add Transaction</button>
</form>

  );
};

export default TransactionForm;
