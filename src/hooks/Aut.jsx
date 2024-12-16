// src/context/Aut.jsx
import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { Toast } from "primereact/toast";

export default function Aut() {
  const [user, setUser] = useState(null); // Estado inicial como null
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const navigate = useNavigate();
  const toast = useRef < Toast > null;

  // Função para buscar dados do usuário
  const getUser = useCallback(async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const { user: currentUser } = session;
        const { data: userData, error } = await supabase
          .from("base_user")
          .select("role")
          .eq("user_id", currentUser.id)
          .single();

        if (error) {
          console.error("Erro ao buscar dados do usuário:", error);
          toast.current?.show({
            severity: "error",
            summary: "Erro",
            detail: "Erro ao buscar dados do usuário",
            life: 5000,
          });
          return;
        }

        setUser({ role: userData.role }); // Atualiza o estado do usuário
      } else {
        console.log("Nenhuma sessão encontrada.");
        toast.current?.show({
          severity: "error",
          summary: "Erro",
          detail: "Nenhuma sessão encontrada.",
          life: 5000,
        });
      }
    } catch (err) {
      console.error("Erro ao verificar o usuário:", err);
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Error ao verificar o usuário",
        life: 5000,
      });
    }
  }, [toast]);

  // Lógica para redirecionamento do usuário
  const fetchUser = useCallback(async () => {
    await getUser();

    if (user?.role) {
      switch (user.role) {
        case "Admin":
          navigate("/admin/home");
          break;
        case "COLLABORATOR":
          navigate("/op/home");
          break;
        default:
          navigate("/login");
      }
    }
  }, [getUser, navigate, user]);

  // useEffect para controle do fluxo de autenticação
  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      await fetchUser();
      setLoading(false);
    };

    initialize();
  }, [fetchUser]);

  // Retorno do componente
  return <div>{loading ? <p>Carregando...</p> : <p>Redirecionando...</p>}</div>;
}
