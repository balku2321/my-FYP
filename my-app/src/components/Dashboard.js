import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from './ProductContext';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const AdminDashboard = () => {
  const { products, setProducts } = useContext(ProductContext);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [productActivityLog, setProductActivityLog] = useState([]);
  const [sortOption, setSortOption] = useState('name'); // Sorting by name initially

  // Function to calculate statistics
  useEffect(() => {
    if (products.length > 0) {
      const lowStock = products.filter((product) => product.quantity <= 5); // Example: low stock if quantity <= 5
      const outOfStock = products.filter((product) => product.quantity === 0);
      const newProductsList = products.filter(
        (product) => new Date(product.createdAt) > new Date() - 7 * 24 * 60 * 60 * 1000 // 7 days filter
      );
      setLowStockProducts(lowStock);
      setOutOfStockProducts(outOfStock);
      setNewProducts(newProductsList);
    }
  }, [products]);

  // Function to handle sorting by name, price, or stock quantity
  const handleSort = (option) => {
    setSortOption(option);
    let sortedProducts;
    if (option === 'name') {
      sortedProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
    } else if (option === 'price') {
      sortedProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (option === 'quantity') {
      sortedProducts = [...filteredProducts].sort((a, b) => a.quantity - b.quantity);
    }
    setFilteredProducts(sortedProducts);
  };

  // Handle search query
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  // Handle product delete functionality
  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product._id !== id);
    setProducts(updatedProducts);
    // Log delete action
    setProductActivityLog((prevLog) => [
      ...prevLog,
      { action: 'Deleted', productId: id, time: new Date().toLocaleString() },
    ]);
  };

  // Handle product edit functionality (Redirect to edit page or show a modal)
  const handleEdit = (id) => {
    // For now, just log edit action
    setProductActivityLog((prevLog) => [
      ...prevLog,
      { action: 'Edited', productId: id, time: new Date().toLocaleString() },
    ]);
    // Implement actual edit functionality (e.g., navigate to product edit page)
  };

  // Filter products by stock status and category
  const handleFilter = (filterType, value) => {
    let filtered = [...products];
    if (filterType === 'stock') {
      filtered = value === 'in-stock'
        ? products.filter((product) => product.quantity > 0)
        : products.filter((product) => product.quantity === 0);
    }
    if (filterType === 'category') {
      filtered = value === 'all'
        ? products
        : products.filter((product) => product.category === value);
    }
    setFilteredProducts(filtered);
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Panel - Product Dashboard</h1>
        <div className="summary">
          <div>Total Products: {products.length}</div>
          <div>Out of Stock: {outOfStockProducts.length}</div>
          <div>Low Stock: {lowStockProducts.length}</div>
          <div>New Products: {newProducts.length}</div>
        </div>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="sort-filter">
        <button onClick={() => handleSort('name')}>Sort by Name</button>
        <button onClick={() => handleSort('price')}>Sort by Price</button>
        <button onClick={() => handleSort('quantity')}>Sort by Stock Quantity</button>
        <button onClick={() => handleFilter('stock', 'in-stock')}>Filter In Stock</button>
        <button onClick={() => handleFilter('stock', 'out-of-stock')}>Filter Out of Stock</button>
        <button onClick={() => handleFilter('category', 'all')}>Filter All Categories</button>
        <button onClick={() => handleFilter('category', 'vegetables')}>Filter Vegetables</button>
        <button onClick={() => handleFilter('category', 'fruits')}>Filter Fruits</button>
      </div>

      <div className="product-overview">
        <h2>Product List</h2>
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock Quantity</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.category}</td>
                <td>{product.quantity}</td>
                <td>{product.status ? 'Active' : 'Inactive'}</td>
                <td>
                 
                  <button onClick={() => handleDelete(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="product-statistics">
        <h2>Product Statistics</h2>
        <div>Total Products: {products.length}</div>
        <div>Products by Category:</div>
        <ul>
          {Array.from(new Set(products.map((product) => product.category))).map((category) => (
            <li key={category}>
              {category}: {products.filter((product) => product.category === category).length}
            </li>
          ))}
        </ul>
        <div>Stock Status:</div>
        <ul>
          <li>In Stock: {products.filter((product) => product.quantity > 0).length}</li>
          <li>Out of Stock: {outOfStockProducts.length}</li>
        </ul>
      </div>

      <div className="recent-products">
        <h2>Recently Added Products</h2>
        <ul>
          {newProducts.map((product) => (
            <li key={product._id}>{product.name} (Added: {new Date(product.createdAt).toLocaleDateString()})</li>
          ))}
        </ul>
      </div>

      <div className="product-activity-log">
        <h2>Product Activity Log</h2>
        <ul>
          {productActivityLog.map((log, index) => (
            <li key={index}>{log.action} on product {log.productId} at {log.time}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
