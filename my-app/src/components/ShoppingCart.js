import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../components/CartContext'; // Import the CartContext
import './ShoppingCart.css';

const ShoppingCart = () => {
  const { cartItems, updateQuantity, removeItem, calculateTotal } = useCart();

  return (
    <div className="shopping-cart">
      <h1>Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
                 <img src={`https://fypproject-pi.vercel.app${item.image}`} alt={item.name} />
                
                <div className="item-details">
                  <h2>{item.name}</h2>
                  <p>${item.price.toFixed(2)}</p>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                  />
                  <button onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total: ${calculateTotal().toFixed(2)}</h3>
          </div>
          <Link to="/checkout">
            <button className="checkout-button">Proceed to Checkout</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
