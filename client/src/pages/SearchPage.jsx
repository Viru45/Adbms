import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import homeStyles from './HomePage.module.css'; // Reuse homepage styles

const SearchPage = () => {
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/products');
        // Filter products based on the keyword (case-insensitive)
        const filtered = data.filter(product => 
          product.name.toLowerCase().includes(keyword.toLowerCase())
        );
        setProducts(filtered);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, [keyword]); // Refetch when the keyword changes

  return (
    <div className={homeStyles.homePage}>
      <section className={homeStyles.showcase}>
        <h2 className={homeStyles.showcaseTitle}>Search Results for "{keyword}"</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : products.length === 0 ? (
            <p>No products found. <Link to="/">Go Back</Link></p>
        ) : (
          <div className={homeStyles.productGrid}>
            {products.map(product => (
              <Link to={`/product/${product._id}`} key={product._id} className={homeStyles.productLink}>
                <div className={homeStyles.productCard}>
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

export default SearchPage;