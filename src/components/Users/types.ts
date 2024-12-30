// src/components/Users/types.ts
import { supabase } from "../../services/supabase";
export interface PainelFinanceiroProps {
  salario?: number;
  cesta_basica?: number;
  vt?: number;
  plano_saude?: string;
  vale_refeicao?: boolean;
}


export const loadingDateColaborador = async (
  user: string | number
): Promise<PainelFinanceiroProps | null> => {
  const { data, error } = await supabase
    .from("viewbaseBenefColab")
    .select("*")
    .eq("user_id", user)
    .single();

  if (error) throw error;
  return data ? (data as PainelFinanceiroProps) : null;

};

