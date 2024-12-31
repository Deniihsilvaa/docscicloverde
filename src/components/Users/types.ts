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
export interface PagamentoProps {
  valor: number;
  status: string;
  data_pagamento: string;
  user_id: string;
  mes_referente: string;
  url?: string;
}

export const fetchPagamentos = async (anoSelecionado: number) => {
  const { data, error } = await supabase
    .from("base_pagamentos")
    .select("url,valor,status,data_pagamento,user_id,mes_referente")
    .eq("ano", anoSelecionado)
    .eq("type_pg", "wage")
    .order("data_pagamento", { ascending: true });
  if (error) {
    console.error("Erro ao buscar pagamentos", error);
  } else {
    console.log("Pagamentos carregados", data);
    return data || [];
  }
};
export const fetchPagamentosAdiantamento = async (anoSelecionado: number) => {
  const { data, error } = await supabase
    .from("base_pagamentos")
    .select("url,valor,status,data_pagamento,user_id,mes_referente")
    .eq("ano", anoSelecionado)
    .eq("type_pg", "loan")
    .order("data_pagamento", { ascending: true });
  if (error) {
    console.error("Erro ao buscar pagamentos", error);
  } else {
    console.log("Pagamentos carregados", data);
    return data || [];
  }
};
