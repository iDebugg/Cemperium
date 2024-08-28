// TransactionHistory.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/TransactionHistory.css'; // Ensure you have this CSS file

const TransactionHistory = ({ selectedType, selectedStatus }) => {
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions from the API
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_HISTORIES_API_URL}`);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();

    // interval to refresh data periodically
    const interval = setInterval(() => {
      fetchTransactions();
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Filter transactions based on selected type and status
  const filteredTransactions = transactions.filter((transaction) => {
    const typeMatch = selectedType === 'All' || transaction.type === selectedType;
    const statusMatch = selectedStatus === 'All' || transaction.status.toLowerCase() === selectedStatus.toLowerCase();
    return typeMatch && statusMatch;
  });

  return (
    <div className="transaction-history">
      <h2>Activities</h2>
      <div className="transaction-container">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Asset</th>
              <th>Amount</th>
              <th>USD</th>
              <th>Status</th>
              <th>Date</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.type}</td>
                <td>{transaction.asset}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.usd}</td>
                <td className={`status ${transaction.status.toLowerCase()}`}>{transaction.status}</td>
                <td>{new Date(transaction.date).toLocaleString()}</td>
                <td>{transaction.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
