// src/components/Testimonials.js

import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    { id: 1, name: 'Umar', text: 'Amazing fresh produce and great service!', rating: 5 },
    { id: 2, name: 'Qasim', text: 'I love supporting local farmers!', rating: 4 },
  ];

  return (
    <section className="testimonials">
      <h2>What Our Customers Say</h2>
      <div className="testimonial-list">
        {testimonials.map(testimonial => (
          
          <div key={testimonial.id} className="testimonial-card">
             <h3>{testimonial.name}</h3>
           
            <p>{testimonial.text}</p>
           
            <p>{'⭐'.repeat(testimonial.rating)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
