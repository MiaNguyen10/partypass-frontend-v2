import { createContext, useCallback } from "react";
import PropTypes from "prop-types";

export const PermissionContext = createContext();

export const PermissionProvider = ({ children }) => {
  const isAllowedTo = useCallback((userRole, allowedRoles) => {
    return allowedRoles.includes(userRole);
  }, []);

  return (
    <PermissionContext.Provider value={{ isAllowedTo }}>
      {children}
    </PermissionContext.Provider>
  );
};

PermissionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
