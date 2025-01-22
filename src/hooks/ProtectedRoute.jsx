// src/hooks/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ userRole, requiredRole, children }) => {
  if (!userRole) return <Navigate to="/login" replace />;

  if (userRole !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  userRole: PropTypes.string,
  requiredRole: PropTypes.string.isRequired,
};

export default ProtectedRoute;
