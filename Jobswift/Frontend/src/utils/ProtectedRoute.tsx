import React from 'react';
import { Route, RouteProps, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthLogin';

interface ProtectedRouteProps extends RouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  ...rest
}) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Route {...rest} element={element} />;
};

export default ProtectedRoute;
