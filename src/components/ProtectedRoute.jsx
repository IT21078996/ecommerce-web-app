import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Spinner from '../components/Spinner.jsx';

const ProtectedRoute = ({ children, roles }) => {
    const { user, loading } = useAuth();

    // If still checking token, don't render anything yet
    if (loading) {
        return <Spinner />;
    }

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
