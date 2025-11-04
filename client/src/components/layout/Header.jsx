import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { ThemeContext } from '../../context/ThemeContext';
import styles from './Header.module.css';
import { FiSearch, FiShoppingCart, FiHeart, FiUser, FiShield, FiLogOut, FiSettings, FiArchive, FiMail } from 'react-icons/fi';
import ThemeToggle from '../common/ThemeToggle.jsx';

const Header = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // This function was likely missing
  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const numberOfCartItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const [isBumped, setIsBumped] = useState(false);
  useEffect(() => {
    if (cartItems.length === 0) return;
    setIsBumped(true);
    const timer = setTimeout(() => setIsBumped(false), 300);
    return () => clearTimeout(timer);
  }, [cartItems]);
  const badgeClasses = `${styles.cartBadge} ${isBumped ? styles.bump : ''}`;

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <Link to="/orders"><FiArchive /><span>Orders</span></Link>
        <Link to="/contact"><FiMail /><span>Contact us</span></Link>
      </div>
      <div className={styles.mainHeader}>
        <Link to="/" className={styles.logo}>
          <img 
            src={theme === 'light' ? '/logo copy.png' : '/logo-dark.png'} 
            alt="The Gadget Hub Logo" 
          />
        </Link>
        <form onSubmit={submitHandler} className={styles.searchBar}>
          <input 
            type="text" 
            placeholder="Search Products & Brands"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" className={styles.searchButton}>
            <FiSearch />
          </button>
        </form>
        <div className={styles.userActions}>
          <ThemeToggle />
          <Link to="/cart" className={styles.actionItem}>
            <FiShoppingCart />
            <span>Cart</span>
            {cartItems.length > 0 && (
              <span className={badgeClasses}>{numberOfCartItems}</span>
            )}
          </Link>
          <Link to="/wishlist" className={styles.actionItem}>
            <FiHeart />
            <span>Wishlist</span>
          </Link>
          {userInfo ? (
            <div className={styles.userMenu} ref={dropdownRef}>
              <div className={styles.actionItem} onClick={() => setDropdownOpen(!dropdownOpen)}>
                <FiUser />
                <span>{userInfo.name}</span>
              </div>
              {dropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <Link to="/profile" onClick={() => setDropdownOpen(false)}><FiSettings /><span>My Profile</span></Link>
                  {userInfo.isAdmin && (
                    <Link to="/admin/products" onClick={() => setDropdownOpen(false)}><FiShield /><span>Admin</span></Link>
                  )}
                  <button onClick={handleLogout}><FiLogOut /><span>Logout</span></button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className={styles.actionItem}><FiUser /><span>Login</span></Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;