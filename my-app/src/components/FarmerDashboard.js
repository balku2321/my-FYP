import React, { useState, useContext, useEffect } from 'react';
import { ProductContext } from './ProductContext';
import { useUser } from './UserContext';
import './FarmerDashboard.css'; // Optional: Add styling

const FarmerDashboard = () => {
  const { user } = useUser(); // Access user info
  const { products } = useContext(ProductContext);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({});

  useEffect(() => {
    if (!user || user.role !== 'farmer') {
      alert('You are not authorized to access this page!');
      window.location.href = '/'; // Redirect to homepage (or login page)
      return;
    }

    // Pick any two or three products dynamically
    if (products.length > 0) {
      setSelectedProducts(products.slice(0, 3)); // Select the first 2-3 products
    }

    // Initialize editable details
    setEditedDetails({
      fullName: user.fullName,
      email: user.email,
      farmName: user.farmName,
      farmAddress: user.farmAddress,
      city: user.city,
      phone: user.phone,
    });
  }, [user, products]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails({ ...editedDetails, [name]: value });
  };

  // Handle save action (update only on frontend)
  const handleSave = () => {
    setIsEditing(false);
    // The updated details are saved locally, no backend update.
    // If you wanted to keep the changes permanently, you would update the backend here.
    // But for now, it's just updating the frontend state.
  };

  return (
    <div className="farmer-dashboard">
      <h1>Welcome, {user?.fullName || 'Farmer'}</h1>

      {/* Farmer Details Section */}
      <div className="dashboard-section">
        <h2>Farmer Details</h2>
        {isEditing ? (
          <div className="edit-form">
            <label>
              Full Name:
              <input
                type="text"
                name="fullName"
                value={editedDetails.fullName}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={editedDetails.email}
                onChange={handleChange}
              />
            </label>
            <label>
              Farm Name:
              <input
                type="text"
                name="farmName"
                value={editedDetails.farmName}
                onChange={handleChange}
              />
            </label>
            <label>
              Farm Address:
              <input
                type="text"
                name="farmAddress"
                value={editedDetails.farmAddress}
                onChange={handleChange}
              />
            </label>
            <label>
              City:
              <input
                type="text"
                name="city"
                value={editedDetails.city}
                onChange={handleChange}
              />
            </label>
            <label>
              Phone:
              <input
                type="tel"
                name="phone"
                value={editedDetails.phone}
                onChange={handleChange}
              />
            </label>
            <button className="button save-button" onClick={handleSave}>
              Save
            </button>
            <button
              className="button cancel-button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <p><strong>Name:</strong> {editedDetails.fullName}</p>
            <p><strong>Email:</strong> {editedDetails.email}</p>
            <p><strong>Farm Name:</strong> {editedDetails.farmName}</p>
            <p><strong>Farm Address:</strong> {editedDetails.farmAddress}</p>
            <p><strong>City:</strong> {editedDetails.city}</p>
            <p><strong>Phone:</strong> {editedDetails.phone}</p>
            <button
              className="button edit-button"
              onClick={() => setIsEditing(true)}
            >
              Edit Details
            </button>
          </div>
        )}
      </div>

      {/* Farmer's Saved Products Section */}
      <div className="dashboard-section">
        <h2>Saved Products</h2>
        <div className="products-list">
          {selectedProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            selectedProducts.map((product) => (
              <div key={product._id} className="product-card">
                <img src={`https://fypproject-pi.vercel.app${product.image}`} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>${product.price.toFixed(2)}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
