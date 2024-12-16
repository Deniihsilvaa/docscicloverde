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
export const tabeleMTR = async () =>{
  const { data } = await supabase.from("baseMtr").select("*");
  return data
}
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
