import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useIsLoggedIn = () => {
  const { pathname } = useLocation();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  React.useEffect(() => {
    if (token) {
      if (pathname === '/login' || pathname === 'register') {
        navigate('/dashboard');
      }
    }
  });
};
