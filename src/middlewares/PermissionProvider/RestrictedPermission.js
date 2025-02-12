import { useContext } from "react";
import PropTypes from "prop-types";

import { Outlet } from "react-router-dom"; 
import { PermissionContext } from "./PermissionProvider";
import { jwtDecode } from "jwt-decode";
import { roles } from "../../config/Constant";
import Login from "../../views/authentication/auth/Login";
import Error from "../../views/authentication/Error";

const RestrictedPermission = ({ allowedRoles, children }) => {
  const { isAllowedTo } = useContext(PermissionContext);
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Login />;
  }

  let currentUserRole = null;

  try {
    const decoded = jwtDecode(token);

    currentUserRole = roles.find((role) => role.id === decoded.role)?.value;

    if (!currentUserRole) {
      console.error("Invalid role detected!");
      return <Error />;
    }
  } catch (error) {
    console.error("Token decoding error:", error);
    return <Error />;
  }

  if (isAllowedTo(currentUserRole, allowedRoles)) {
    return children ? <>{children}</> : <Outlet />;
  }

  return children ? null : <Error />;
};
RestrictedPermission.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node
};

export default RestrictedPermission;
