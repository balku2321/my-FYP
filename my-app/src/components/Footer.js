// src/components/Footer.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <div className="link-section">
          <h3>About Us</h3>
          <ul>
            <li><Link to="/about#our-story">Our Story</Link></li>
            <li><Link to="/about#our-impact">Our Impact</Link></li>
            <li><Link to="/about#careers">Careers</Link></li>
          </ul>
        </div>
        <div className="link-section">
          <h3>Products</h3>
          <ul>
            <li><Link to="/products">Vegetables</Link></li>
            <li><Link to="/products">Fruits</Link></li>
            <li><Link to="/products">Dairy</Link></li>
          </ul>
        </div>
        <div className="link-section">
          <h3>Contact Us</h3>
          <ul>
            <li>Email: info@localfoodmarketplace.com</li>
            <li>Phone: +123 456 7890</li>
            <li><Link to="/contact-us">Contact Form</Link></li>
          </ul>
        </div>
      </div>
      <div className="social-media">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="https://your-icon-url.jpg" alt="Facebook" />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <img src="https://your-icon-url.jpg" alt="Twitter" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="https://your-icon-url.jpg" alt="Instagram" />
        </a>
      </div>
      <p>&copy; 2024 Local Food Marketplace. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
