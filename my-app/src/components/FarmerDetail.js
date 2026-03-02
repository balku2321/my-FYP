import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FarmerContext } from './FarmerContext';
import './FarmerDetail.css';

const FarmerDetail = () => {
  const { id } = useParams(); // Get the farmer ID from the URL
  const { farmers } = useContext(FarmerContext); // Get farmers data from context
  const [farmer, setFarmer] = useState(null);

  useEffect(() => {
    // Fetch farmer data based on the ID from the URL
    const fetchedFarmer = farmers.find(f => f.id === parseInt(id));
    setFarmer(fetchedFarmer);
  }, [id, farmers]);

  if (!farmer) {
    return <p>Farmer not found.</p>;
  }

  return (
    <div className="farmer-detail">
      <img src={farmer.imageUrl} alt={farmer.name} className="farmer-image" />
      <h1 className="farmer-name">{farmer.name}</h1>
      <p className="farmer-location"><strong>Location:</strong> {farmer.location}</p>
      <p className="farmer-description"><strong>Description:</strong> {farmer.description}</p>
      <p className="farmer-farmType"><strong>Farm Type:</strong> {farmer.farmType}</p>
      <p className="farmer-experience"><strong>Experience:</strong> {farmer.experience}</p>
    </div>
  );
};

export default FarmerDetail;
