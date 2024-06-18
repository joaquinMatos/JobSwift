/* import React from 'react';
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
 */

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthLogin';

interface ProtectedRouteProps {
    canActivate: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ canActivate }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated && !canActivate) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
