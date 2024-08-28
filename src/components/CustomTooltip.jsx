// src/CustomTooltip.js
import React from 'react';
import '../styles/CustomTooltip.css';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const fullDate = new Date(payload[0].payload.tooltipDate);
    const date = fullDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const time = fullDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const price = payload[0].value;

    return (
      <div className="custom-tooltip">
        <p className="label">{date}</p>
        <p className="time">{time}</p>
        <p className="price">${price.toLocaleString()}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;