// src/hooks/ProtectedRoute.jsx
import  { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session); // Verifica se há sessão ativa
      setLoading(false); // Finaliza o carregamento
    };

    checkSession();
  }, []);

  if (loading) {
    // Pode substituir por um spinner ou qualquer outro indicador visual
    return <div>Carregando...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
