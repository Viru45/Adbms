import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import homeStyles from './HomePage.module.css'; // Reuse homepage styles
import Pagination from '../components/common/Pagination.jsx';

const SearchPage = () => {
  const { keyword, pageNumber } = useParams();
  
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // We now send the keyword and page number to the backend
        const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber || 1}`);
        setProducts(data.products); // Correctly get the products array
        setPage(data.page);
        setPages(data.pages);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, [keyword, pageNumber]); // Refetch when keyword or pageNumber changes

  return (
    <div className={homeStyles.homePage}>
      <section className={homeStyles.showcase}>
        <h2 className={homeStyles.showcaseTitle}>Search Results for "{keyword}"</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : products.length === 0 ? (
            <p>No products found matching your search. <Link to="/">Go Back</Link></p>
        ) : (
          <>
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
            <Pagination pages={pages} page={page} keyword={keyword} />
          </>
        )}
      </section>
    </div>
  );
};

export default SearchPage;