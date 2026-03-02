import React, { useContext } from 'react';
import { FarmerContext } from './FarmerContext'; // Ensure the path is correct
import './ManageFarmers.css';

const ManageFarmers = () => {
  const { farmers, deleteFarmer } = useContext(FarmerContext); // Access farmers and delete function from context

  return (
    <div className="manage-farmers">
      <h2>Manage Farmers</h2>
      <ul>
        {farmers.map(farmer => (
          <li key={farmer.id}>
            {farmer.name} - {farmer.location}
            <button onClick={() => deleteFarmer(farmer.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageFarmers;
