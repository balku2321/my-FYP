import React, { useState } from 'react';
import './ManageOrders.css';

const ManageOrders = () => {
  const [orders, setOrders] = useState([
    { id: 1, product: 'Tomato', quantity: 3, status: 'Pending' },
    { id: 2, product: 'Carrot', quantity: 2, status: 'Shipped' },
  ]);

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <div className="manage-orders">
      <h2>Manage Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            Order #{order.id}: {order.product} - {order.quantity} pcs - Status: {order.status}
            <button onClick={() => updateStatus(order.id, 'Shipped')}>Mark as Shipped</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageOrders;
