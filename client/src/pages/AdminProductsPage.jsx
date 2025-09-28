import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from './AdminProductsPage.module.css';
import homeStyles from './HomePage.module.css';
import Pagination from '../components/common/Pagination.jsx';

const AdminProductsPage = () => {
  const { userInfo } = useContext(AuthContext);
  const { pageNumber } = useParams() || { pageNumber: 1 };
  
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/products?pageNumber=${pageNumber}`);
      setProducts(data.products); // <-- THIS IS THE FIX
      setPage(data.page);
      setPages(data.pages);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [pageNumber]);

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new sample product?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await axios.post('/api/products', {}, config);
        fetchProducts(); 
      } catch (err) {
        alert('Could not create product. See console for details.');
        console.error(err);
      }
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await axios.delete(`/api/products/${id}`, config);
        fetchProducts();
      } catch (err) {
        alert('Could not delete product.');
        console.error(err);
      }
    }
  };

  return (
    <div className={styles.adminContainer}>
      <div className={styles.header}>
        <h1>Manage Products</h1>
        <button onClick={createProductHandler} className={styles.createButton}>
          Create Product
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
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
          <Pagination pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </div>
  );
};

export default AdminProductsPage;