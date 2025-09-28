import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const { userInfo, updateUserInfo } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        // Fetch user profile
        const { data: userData } = await axios.get('/api/users/profile', config);
        setName(userData.name);
        setEmail(userData.email);

        // Fetch user orders
        const { data: ordersData } = await axios.get('/api/orders/myorders', config);
        setOrders(ordersData);
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };
    fetchUserData();
  }, [userInfo.token]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      try {
        const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.put('/api/users/profile', { name, email, password }, config);
        updateUserInfo(data); // Update global state
        alert('Profile Updated Successfully!');
        setPassword('');
        setConfirmPassword('');
      } catch (error) {
        alert('Failed to update profile.');
      }
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileForm}>
        <h2>User Profile</h2>
        <form onSubmit={submitHandler}>
          <div className={styles.formGroup}><label>Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div className={styles.formGroup}><label>Email Address</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div className={styles.formGroup}><label>New Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
          <div className={styles.formGroup}><label>Confirm New Password</label><input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></div>
          <button type="submit" className={styles.updateButton}>Update</button>
        </form>
      </div>
      <div className={styles.profileOrders}>
        <h2>My Orders</h2>
        <table className={styles.ordersTable}>
          <thead>
            <tr><th>ID</th><th>DATE</th><th>TOTAL</th><th>PAID</th></tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>₹{order.totalPrice}</td>
                <td style={{ color: order.isPaid ? 'green' : 'red' }}>{order.isPaid ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfilePage;