import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { fetchCollaborators } from "../api/ApiLogin";
import { useNavigate } from "react-router-dom";

// Tipagem do Usuário
export interface User {
  role: string;
  user_id: string;
  email: string;
}

// Tipagem do Contexto de Autenticação
export interface AuthContextProps {
  user: User | null;
  loading: boolean;
  logout: () => void;
  error: string | null;
}

// Criação do Contexto
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Provedor do Contexto
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Função para buscar o usuário autenticado
  const fetchDataUser = async (token: string) => {
    setLoading(true);
    setError(null); // Reseta o estado de erro
    try {
      if (!token) throw new Error("Token não encontrado");

      const data = await fetchCollaborators(token);
      if (!data) throw new Error("Erro ao buscar usuário AuthContext");

      setUser({
        user_id: data.user_id || "",
        role: data.role || "",
        email: data.email || "",
      });
    } catch (err: any) {
      console.error("Erro ao autenticar:", err.message || err);
      setUser(null);
      setError("Erro ao autenticar: " + (err.message || "Erro desconhecido"));
    } finally {
      setLoading(false);
    }
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setUser(null);
    navigate("/login");
  };

  // Efeito para buscar o usuário ao montar o componente
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetchDataUser(token);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Memoização do valor do contexto para evitar renders desnecessárias
  const value = useMemo(
    () => ({
      user,
      loading,
      logout,
      error,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      {error && <div className="error">{error}</div>} {/* Exibe mensagens de erro */}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto de autenticação
const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};

export { AuthContext, AuthProvider, useAuth };
