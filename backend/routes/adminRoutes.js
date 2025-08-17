import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { adminDataContext } from '../context/AdminContext';

const AdminRoutes = ({ children }) => {
  const adminContext = useContext(adminDataContext);

  // Defensive check
  if (!adminContext) {
    console.error("AdminContext is not available. Make sure your component is wrapped inside <AdminContextProvider>.");
    return <Navigate to="/adminlogin" replace />;
  }

  const { isAuthenticated, loading } = adminContext;

  // Show nothing or a loader while checking auth
  if (loading) return null;

  // Not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/adminlogin" replace />;
  }

  // If authenticated, allow access
  return children;
};

export default AdminRoutes;
