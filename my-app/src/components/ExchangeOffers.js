import React, { useState, useEffect } from 'react';
import './ExchangeOffers.css';

const ExchangeOffers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    // Fetch the exchange offers from a backend or local data
    const fetchOffers = async () => {
      try {
        const response = await fetch('/exchangeOffers.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setOffers(data);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    fetchOffers();
  }, []);

  const handleAccept = (id) => {
    // Logic to accept the offer (e.g., update in backend)
    console.log(`Accepted offer with ID: ${id}`);
  };

  const handleReject = (id) => {
    // Logic to reject the offer (e.g., update in backend)
    console.log(`Rejected offer with ID: ${id}`);
  };

  return (
    <div className="exchange-offers">
      <h1>Exchange Offers</h1>
      {offers.length === 0 ? (
        <p>No offers available.</p>
      ) : (
        <ul>
          {offers.map(offer => (
            <li key={offer.id} className="offer">
              <h2>{offer.productToExchange}</h2>
              <p>Requested Product: {offer.requestedProduct}</p>
              <p>Details: {offer.details}</p>
              <button onClick={() => handleAccept(offer.id)}>Accept</button>
              <button onClick={() => handleReject(offer.id)}>Reject</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExchangeOffers;
