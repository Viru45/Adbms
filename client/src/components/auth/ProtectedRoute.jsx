import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = () => {
  const { userInfo } = useContext(AuthContext);

  // If user is logged in, show the page. Otherwise, redirect to login.
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;