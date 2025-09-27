import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext'; // 1. Import CartContext
import styles from './Header.module.css';
import { FiSearch, FiShoppingCart, FiHeart, FiUser, FiShield } from 'react-icons/fi';

const Header = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext); // 2. Get cartItems from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <Link to="/orders">Orders</Link>
        <Link to="/contact">Contact us</Link>
      </div>
      <div className={styles.mainHeader}>
        <Link to="/" className={styles.logo}>The Gadget Hub</Link>
        <div className={styles.searchBar}>
          <FiSearch />
          <input type="text" placeholder="Search Products & Brands" />
        </div>
        <div className={styles.userActions}>
          <Link to="/cart" className={styles.actionItem}>
            <FiShoppingCart />
            <span>Cart</span>
            {/* 3. Display badge with item count */}
            {cartItems.length > 0 && (
              <span className={styles.cartBadge}>
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </span>
            )}
          </Link>
          <Link to="/wishlist" className={styles.actionItem}>
            <FiHeart />
            <span>Wishlist</span>
          </Link>
          {userInfo ? (
            <>
              {userInfo.isAdmin && (
                <Link to="/admin/products" className={styles.actionItem}>
                  <FiShield />
                  <span>Admin</span>
                </Link>
              )}
              <div className={styles.actionItem}>
                <FiUser />
                <span>{userInfo.name}</span>
                <button onClick={handleLogout} className={styles.actionItem}>(Logout)</button>
              </div>
            </>
          ) : (
            <Link to="/login" className={styles.actionItem}>
              <FiUser />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;