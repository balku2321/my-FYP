// src/components/Home.js

import React from 'react';
import HeroSection from './HeroSection';
import FeaturedProducts from './FeaturedProducts';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import NewsletterSignup from './NewsletterSignup';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <HowItWorks />
      <Testimonials />
      <NewsletterSignup />
    </div>
  );
}

export default Home;
