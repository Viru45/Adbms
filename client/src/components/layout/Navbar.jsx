import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // Basic inline styles
  const navStyle = { display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '1rem', background: '#333', color: 'white' };
  const linkStyle = { color: 'white', textDecoration: 'none', margin: '0 0.5rem' };
  const buttonStyle = { background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1rem' };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>Home</Link>
      <div>
        {userInfo ? (
          <>
            <span style={linkStyle}>Welcome, {userInfo.name}</span>
            <button onClick={handleLogout} style={buttonStyle}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;