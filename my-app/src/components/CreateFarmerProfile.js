// src/components/CreateFarmerProfile.js

import React, { useState, useContext } from 'react';
import { FarmerContext } from './FarmerContext';
import './CreateFarmerProfile.css';
import { useNavigate } from 'react-router-dom';

const CreateFarmerProfile = () => {
  const { addFarmer } = useContext(FarmerContext);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    image: null, 
    description: '',
    farmType: '',
    experience: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData((prevData) => ({
        ...prevData,
        image: files[0], 
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const imageUrl = URL.createObjectURL(formData.image);

    const newFarmer = {
      id: Date.now(),
      name: formData.name,
      location: formData.location,
      imageUrl, 
      description: formData.description,
      farmType: formData.farmType,
      experience: formData.experience,
    };

    addFarmer(newFarmer);

    navigate('/farmers');
  };

  return (
    <div className="create-farmer-profile-container">
      <form className="create-farmer-profile-form" onSubmit={handleSubmit}>
        <h2>Create Farmer Profile</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="farmType">Farm Type</label>
          <select 
            id="farmType" 
            name="farmType" 
            value={formData.farmType} 
            onChange={handleChange} 
            required
          >
            <option value="">Select Farm Type</option>
            <option value="Vegetable Farm">Vegetable Farm</option>
            <option value="Dairy Farm">Dairy Farm</option>
            <option value="Fruit Farm">Fruit Farm</option>
            <option value="Livestock Farm">Livestock Farm</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="experience">Years of Experience</label>
          <select 
            id="experience" 
            name="experience" 
            value={formData.experience} 
            onChange={handleChange} 
            required
          >
            <option value="">Select Experience</option>
            <option value="1-2 Years">1-2 Years</option>
            <option value="3-5 Years">3-5 Years</option>
            <option value="6-10 Years">6-10 Years</option>
            <option value="10+ Years">10+ Years</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            accept="image/*"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">Create Profile</button>
      </form>
    </div>
  );
};

export default CreateFarmerProfile;
