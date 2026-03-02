import React, { createContext, useState, useEffect } from 'react';

// Create a context for products
export const ProductContext = createContext();

// Create a provider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // State to hold products
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error messages

  // Function to fetch products from the backend
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          'Content-Type': 'application/json', // Optional, but good practice
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to fetch products: ${errorData.message || 'Unknown error'}`);
      }

      const data = await response.json();
      setProducts(data); // Set the fetched products to state
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error.message); // Set the error message
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // useEffect to fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Return the context provider with the products, loading state, and error
  return (
    <ProductContext.Provider value={{ products, setProducts, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};
