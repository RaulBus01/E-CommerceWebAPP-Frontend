import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

const PublicRoute: React.FC = () => {
  const { token } = useAuth() as { token: string };

  return !token ? <Outlet /> : <Navigate to="/user" />;
};

export default PublicRoute;
