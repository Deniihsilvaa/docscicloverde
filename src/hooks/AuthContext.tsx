import React,{ createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { Toast } from "primereact/toast";

interface User {
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  fetchUserRole: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

  // Função para buscar o papel do usuário
  const fetchUserRole = useCallback(async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        toast.current?.show({
          severity: "error",
          summary: "Erro",
          detail: "Nenhuma sessão encontrada.",
          life: 5000,
        });
        navigate("/login");
        return;
      }

      const { user: currentUser } = session;
      const { data: userData, error } = await supabase
        .from("base_user")
        .select("role")
        .eq("user_id", currentUser.id)
        .single();

      if (error || !userData) {
        toast.current?.show({
          severity: "error",
          summary: "Erro",
          detail: "Erro ao buscar dados do usuário",
          life: 5000,
        });
        navigate("/login");
        return;
      }

      setUser({ role: userData.role });

      // Redirecionamento baseado no papel
      switch (userData.role) {
        case "Admin":
          navigate("/admin/home");
          break;
        case "COLLABORATOR":
          navigate("/op/home");
          break;
        default:
          navigate("/login");
      }
    } catch (err) {
      console.error("Erro ao verificar o usuário:", err);
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Erro ao verificar o usuário",
        life: 5000,
      });
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Inicializa o contexto ao montar
  useEffect(() => {
    fetchUserRole();
  }, [fetchUserRole]);

  return (
    <AuthContext.Provider value={{ user, loading, fetchUserRole }}>
      {children}
      <Toast ref={toast} />
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};
