import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
  const { state } = useLocation();
  const { order } = state || {};

  if (!order) {
    return <p>No order data available.</p>;
  }

  return (
    <div>
      <h2>Order Confirmation</h2>
      <h3>Order ID: {order._id}</h3>
      <p>Status: {order.status}</p>
      <h4>Billing Information</h4>
      <p>{order.billingInfo.fullName}</p>
      <p>{order.billingInfo.address}</p>
      <p>{order.billingInfo.city}</p>
      <p>{order.billingInfo.postalCode}</p>
      <p>{order.billingInfo.country}</p>
      <h4>Cart Items</h4>
      <ul>
        {order.cartItems.map((item) => (
          <li key={item.productId}>
            {item.name} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderConfirmation;
