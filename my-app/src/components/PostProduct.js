import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; // Use the useUser hook from UserContext
import { ProductContext } from './ProductContext'; // Assuming context for managing products
import './PostProduct.css'; // Optional: Add styling for the form

const PostProduct = () => {
  const { user } = useUser(); // Get user context
  const { addProduct } = useContext(ProductContext); // If used for state management
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    weight: '',
    quantity: '',
    availableDate: '',
    expirationDate: '',
    condition: 'New',
    unit: 'kg',
    location: '',
    delivery: false,
    tags: '',
    image: null,
  });

  const navigate = useNavigate();

  // Redirect unauthorized users
  useEffect(() => {
    if (!user || user.role !== 'farmer') {
      alert('You are not authorized to access this page!');
      navigate('/products');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === 'image') {
      setProduct({ ...product, image: files[0] });
    } else if (type === 'checkbox') {
      setProduct({ ...product, [name]: checked });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Posting product data:', product);

    // Check if token exists
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in first!');
      return;
    }

    const { image, ...formDataFields } = product; // Separate image from other fields
    const formData = new FormData();
    
    // Append non-image fields to FormData
    Object.entries(formDataFields).forEach(([key, value]) => {
      if (key === 'tags') {
        formData.append(key, value.split(',').map((tag) => tag.trim()));
      } else {
        formData.append(key, value);
      }
    });

    // Append the image file if it exists
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('https://fypproject-pi.vercel.app/api/products', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log('Server Response:', data);

      if (response.ok) {
        alert('Product posted successfully');
        navigate('/products');
      } else {
        alert(`Error: ${data.message || 'Unable to post product'}`);
      }
    } catch (error) {
      console.error('Error posting product:', error);
      alert('An error occurred while posting the product');
    }
  };

  return (
    <div className="post-product">
      <h1>Post a New Product</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Product Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price ($)</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="weight">Weight</label>
          <input
            type="number"
            name="weight"
            value={product.weight}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="unit">Unit</label>
          <select name="unit" value={product.unit} onChange={handleChange}>
            <option value="kg">Kilogram (kg)</option>
            <option value="g">Gram (g)</option>
            <option value="lb">Pound (lb)</option>
            <option value="pcs">Pieces (pcs)</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="availableDate">Available From</label>
          <input
            type="date"
            name="availableDate"
            value={product.availableDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="expirationDate">Expiration Date</label>
          <input
            type="date"
            name="expirationDate"
            value={product.expirationDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="condition">Condition</label>
          <select name="condition" value={product.condition} onChange={handleChange}>
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            value={product.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="delivery">Delivery</label>
          <input
            type="checkbox"
            name="delivery"
            checked={product.delivery}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={product.tags}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Product Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Post Product</button>
      </form>
    </div>
  );
};

export default PostProduct;
