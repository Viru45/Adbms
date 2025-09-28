import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import styles from './PlaceOrderPage.module.css';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const { userInfo } = useContext(AuthContext);
  const { cartItems, clearCart } = useContext(CartContext);

  // Get data from localStorage
  const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));
  const paymentMethod = localStorage.getItem('paymentMethod');

  // --- Calculations ---
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const shippingPrice = itemsPrice > 5000 ? 0 : 100; // Free shipping for orders > ₹5000
  const taxPrice = 0.18 * itemsPrice; // 18% tax
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        totalPrice: totalPrice.toFixed(2),
      }, config);

      clearCart();
      alert('Order placed successfully!');
      navigate(`/`); // Navigate to homepage for now
    } catch (error) {
      alert('Failed to place order.');
      console.error(error);
    }
  };

  return (
    <div className={styles.placeOrderContainer}>
      <div className={styles.orderDetails}>
        <div className={styles.detailSection}>
          <h2>Shipping</h2>
          <p>
            <strong>Address: </strong>
            {shippingAddress.address}, {shippingAddress.city},{' '}
            {shippingAddress.postalCode}, {shippingAddress.country}
          </p>
        </div>

        <div className={styles.detailSection}>
          <h2>Payment Method</h2>
          <p><strong>Method: </strong>{paymentMethod}</p>
        </div>

        <div className={styles.detailSection}>
          <h2>Order Items</h2>
          {cartItems.map((item) => (
            <div key={item._id} className={styles.orderItem}>
              <img src={item.image} alt={item.name} />
              <Link to={`/product/${item._id}`}>{item.name}</Link>
              <span>{item.qty} x ₹{item.price} = ₹{item.qty * item.price}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.summaryCard}>
        <h2>Order Summary</h2>
        <div className={styles.summaryRow}>
          <span>Items:</span><span>₹{itemsPrice.toFixed(2)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Shipping:</span><span>₹{shippingPrice.toFixed(2)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Tax:</span><span>₹{taxPrice.toFixed(2)}</span>
        </div>
        <div className={styles.summaryRow}>
          <strong>Total:</strong><strong>₹{totalPrice.toFixed(2)}</strong>
        </div>
        <button className={styles.placeOrderButton} onClick={placeOrderHandler}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default PlaceOrderPage;