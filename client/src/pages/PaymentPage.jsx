import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PaymentPage.module.css';

const PaymentPage = () => {
  const navigate = useNavigate();
  
  // Default to 'PayPal', or use a previously saved method
  const [paymentMethod, setPaymentMethod] = useState(
    localStorage.getItem('paymentMethod') || 'PayPal'
  );

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem('paymentMethod', paymentMethod);
    navigate('/placeorder');
  };

  return (
    <div className={styles.paymentContainer}>
      <div className={styles.paymentForm}>
        <h1>Payment Method</h1>
        <form onSubmit={submitHandler}>
          <div className={styles.formGroup}>
            <h4>Select Method</h4>
            
            <div className={styles.radioGroup}>
              <input 
                type="radio" 
                id="paypal" 
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === 'PayPal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="paypal">PayPal or Credit Card</label>
            </div>

            <div className={styles.radioGroup}>
              <input 
                type="radio" 
                id="stripe" 
                name="paymentMethod"
                value="Stripe"
                checked={paymentMethod === 'Stripe'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="stripe">Stripe</label>
            </div>

            <div className={styles.radioGroup}>
              <input 
                type="radio" 
                id="cod" 
                name="paymentMethod"
                value="CashOnDelivery"
                checked={paymentMethod === 'CashOnDelivery'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="cod">Cash on Delivery</label>
            </div>

          </div>
          <button type="submit" className={styles.continueButton}>Continue</button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;