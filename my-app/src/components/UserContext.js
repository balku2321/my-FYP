import React, { createContext, useContext, useState, useEffect } from 'react';

// Explicitly export UserContext
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch user data from API
  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from server:', errorData);
        throw new Error('Failed to fetch user data');
      }
  
      const data = await response.json();
  
      if (data && data.role) {
        setUser(data);
      } else {
        console.error('User data does not contain role');
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUser(null);
    }
  };
  

  useEffect(() => {
    fetchUserData(); // Fetch user data on component mount
  }, []);

  return (
    <UserContext.Provider value={{ user, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// This exports the useUser hook that consumes UserContext
export const useUser = () => useContext(UserContext);
