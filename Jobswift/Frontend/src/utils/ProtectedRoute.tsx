import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthLogin';

const ProtectedRoute: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const token = sessionStorage.getItem('authToken');

    if (!isAuthenticated || !token) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
