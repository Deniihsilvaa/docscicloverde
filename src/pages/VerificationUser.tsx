// src/pages/VerificationUser.TSX
import { Navigate } from "react-router-dom";
import React,{useEffect,useState} from "react";
import { Button } from "primereact/button";
import { useAuth } from "../hooks/AuthContext";

const VerificationUser = ( ) => {
  const [role, setRole] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    if (user) {
      setRole(user.role);
      setLoading(false);
    }
    else{
      setTimeout(() => {
        setRole("Admin");//testando apenas, temos qu mudar
        console.log('Usuario nao autenticado',role);
       setLoading(false);
      }, 2000);
    }
  }, [user]);
  // Exibir feedback visual enquanto verifica o acesso
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-lg">Verificando acesso do usuário...</p>
      </div>
    );
  }

  // Se o usuário não estiver autenticado
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-500">Erro: Usuário não autenticado.</p>
        <p>
          <Button label="Voltar" onClick={() => window.history.back()} />
        </p>
      </div>
    );
  }

  // Redirecionar o usuário com base no tipo de role
  switch (role) {
    case "Admin":
      return <Navigate to="/admin/home" replace />;
    case "Colab":
      return <Navigate to="/op/home" replace />;
    default:
      return <Navigate to="/unauthorized" replace />;
  }

};

export default VerificationUser;