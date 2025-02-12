import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import { Navigate, Outlet, useLocation } from "react-router";
import pages from "../config/pages";

const ProtectedRouteForRole = ({ permissionRoles }) => {
  const location = useLocation();
  const { role } = jwtDecode(sessionStorage.getItem("token"));

  if (!role || !Array.isArray(permissionRoles)) {
    console.error("Invalid role or permissionRoles:", {
      role,
      permissionRoles,
    });
    return (
      <Navigate
        to={`${pages.accessDenied}`}
        state={{ from: location }}
        replace
      />
    );
  }

  if (!permissionRoles.includes(role)) {
    return (
      <Navigate
        to={`${pages.accessDenied}`}
        state={{ from: location }}
        replace
      />
    );
  }

  return <Outlet />;
};

ProtectedRouteForRole.propTypes = {
  permissionRoles: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default ProtectedRouteForRole;
