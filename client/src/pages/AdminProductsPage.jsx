import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from './AdminProductsPage.module.css';
import homeStyles from './HomePage.module.css';

const AdminProductsPage = () => {
  const { userInfo } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/products');
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const createProductHandler = async () => {
    // ... this function should already be correct
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        // --- THIS IS THE FIX ---
        // Create config object with the admin's token
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        // Pass the config object to axios
        await axios.delete(`/api/products/${id}`, config);
        fetchProducts(); // Refetch products to update the list
      } catch (err) {
        alert('Could not delete product.');
        console.error(err);
      }
    }
  };

  // ... the rest of your JSX return statement
  return (
    <div className={styles.adminContainer}>
      {/* ... header ... */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div className={homeStyles.productGrid}>
          {products.map(product => (
            <div key={product._id} className={homeStyles.productCard}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>ID: {product._id}</p>
              <div className={styles.actions}>
                <Link to={`/admin/product/${product._id}/edit`}>
                  <button className={styles.editButton}>Edit</button>
                </Link>
                <button 
                  className={styles.deleteButton}
                  onClick={() => deleteHandler(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;