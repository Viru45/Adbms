import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Adjust path if necessary

const AdminRoute = () => {
  const { userInfo } = useContext(AuthContext);

  // Check if userInfo exists and if the user is an admin
  // If not an admin, navigate to the homepage (or login page if you prefer)
  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;