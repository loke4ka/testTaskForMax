import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); 
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTransactions(page);
  }, [page]);

  const fetchTransactions = async (page) => {
    try {
      const response = await axios.get(`http://localhost:3000/transactions?page=${page}&limit=${limit}`);
      
      setTransactions(response.data.transactions || []);
      setTotalPages(Math.ceil(response.data.total / limit) || 1); 

      console.log('Transactions fetched:', response.data.transactions);
      
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div>
    <h2 className="my-4">Transaction List</h2>
    <ul className="list-group w-50 mx-auto">
      {transactions.map((transaction) => (
        <li key={transaction.id} className="list-group-item">
          <strong>{transaction.dateTime}</strong>: {transaction.author} spent {transaction.sum} on {transaction.category}. Comment: {transaction.comment}
        </li>
      ))}
    </ul>
    <div className="d-flex justify-content-center align-items-center mt-4">
      <button onClick={handlePreviousPage} disabled={page === 1} className="btn btn-secondary">
        Previous
      </button>
      <span>Page {page} of {totalPages}</span>
      <button onClick={handleNextPage} disabled={page === totalPages} className="btn btn-secondary">
        Next
      </button>
    </div>
  </div>  
  );
};

export default TransactionList;
