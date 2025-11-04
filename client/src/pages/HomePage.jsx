import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import styles from './HomePage.module.css';
import Pagination from '../components/common/Pagination.jsx';
import HeroCarousel from '../components/home/HeroCarousel.jsx'; // 1. Import Carousel

const HomePage = () => {
  const { pageNumber = 1 } = useParams();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products?pageNumber=${pageNumber}`);
        setProducts(data.products);
        setPage(data.page);
        setPages(data.pages);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, [pageNumber]);

  return (
    <div className={styles.homePage}>
      {/* 2. Replace the old banner with the new carousel component */}
      <HeroCarousel />

      <section className={styles.showcase}>
        <h2 className={styles.showcaseTitle}>Latest Products</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <>
            <div className={styles.productGrid}>
              {products.map(product => (
                <Link to={`/product/${product._id}`} key={product._id} className={styles.productLink}>
                  <div className={styles.productCard}>
                    <img src={product.image} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>₹{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
            <Pagination pages={pages} page={page} />
          </>
        )}
      </section>
    </div>
  );
};

export default HomePage;