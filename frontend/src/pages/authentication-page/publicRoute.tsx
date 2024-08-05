import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface PublicRouteProps {
  redirectPath?: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ redirectPath = '/' }) => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;