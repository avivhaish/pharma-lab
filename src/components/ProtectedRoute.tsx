import React from 'react';
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from '../context/AuthContext';

type Props = {
    page: React.FC
}

const ProtectedRoute: React.FC<Props> = ({ page: Page }) => {
    const { userAuth } = useAuth();
    const location = useLocation();

    if (!userAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return <Page />;
};

export default ProtectedRoute;