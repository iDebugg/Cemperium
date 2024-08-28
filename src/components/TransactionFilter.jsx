// TransactionFilter.js

import React from 'react';
import PropTypes from 'prop-types';
import '../styles/TransactionFilter.css'; // Ensure you have this CSS file

const TransactionFilter = ({ selectedType, setSelectedType, selectedStatus, setSelectedStatus }) => {
  const types = ['All', 'Withdrawal', 'Deposit', 'Buy', 'Sell'];
  const statuses = ['All', 'Successful', 'Failed', 'Processing'];

  return (
    <div className="filters">
        <h4>Filters</h4>
        <h5>Type</h5>
      <div className="filter-group">
        {types.map((type) => (
          <button
            key={type}
            className={selectedType === type ? 'active' : ''}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <h5>Status</h5>
      <div className="filter-group">
    
        {statuses.map((status) => (
          <button
            key={status}
            className={selectedStatus === status ? 'active' : ''}
            onClick={() => setSelectedStatus(status)}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};

TransactionFilter.propTypes = {
  selectedType: PropTypes.string.isRequired,
  setSelectedType: PropTypes.func.isRequired,
  selectedStatus: PropTypes.string.isRequired,
  setSelectedStatus: PropTypes.func.isRequired,
};

export default TransactionFilter;
