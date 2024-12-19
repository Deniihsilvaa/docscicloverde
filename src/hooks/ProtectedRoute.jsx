// src/hooks/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ userRole, requiredRole, children }) => {
  console.log('ProtectedRoute:',userRole + ' ' + requiredRole)
  if(!userRole) return <Navigate to="/login" replace />
  
  if (userRole !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;


ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Componentes protegidos que serão renderizados
  userRole: PropTypes.string, // Role do usuário logado
  requiredRole: PropTypes.string.isRequired, // Role exigida para acesso
};