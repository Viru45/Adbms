import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import styles from './Header.module.css';
import { FiSearch, FiShoppingCart, FiHeart, FiUser, FiShield } from 'react-icons/fi';
import ThemeToggle from '../common/ThemeToggle.jsx'; // 1. Import ThemeToggle

const Header = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <Link to="/orders">Orders</Link>
        <Link to="/contact">Contact us</Link>
      </div>
      <div className={styles.mainHeader}>
        <Link to="/" className={styles.logo}>The Gadget Hub</Link>

        <form onSubmit={submitHandler} className={styles.searchBar}>
          <FiSearch />
          <input 
            type="text" 
            placeholder="Search Products & Brands"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </form>

        <div className={styles.userActions}>
          <ThemeToggle /> {/* 2. Add the toggle button */}
          <Link to="/cart" className={styles.actionItem}>
            <FiShoppingCart />
            <span>Cart</span>
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
                <Link to="/profile" className={styles.actionItem}>
                  <FiUser />
                  <span>{userInfo.name}</span>
                </Link>
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