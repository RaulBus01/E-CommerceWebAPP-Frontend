import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectPath = '/login' }) => {
  const { isAuthenticated } = useAuth();


  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  

  return <Outlet />;
};

export default ProtectedRoute;