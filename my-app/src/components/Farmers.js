import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FarmerContext } from './FarmerContext';
import './Farmers.css';

const Farmers = () => {
  const { farmers } = useContext(FarmerContext); // Get farmers from context
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFarmers, setFilteredFarmers] = useState(farmers);

  useEffect(() => {
    const filtered = farmers.filter((farmer) =>
      farmer.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFarmers(filtered);
  }, [searchQuery, farmers]);

  return (
    <div className="farmers-page">
      <h1>Meet Our Farmers</h1>

      {/* Create Farmer Profile Button */}
      <Link to="/create-farmer-profile">
        <button className="create-farmer-btn">Create Farmer Profile</button>
      </Link>

      <input
        type="text"
        placeholder="Search farmers..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="farmers-list">
        {filteredFarmers.map((farmer) => (
          <div className="farmer-card" key={farmer.id}>
            <img src={farmer.imageUrl} alt={farmer.name} />
            <h2>{farmer.name}</h2>
            <p>{farmer.location}</p>
            {/* Corrected JSX syntax for Link */}
            <Link to={`/farmers/${farmer.id}`}>
              <button>View Profile</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Farmers;
