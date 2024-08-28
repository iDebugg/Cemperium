import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/RecentTransactions.css'; // Ensure you have this CSS file

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');

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

    // Interval to refresh data periodically
    const interval = setInterval(() => {
      fetchTransactions();
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Filter transactions based on selected status
  const filteredTransactions = transactions.filter((transaction) => {
    const statusMatch = selectedStatus === 'All' || transaction.status.toLowerCase() === selectedStatus.toLowerCase();
    return statusMatch;
  });

  return (
    <div className="recent-transactions">
      <h2>Recent Transactions</h2>
      <div className="filter-container">
        <button
          className={`filter-button ${selectedStatus === 'All' ? 'active' : ''}`}
          onClick={() => setSelectedStatus('All')}
        >
          All
        </button>
        <select
          id="status"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="filter-dropdown"
        >
          <option value="Successful">Successful</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>
      <div className="scroll-contnt">
      <div className="transaction-list">
        {filteredTransactions.map((transaction, index) => (
          <div key={index} className="transaction-item">
            <div className="transaction-info">
              <div className="transaction-type">
                {transaction.type} {transaction.asset}
              </div>
              <div className="transaction-amount">
                {transaction.amount} {transaction.asset}
              </div>
            </div>
            <div className="transaction-date">{new Date(transaction.date).toLocaleString()}</div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default RecentTransactions;
