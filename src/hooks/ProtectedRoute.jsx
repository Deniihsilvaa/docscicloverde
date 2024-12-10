import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkSessionAndRole = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false); // Usuário não autenticado
    }

    setLoading(false); // Finaliza o carregamento
  };

  useEffect(() => {
    checkSessionAndRole();
  }, []);

  // Exibe um indicador de carregamento enquanto verifica a sessão
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Redireciona para login se o usuário não estiver autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Renderiza os componentes protegidos
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Componentes protegidos que serão renderizados
};

export default ProtectedRoute;
