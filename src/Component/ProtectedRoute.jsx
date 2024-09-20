import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import useStore from '../Store';

const ProtectedRoute = ({ children }) => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken"); 
    const { login } = useStore();
    const location = useLocation();

    // Check if user is authenticated based on the cookie
    const isAuthenticated = login || authToken; 


    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
};

export default ProtectedRoute;
