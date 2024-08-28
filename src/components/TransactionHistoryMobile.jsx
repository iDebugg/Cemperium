import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/TransactionHistoryMobile.css'; // Ensure you have this CSS file

const TransactionHistoryMobile = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [filterOpen, setFilterOpen] = useState(false);

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
    <div className="transaction-history-mobile">
      <div style={{display:"flex", justifyContent:"space-between"}}>
      <h2>Activities</h2>
      <div className="filter-button-mobile" onClick={() => setFilterOpen(!filterOpen)}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-filter"
    viewBox="0 0 16 16"
    style={{ marginRight: '5px' }}
  >
    <path d="M6 10.5a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2.586l2.854-2.853A.5.5 0 0 0 12.5 4h-9a.5.5 0 0 0-.354.854L6 7.914v2.586z"/>
    <path d="M3.5 1a.5.5 0 0 0-.354.854L6 5.707v2.586a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V5.707l2.854-2.853A.5.5 0 0 0 12.5 2h-9a.5.5 0 0 0-.354.146z"/>
  </svg>
  Filter
</div>
      </div>
     
      {filterOpen && (
        <div className="filter-dropdown-mobile">
          <div className="filter-group-mobile">
            <h3>Type</h3>
            <button onClick={() => setSelectedType('All')} className={selectedType === 'All' ? 'active-mobile' : ''}>All</button>
            <button onClick={() => setSelectedType('Withdrawal')} className={selectedType === 'Withdrawal' ? 'active-mobile' : ''}>Withdrawal</button>
            <button onClick={() => setSelectedType('Deposit')} className={selectedType === 'Deposit' ? 'active-mobile' : ''}>Deposit</button>
            <button onClick={() => setSelectedType('Buy')} className={selectedType === 'Buy' ? 'active-mobile' : ''}>Buy</button>
            <button onClick={() => setSelectedType('Sell')} className={selectedType === 'Sell' ? 'active-mobile' : ''}>Sell</button>
          </div>
          <div className="filter-group-mobile">
            <h3>Status</h3>
            <button onClick={() => setSelectedStatus('All')} className={selectedStatus === 'All' ? 'active-mobile' : ''}>All</button>
            <button onClick={() => setSelectedStatus('Successful')} className={selectedStatus === 'Successful' ? 'active-mobile' : ''}>Successful</button>
            <button onClick={() => setSelectedStatus('Failed')} className={selectedStatus === 'Failed' ? 'active-mobile' : ''}>Failed</button>
            <button onClick={() => setSelectedStatus('Processing')} className={selectedStatus === 'Processing' ? 'active-mobile' : ''}>Processing</button>
          </div>
        </div>
      )}

      <div className="transaction-container-mobile">
        
      <table>
         
          <tbody>
            
          {filteredTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.type} <br />{new Date(transaction.date).toLocaleString()}</td>
                <td className={`status ${transaction.status.toLowerCase()}`}>{transaction.status}</td>
                <td>To {transaction.address}</td>
                <td>{transaction.amount} {transaction.asset} <br />${transaction.usd}</td>
              
              </tr>
              ))}
        
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default TransactionHistoryMobile;
