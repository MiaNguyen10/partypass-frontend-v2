import { Navigate, Outlet, useLocation } from "react-router";
import pages from "../config/pages";

const ProtectedRoute = () => {
  const location = useLocation();
  const token = sessionStorage.getItem("token");

  if (!token) {
    return (
      <Navigate to={`${pages.loginPath}`} state={{ from: location }} replace />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
