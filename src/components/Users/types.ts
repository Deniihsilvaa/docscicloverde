// src/components/Users/types.ts
import { supabase } from "../../services/supabase";

export interface PainelFinanceiroProps {
  salario: string;
  cesta_basica: string;
  vt: string;
  plano_saude: string;
  vale_refeicao: string;
}

export const loadingDateColaborador = async (user) => {

  const { data, error } = await supabase
  .from("viewbaseBenefColab")
  .select("*")
  .eq("user_id", user)
  .single();

  if (error) throw error;
  return (data || {});
};
