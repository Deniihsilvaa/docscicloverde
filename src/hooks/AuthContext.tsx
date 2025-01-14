import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { Toast } from "primereact/toast";

interface User {
  role: string;
  user_id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  fetchUserRole: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

  const showToast = useCallback((severity: string, summary: string, detail: string) => {
    toast.current?.show({
      severity,
      summary,
      detail,
      life: 5000,
    });
  }, []);

  const fetchUserRole = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        setUser(null);
        setLoading(false);
        return;
      }

      const { user: currentUser } = session;
      const { data: userData, error } = await supabase
        .from("base_user")
        .select("role,email")
        .eq("user_id", currentUser.id)
        .single();

      if (error || !userData) {
        console.error("Erro ao buscar dados do usuário:", error);
        setUser(null);
        return;
      }

      setUser({ 
        role: userData.role, 
        user_id: currentUser.id, 
        email: userData.email 
      });

    } catch (err) {
      console.error("Erro ao verificar o usuário:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      navigate("/login");
      showToast("success", "Sucesso", "Logout realizado com sucesso");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      showToast("error", "Erro", "Erro ao fazer logout");
    }
  }, [navigate, showToast]);

  useEffect(() => {
    // Initial session check
    fetchUserRole();

    // Set up auth state change subscription
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        await fetchUserRole();
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchUserRole]);

  return (
    <AuthContext.Provider value={{ user, loading, fetchUserRole, logout }}>
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