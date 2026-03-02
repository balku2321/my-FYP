import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      // Redirect to login if no token
      navigate('/login');
    } else {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1])); // Decode the token
        if (decoded.role === 'admin') {
          setIsAdmin(true); // Only set as admin if the role is admin
        } else {
          navigate('/403'); // Redirect to "Forbidden" page if not admin
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        navigate('/login'); // Redirect to login if token is invalid
      }
    }
  }, [navigate, token]);

  if (!isAdmin) {
    return null; // Don't render the admin panel if not an admin
  }

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <div className="admin-links">
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/manage-products">Manage Products</Link>
        <Link to="/admin/manage-blogs">Manage Blogs</Link>
        <Link to="/blog">View Blog Articles</Link>
      </div>
    </div>
  );
};

export default AdminPanel;
