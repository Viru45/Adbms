import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from './ProductEditPage.module.css';

const ProductEditPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${productId}`);
        setName(data.name);
        setPrice(data.price);
        setImage(data.image);
        setBrand(data.brand);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setDescription(data.description);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [productId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.put(
        `/api/products/${productId}`,
        { name, price, image, brand, category, countInStock, description },
        config
      );
      alert('Product Updated!');
      navigate('/admin/products');
    } catch (error) {
      console.error(error);
      alert('Product update failed.');
    }
  };

  if (loading) return <p>Loading product details...</p>;

  return (
    <div className={styles.editContainer}>
      <form onSubmit={submitHandler} className={styles.editForm}>
        <h1>Edit Product</h1>

        <div className={styles.formGroup}>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        {/* Repeat for all other fields... */}
        <div className={styles.formGroup}>
          <label>Price</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Image URL</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Brand</label>
          <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Category</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Count In Stock</label>
          <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <button type="submit" className={styles.updateButton}>Update</button>
      </form>
    </div>
  );
};

export default ProductEditPage;