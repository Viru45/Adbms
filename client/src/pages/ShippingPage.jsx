import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import styles from './ShippingPage.module.css';

const ShippingPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  // Get saved shipping address from localStorage, or use empty strings
  const savedAddress = JSON.parse(localStorage.getItem('shippingAddress')) || {};

  const [address, setAddress] = useState(savedAddress.address || '');
  const [city, setCity] = useState(savedAddress.city || '');
  const [postalCode, setPostalCode] = useState(savedAddress.postalCode || '');
  const [country, setCountry] = useState(savedAddress.country || '');

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    navigate('/cart');
  }

  const submitHandler = (e) => {
    e.preventDefault();
    // Save address to localStorage
    const shippingAddress = { address, city, postalCode, country };
    localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
    // Navigate to the next step (payment)
    navigate('/payment');
  };

  return (
    <div className={styles.shippingContainer}>
      <div className={styles.shippingForm}>
        <h1>Shipping Address</h1>
        <form onSubmit={submitHandler}>
          <div className={styles.formGroup}>
            <label>Address</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label>City</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label>Postal Code</label>
            <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label>Country</label>
            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
          </div>
          <button type="submit" className={styles.continueButton}>Continue</button>
        </form>
      </div>
    </div>
  );
};

export default ShippingPage;