import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx'; // Make sure this path is correct

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext); // Get login function
  const navigate = useNavigate(); // Get navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/register', { name, email, password });
      login(data); // <-- Use the context login function
      navigate('/'); // <-- Redirect to homepage
    } catch (error) {
      console.error(error.response.data);
      alert('Error during registration!');
    }
  };

  const formStyle = { display: 'flex', flexDirection: 'column', width: '300px', margin: 'auto' };
  const inputStyle = { margin: '0.5rem 0', padding: '0.5rem' };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Register</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        {/* Form inputs are the same */}
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} required />
        <button type="submit" style={inputStyle}>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;