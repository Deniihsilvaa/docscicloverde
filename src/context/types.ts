// src/context/types.ts
import { logarUser } from "../api/ApiLogin";
import { supabase } from "../services/supabase";
import { useAuth } from "../hooks/AuthContext";

export const handleLogin = async (
  e: React.FormEvent<HTMLFormElement>,
  email: string,
  password: string,
  setError: (message: string) => void,
  setSuccess: (message: string) => void,
  navigate: (path: string) => void,
  setLoading: (loading: boolean) => void
) => {
  e.preventDefault();
  setError("");
  setLoading(true);
  setSuccess("");

  if (!email || !password) {
    setLoading(false);
    setError("Por favor, preencha todos os campos.");
    return;
  }


  try {
    const response = await logarUser({ email, password }); // Passe o objeto correto

    if (!response) {
      setLoading(false);
      setError("Falha ao efetuar login.");
    } else {
      localStorage.setItem("authToken", response.token);
      setSuccess("Login efetuado com sucesso!");
      return response;
    }
  } catch (error) {
    setError("Erro ao efetuar login. Tente novamente.");
    console.error("Erro no login:", error);
  } finally {
    setLoading(false);
  }
};


export const tabeleMTR = async () => {
  const { data } = await supabase.from("baseMtr").select("*");
  return data;
};
export async function tableMTR() {
  try {
    const { data, error } = await supabase.from("baseMtr").select("*");

    if (error) {
      console.error("Error fetching tableMTR:", error);
      return null; // ou outra forma de lidar com o erro
    }

    return data; // Retorna os dados da tabela baseMtr
  } catch (err) {
    console.error("Unexpected error:", err);
    return null; // ou tratar o erro conforme necessário
  }
}
