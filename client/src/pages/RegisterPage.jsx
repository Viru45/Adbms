import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import styles from './AuthForm.module.css'; // Import the same CSS module

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/register', { name, email, password });
      login(data);
      navigate('/');
    } catch (error) {
      console.error(error.response.data);
      alert('Error during registration!');
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit} className={styles.authForm}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className={styles.input} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} required />
          <button type="submit" className={styles.button}>Register</button>
        </form>
        <div className={styles.switchLink}>
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;