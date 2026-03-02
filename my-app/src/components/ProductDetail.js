import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams(); // Use 'id' from the route definition
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const response = await fetch(`https://fypproject-pi.vercel.app/api/products/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          // Add logging for response status
          console.error(`Error fetching product: ${response.status} ${response.statusText}`);
          throw new Error('Product not found');
        }

        const data = await response.json();

       // REPLACE with:
const productData = data.product || data;
if (!productData) {
  throw new Error('Product not found');
}
setProduct(productData);
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading product details...</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
    navigate('/cart');
  };

  return (
    <div className="product-detail">
      <Link to="/products" className="back-to-products">Back to Products</Link>
      <img src={`https://fypproject-pi.vercel.app${product.image}`} alt={product.name} className="product-image" />
      <h1 className="product-name">{product.name}</h1>
      <p className="product-description">{product.description}</p>
      <p className="product-price">
        {typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : 'Price not available'}
      </p>
      <p>Weight: {product.weight} {product.unit}</p>
      <p>Quantity: {product.quantity}</p>
      <p>Condition: {product.condition}</p>
      <p>Available From: {product.availableDate}</p>
      <p>Expiration Date: {product.expirationDate}</p>
      <p>Location: {product.location}</p>
      <p>Delivery Available: {product.delivery ? 'Yes' : 'No'}</p>
      <p>Tags: {product.tags.join(', ')}</p>
      <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
