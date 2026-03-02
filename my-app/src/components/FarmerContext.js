// src/contexts/FarmerContext.js

import React, { createContext, useState, useCallback } from 'react';

export const FarmerContext = createContext();

export const FarmerProvider = ({ children }) => {
  const [farmers, setFarmers] = useState([]);

  const addFarmer = useCallback((farmer) => {
    setFarmers((prevFarmers) => [...prevFarmers, farmer]);
  }, []);

  const deleteFarmer = useCallback((id) => {
    setFarmers((prevFarmers) => prevFarmers.filter((farmer) => farmer.id !== id));
  }, []);

  return (
    <FarmerContext.Provider value={{ farmers, addFarmer, deleteFarmer }}>
      {children}
    </FarmerContext.Provider>
  );
};
