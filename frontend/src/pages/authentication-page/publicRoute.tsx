import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const PublicRoute: React.FC = () => {
  const { userId,token } = useAuth();

  return !token ? <Outlet /> : <Navigate to={`/user-dashboard/${userId}`} />;
};

export default PublicRoute;
