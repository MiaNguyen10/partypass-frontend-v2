import { Navigate, Outlet, useLocation } from 'react-router';

const ProtectedRoute = () => {
  const location = useLocation();
  const token = sessionStorage.getItem('token');

  if (!token) {
    return (
      // <Navigate to={`${pages.loginPath}`} state={{ from: location }} replace />
      <Navigate to="/landingpage" state={{ from: location }} replace />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
