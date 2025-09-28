import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistContext';
import homeStyles from './HomePage.module.css'; // Reuse homepage styles
import cartStyles from './CartPage.module.css'; // Reuse cart styles

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);

  return (
    <div style={{ padding: '2rem 5%' }}>
      <h1>My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <div className={cartStyles.emptyCart}>
          Your wishlist is empty. <Link to="/">Go Shopping</Link>
        </div>
      ) : (
        <div className={homeStyles.productGrid}>
          {wishlistItems.map((item) => (
            <div key={item._id} className={homeStyles.productCard}>
              <Link to={`/product/${item._id}`}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
              </Link>
              <p>₹{item.price}</p>
              <button 
                className={cartStyles.removeButton} 
                style={{ fontSize: '1rem', color: '#333' }}
                onClick={() => removeFromWishlist(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;  