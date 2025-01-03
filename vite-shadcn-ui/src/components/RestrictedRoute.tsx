// components/RestrictedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface RestrictedRouteProps {
  children: React.ReactNode;
}

const RestrictedRoute: React.FC<RestrictedRouteProps> = ({ children }) => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const user = useSelector((state: RootState) => state.auth.user);
  
    if (isLoggedIn) {
      // Redirect based on user role
      switch (user?.role) {
        case 'Admin':
          return <Navigate to="/admin-dashboard" />;
        case 'Developer':
          return <Navigate to="/developer-dashboard" />;
        case 'Manager':
          return <Navigate to="/manager-dashboard" />;
        default:
          return <Navigate to="/login" />;
      }
    }
  
    return <>{children}</>;
  };
  

export default RestrictedRoute;
