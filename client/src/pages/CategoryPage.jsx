import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import homeStyles from './HomePage.module.css'; // Reuse homepage styles

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products?category=${categoryName}`);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    fetchProductsByCategory();
  }, [categoryName]);

  return (
    <div className={homeStyles.homePage}>
      <section className={homeStyles.showcase}>
        <h2 className={homeStyles.showcaseTitle}>{categoryName}</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : products.length === 0 ? (
            <p>No products found in this category. <Link to="/">Go Back</Link></p>
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

export default CategoryPage;