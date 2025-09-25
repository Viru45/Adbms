import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/auth/login',
        { email, password },
        config
      );

      console.log(data);
      alert('Login successful!');
    } catch (error) {
      console.error(error.response.data);
      alert('Invalid credentials!');
    }
  };
  
  const formStyle = { display: 'flex', flexDirection: 'column', width: '300px', margin: 'auto' };
  const inputStyle = { margin: '0.5rem 0', padding: '0.5rem' };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Login</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          required
        />
        <button type="submit" style={inputStyle}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;