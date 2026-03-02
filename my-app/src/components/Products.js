import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from './ProductContext';
import { useUser } from './UserContext'; // Import user context
import { Link, useLocation } from 'react-router-dom';
import './Products.css';

const Products = () => {
  const { products } = useContext(ProductContext);
  const { user } = useUser(); // Get the user info from context
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();

  // Extract the search query and location from the URL parameters
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';
  const locationQuery = searchParams.get('location') || '';

  useEffect(() => {
    if (products.length > 0) {
      // Filter products based on the search query and location
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) &&
          product.location.toLowerCase().includes(locationQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [query, locationQuery, products]);

  return (
    <div className="products-page">
      <h1>Products</h1>

      {/* Show "Add Product" button only if the user is a farmer */}
      {user?.role === 'farmer' && (
        <Link to="/post-product" className="button">
          Add Product
        </Link>
      )}

      <div className="products-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <Link to={`/products/${product._id}`} className="product-link">
                <img
                  src={`http://localhost:5000${product.image}`}
                  alt={product.name}
                />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>
                  {typeof product.price === 'number'
                    ? `$${product.price.toFixed(2)}`
                    : 'Price not available'}
                </p>
                <p>{product.weight} {product.unit}</p> {/* Display weight and unit */}
                <p>Quantity: {product.quantity}</p> {/* Display quantity */}
                <p>Condition: {product.condition}</p> {/* Display condition */}
                <p>Location: {product.location}</p> {/* Display location */}
              </Link>
            </div>
          ))
        ) : (
          <p>No products found matching the criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
