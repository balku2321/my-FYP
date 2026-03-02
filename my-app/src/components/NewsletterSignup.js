// src/components/NewsletterSignup.js

import React from 'react';
import './NewsletterSignup.css';

const NewsletterSignup = () => {
  return (
    <section className="newsletter-signup">
      <h2>Subscribe to Our Newsletter</h2>
      <form>
        <input type="email" placeholder="Enter your email" />
        <button type="submit">Subscribe</button>
      </form>
    </section>
  );
}

export default NewsletterSignup;
