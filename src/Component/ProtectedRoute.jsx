import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import useStore from '../Store';
import useAuthStore from './store/authStore';

const ProtectedRoute = ({ children }) => {
    // const cookies = new Cookies();
    // const authToken = cookies.get("authToken"); 
    const { isLoggedIn } = useAuthStore();
    const location = useLocation();

    const isAuthenticated = isLoggedIn ; 

    
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
};

export default ProtectedRoute;
