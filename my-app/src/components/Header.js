import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Track if the user is an admin
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For responsive menu
  const navigate = useNavigate();

  // Check authentication status and role
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
        try {
          const decoded = JSON.parse(atob(token.split('.')[1])); // Decode the token
          if (decoded.role === 'admin') {
            setIsAdmin(true);
          }
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    };
    checkAuth();
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowDropdown(false);

    if (showDropdown) {
      window.addEventListener('click', handleClickOutside);
    }

    return () => window.removeEventListener('click', handleClickOutside);
  }, [showDropdown]);

  // Logout function
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Optional: Call logout API if necessary
        const response = await fetch('http://localhost:5000/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Logout failed on the server.');
        }
      }

      // Clear token and redirect
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setIsAdmin(false);
      alert('You have been logged out successfully.');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Logout failed. Please try again.');
    }
  };

  // Toggle menu for responsive design
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="logo">Harvest Harmony</div>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/products">Products</Link></li>
         
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>

          {/* Admin-specific links */}
          {isAdmin && (
            <>
              <li><Link to="/admin">Admin Panel</Link></li>
              
            </>
          )}

          {/* User or Farmer Dashboard */}
          {isAuthenticated && !isAdmin && (
            <li><Link to="/farmer/dashboard">Dashboard</Link></li>
          )}

          <li><Link to="/cart">Cart</Link></li>

          {!isAuthenticated ? (
            <li><Link to="/Auth-comp" className="auth-button">Sign In</Link></li>
          ) : (
            <li>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
