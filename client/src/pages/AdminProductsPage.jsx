import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // 1. Import Link
import { AuthContext } from '../context/AuthContext';
import styles from './AdminProductsPage.module.css';
import homeStyles from './HomePage.module.css';

const AdminProductsPage = () => {
  const { userInfo } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    // ... same as before
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const createProductHandler = async () => {
    // ... same as before
  };

  // 2. Add the delete handler function
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        await axios.delete(`/api/products/${id}`, config);
        // Refetch products to update the list
        fetchProducts();
      } catch (err) {
        alert('Could not delete product.');
        console.error(err);
      }
    }
  };

  return (
    <div className={styles.adminContainer}>
      {/* ... header is the same ... */}

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

              {/* 3. Add the buttons */}
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