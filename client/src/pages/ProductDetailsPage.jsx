import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import styles from './ProductDetailsPage.module.css';

const ProductDetailsPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ✅ THIS IS THE MISSING PART
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products/${productId}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Product not found');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const addToCartHandler = () => {
    addToCart(product, Number(qty));
    navigate('/cart');
  };

  if (loading) return <p>Loading product...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className={styles.pageContainer}>
      <Link to="/" style={{ marginBottom: '1rem', display: 'inline-block' }}>Go Back</Link>
      <div className={styles.productGrid}>
        <div className={styles.productImage}>
          <img src={product.image} alt={product.name} />
        </div>
        <div className={styles.productInfo}>
          <h1>{product.name}</h1>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p>{product.description}</p>
          
          <div className={styles.detailsCard}>
            <div className={styles.price}>Price: ₹{product.price}</div>
            <div className={styles.status}>
              Status: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
            </div>

            {product.countInStock > 0 && (
              <div className={styles.status}>
                Qty:
                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <button 
              className={styles.addToCartBtn} 
              disabled={product.countInStock === 0}
              onClick={addToCartHandler}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;