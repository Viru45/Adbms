import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // 1. Import Link
import { AuthContext } from '../context/AuthContext';
import styles from './HomePage.module.css';

const HomePage = () => {
  // ... state and useEffect are the same ...
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/products');
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  return (
    <div className={styles.homePage}>
      {/* ... heroBanner is the same ... */}

      <section className={styles.showcase}>
        <h2 className={styles.showcaseTitle}>Featured Products</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <div className={styles.productGrid}>
            {products.map(product => (
              // 2. Wrap the card in a Link component
              <Link to={`/product/${product._id}`} key={product._id} className={styles.productLink}>
                <div className={styles.productCard}>
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>₹{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;