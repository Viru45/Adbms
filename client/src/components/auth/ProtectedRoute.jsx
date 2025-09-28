import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Adjust path if necessary

const ProtectedRoute = () => {
  const { userInfo } = useContext(AuthContext);

  // If userInfo exists, render the protected content. Otherwise, redirect to login.
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;