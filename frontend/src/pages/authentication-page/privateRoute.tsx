import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const PrivateRoute: React.FC<{userType: 'User' | 'Distributor' | 'Admin'}> = ({ userType }) => {
  const {userId, token, userRole } = useAuth()

  if (!token) {
    // If there's no token, redirect to login
    return <Navigate to="/login" />;
  }

  if (userRole !== userType) {
    // If the user's role doesn't match the required type, redirect to an appropriate page
    switch (userRole) {
      case 'User':
        return <Navigate to={`/user-dashboard/${userId}`}/>;
      case 'Distributor':
        return <Navigate to={`/distributor-dashboard/${userId}`} />;
      case 'Admin':
        return <Navigate to={`/admin-dashboard/${userId}`} />;
      default:
        return <Navigate to="/login" />;
    }
  }

  // If the token exists and the user type matches, render the child routes
  return <Outlet />;
};

export default PrivateRoute;