import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type ProtectedRouteProps = {
    canActivate: boolean;
    redirectPath?: string;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    canActivate,
    redirectPath = '/'
}) => {
    if (!canActivate) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
