import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from './AuthForm.module.css'; // Import the CSS module

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      login(data);
      navigate('/');
    } catch (error) {
      console.error(error.response.data);
      alert('Invalid credentials!');
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className={styles.authForm}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>Login</button>
        </form>
        <div className={styles.switchLink}>
          New User? <Link to="/register">Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;