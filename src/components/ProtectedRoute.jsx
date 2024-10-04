import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const ProtectedRoute = ({ children, roles }) => {
    const { user } = useAuth();

    // If user is not logged in, redirect to login page
    if (!user) {
        return <Navigate to="/login" />;
    }

    // If user doesn't have the required role, redirect to the dashboard
    if (!roles.includes(user.role)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
