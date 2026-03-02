import React, { useState } from 'react';
import './ProposeExchange.css';

const ProposeExchange = () => {
  const [formData, setFormData] = useState({
    farmerName: '',
    productToExchange: '',
    requestedProduct: '',
    details: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you would typically send the form data to your backend or API.
    console.log('Proposing exchange with data:', formData);
    alert('Exchange proposal submitted!');
    setFormData({
      farmerName: '',
      productToExchange: '',
      requestedProduct: '',
      details: '',
    });
  };

  return (
    <div className="propose-exchange">
      <h1>Propose a Product Exchange</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Your Name:
          <input
            type="text"
            name="farmerName"
            value={formData.farmerName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Product to Exchange:
          <input
            type="text"
            name="productToExchange"
            value={formData.productToExchange}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Requested Product:
          <input
            type="text"
            name="requestedProduct"
            value={formData.requestedProduct}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Details:
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <button type="submit">Submit Proposal</button>
      </form>
    </div>
  );
};

export default ProposeExchange;
