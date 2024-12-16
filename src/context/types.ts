// src/context/types.ts
import { supabase } from "../services/supabase";

export const handleLogin = async (
  e: React.FormEvent<HTMLFormElement>,
  email: string,
  password: string,
  setError: (message: string) => void,
  navigate: (path: string) => void
) => {
  e.preventDefault();
  setError(""); // Limpa erros anteriores
  if (!email || !password) {
    setError("Por favor, preencha todos os campos.");
    return;
  }
  const {error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    setError(error.message); // Define mensagem de erro
  } else {
    alert("Login bem-sucedido!");
    navigate("/Aut");
  }
};
