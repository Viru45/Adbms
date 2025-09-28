import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import styles from './CartPage.module.css';
import { FiTrash2 } from 'react-icons/fi';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

const checkoutHandler = () => {
  navigate('/shipping'); // Change this from the alert
};

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartItems}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            Your cart is empty. <Link to="/">Go Shopping</Link>
          </div>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item._id} className={styles.cartItem}>
                <img src={item.image} alt={item.name} />
                <Link to={`/product/${item._id}`}>{item.name}</Link>
                <span>₹{item.price}</span>
                <select
                  value={item.qty}
                  onChange={(e) => addToCart(item, Number(e.target.value))}
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
                <button
                  className={styles.removeButton}
                  onClick={() => removeFromCart(item._id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.summaryCard}>
        <h2>Order Summary</h2>
        <p>
          <span>Subtotal ({totalItems} items)</span>
          <span>₹{subtotal}</span>
        </p>
        <button
          className={styles.checkoutButton}
          disabled={cartItems.length === 0}
          onClick={checkoutHandler}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;