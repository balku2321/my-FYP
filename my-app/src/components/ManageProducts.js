import React, { useContext } from 'react';
import { ProductContext } from './ProductContext';
import './ManageProducts.css';

const ManageProducts = () => {
  const { products, setProducts } = useContext(ProductContext);

  const handleDeleteProduct = (id) => {
    console.log('Deleting product with ID:', id); // Log to check the ID
    const updatedProducts = products.filter(product => product._id !== id); // Use `_id` if that's the key
    setProducts(updatedProducts); // Update the product list
  };

  return (
    <div className="manage-products">
      <h2>Manage Products</h2>
      <ul>
        {products.length > 0 ? (
          products.map(product => (
            <li key={product._id} className="product-item">
              <img src={`http://localhost:5000${product.image}`} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>
                {typeof product.price === 'number'
                  ? `$${product.price.toFixed(2)}`
                  : 'Price not available'}
              </p>
              <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No products to manage.</p>
        )}
      </ul>
    </div>
  );
};

export default ManageProducts;
