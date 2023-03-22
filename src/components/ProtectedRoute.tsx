import React from 'react';
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from '../context/AuthContext';

type Props = {
    page: React.FC,
    adminOnly?: boolean
}

const ProtectedRoute: React.FC<Props> = ({ page: Page, adminOnly }) => {
    const { userAuth, userData } = useAuth();
    const location = useLocation();

    if (!userAuth) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    if (adminOnly && userData && !userData.isAdmin) {
        return (
            <Navigate
                to="unauthorized"
                state={{ from: location }}
                replace
            />
        );
    }

    return <Page />;
};

export default ProtectedRoute;