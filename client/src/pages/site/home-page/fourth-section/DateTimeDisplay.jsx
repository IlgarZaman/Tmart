import React from 'react';

const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <div className={isDanger ? 'countdown danger' : 'countdown'}>
      <span>{value}</span>
      <p>{type}</p>
    </div>
  );
};

export default DateTimeDisplay;