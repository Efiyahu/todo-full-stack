import { Outlet, Navigate } from 'react-router-dom';

const Protected = () => {
  const user = localStorage.getItem('user');
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default Protected;
