import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/products?query=${searchQuery}&location=${location}`);
  };

  return (
    <div className="hero-section">
      <div className="hero-content">
        
        <h1>Connecting You to Local Farmers and Fresh Produce</h1>
        <p>Discover and Purchase Fresh, Sustainable Food</p>

        <div className="search-fields">
          <input
            type="text"
            placeholder="I'm looking for..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="near-text">near</span>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button onClick={handleSearch} className="search-btn">
          Search
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
