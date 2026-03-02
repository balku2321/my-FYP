// src/components/AboutUs.js

import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us">
      <section className="hero-about">
        <div className="about-content">
          <h1>About Us</h1>
          <p>We are committed to connecting you with local farmers and providing the freshest, most sustainable produce available.</p>
        </div>
      </section>

      <section className="our-story">
        <h2>Our Story</h2>
        <p>
          Local Food Marketplace started with a simple idea: to create a direct link between local farmers and consumers. We believe that fresh, sustainable food should be easily accessible to everyone, and that supporting local farmers is the key to a healthier community and planet.
        </p>
      </section>

      <section className="our-mission">
        <h2>Our Mission</h2>
        <p>
          Our mission is to create a sustainable food network that not only delivers the best produce to your door but also empowers local farmers by providing them with a platform to reach more customers.
        </p>
      </section>

      <section className="our-team">
        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="team-member">
            
            <h3>M.Umar</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
           
            <h3>M.Qasim</h3>
            <p>Operations Manager</p>
          </div>
          <div className="team-member">
          
            <h3>M.Daniyal</h3>
            <p>Marketing Director</p>
          </div>
        </div>
      </section>

      <section className="our-values">
        <h2>Our Values</h2>
        <ul>
          <li><strong>Sustainability:</strong> We prioritize environmentally friendly practices in every step of our process.</li>
          <li><strong>Community:</strong> We believe in the power of local communities to drive change and create a better future.</li>
          <li><strong>Transparency:</strong> We are committed to being open and honest with our customers and farmers alike.</li>
        </ul>
      </section>
    </div>
  );
}

export default AboutUs;
