import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import { ProductContext } from './ProductContext';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  const { addToCart, cartItems } = useCart();
  const { products } = useContext(ProductContext);

  // Add safeguard to ensure products is defined and an array
  const featuredProducts = Array.isArray(products) ? products.slice(0, 3) : [];

  // Function to check if a product is already in the cart
  const isProductInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  const handleAddToCart = (product) => {
    if (!isProductInCart(product.id)) {
      addToCart(product);
    }
  };

  return (
    <div className="featured-products">
      <h2>Featured Products</h2>
      <div className="products-list">
        {featuredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={`http://localhost:5000${product.image}`} alt={product.name} />
            <h3>{product.name}</h3>
           

            {/* Add to Cart Button */}
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
