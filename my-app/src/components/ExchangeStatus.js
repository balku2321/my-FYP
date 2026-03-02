import React, { useState, useEffect } from 'react';
import './ExchangeStatus.css';

const ExchangeStatus = () => {
  const [status, setStatus] = useState([]);

  useEffect(() => {
    // Fetch the exchange status from a backend or local data
    const fetchStatus = async () => {
      try {
        const response = await fetch('/exchangeStatus.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setStatus(data);
      } catch (error) {
        console.error('Error fetching status:', error);
      }
    };

    fetchStatus();
  }, []);

  return (
    <div className="exchange-status">
      <h1>Exchange Status</h1>
      {status.length === 0 ? (
        <p>No exchange status available.</p>
      ) : (
        <ul>
          {status.map(entry => (
            <li key={entry.id} className="status-entry">
              <h2>Exchange ID: {entry.id}</h2>
              <p>Status: {entry.status}</p>
              <p>Details: {entry.details}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExchangeStatus;
