import React, { useState } from 'react';
import { useCart } from '../components/CartContext'; // Import the CartContext
import './Checkout.css';

const Checkout = () => {
  const { cartItems, calculateTotal } = useCart();
  const [billingInfo, setBillingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [orderPlaced, setOrderPlaced] = useState(false); // Track if the order is placed

  const handlePlaceOrder = () => {
    // Handle order placement logic (store order in DB, etc.)
    console.log('Order placed:', {
      billingInfo,
      paymentMethod,
      cartItems,
    });

    // Set orderPlaced to true to show confirmation message
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="order-confirmation">
        <h1>Order Confirmation</h1>
        <p>Thank you for your order!</p>
        <p>Your order has been placed successfully.</p>
        <p>Order Summary:</p>
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.name} x {item.quantity} - ${item.price * item.quantity}
            </li>
          ))}
        </ul>
        <h3>Total: ${calculateTotal().toFixed(2)}</h3>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <form className="billing-form">
        <h2>Billing Information</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={billingInfo.fullName}
          onChange={(e) => setBillingInfo({ ...billingInfo, fullName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={billingInfo.address}
          onChange={(e) => setBillingInfo({ ...billingInfo, address: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="City"
          value={billingInfo.city}
          onChange={(e) => setBillingInfo({ ...billingInfo, city: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={billingInfo.postalCode}
          onChange={(e) => setBillingInfo({ ...billingInfo, postalCode: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Country"
          value={billingInfo.country}
          onChange={(e) => setBillingInfo({ ...billingInfo, country: e.target.value })}
          required
        />
      </form>

      <div className="payment-method">
        <h2>Payment Method</h2>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="creditCard"
            checked={paymentMethod === 'creditCard'}
            onChange={() => setPaymentMethod('creditCard')}
          />
          Credit Card
        </label>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="Cash On Delivery"
            checked={paymentMethod === 'Cash On Delivery'}
            onChange={() => setPaymentMethod('Cash On Delivery')}
          />
          Cash On Delivery
        </label>
      </div>

      <div className="order-summary">
        <h2>Order Summary</h2>
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.name} x {item.quantity} - ${item.price * item.quantity}
            </li>
          ))}
        </ul>
        <h3>Total: ${calculateTotal().toFixed(2)}</h3>
      </div>
      <button onClick={handlePlaceOrder} className="place-order-button">Place Order</button>
    </div>
  );
};

export default Checkout;
