// src/components/Users/types.ts
import { supabase } from "../../services/supabase";
import { useAuth } from "../../hooks/AuthContext";
import {fetchPayments} from "../../api/Operacional/ApiOp"
export interface PainelFinanceiroProps {
  salario?: number;
  cesta_basica?: number;
  vt?: number;
  plano_saude?: string;
  vale_refeicao?: boolean;
}

export interface PagamentoProps {
  valor_total: number;
  status: string;
  data_pagamento: string;
  user_id: string;
  mes_referente: string;
  url?: string;
}
export const fetchPagamentos = async (anoSelecionado: number) => {
  const response = await fetchPayments(anoSelecionado)
  if (response){
    return response
  }
};

export const fetchPagamentosAdiantamento = async (anoSelecionado: number) => {
  const { user } = useAuth();
  const { data, error } = await supabase
    .from("base_pagamentos")
    .select("url,valor,status,data_pagamento,user_id,mes_referente")
    .eq("ano", anoSelecionado)
    .eq("user_id", user?.user_id)
    .order("data_pagamento", { ascending: true });
  if (error) {
    console.error("Erro ao buscar pagamentos", error);
  } else {
    return data || [];
  }
};
export interface fetchPagamentosFolhaPontoProps {
  total_horas?: string;
  total_horas_extra?: string;
  total_horas_extracem?: string;
  total_horas_ad?: string;
  total_feriado?: string;
  dias_feriado?:string;
  url?:string;
  data_folha: string;
  ano_folha?:string;
  status?:string;

}
export const fetchPagamentosFolhaPonto = async (anoSelecionado: number) => {
  const { user } = useAuth();
  if (!user) {
    console.error("Usuário não autenticado");
    return [];
  }
  
  const { data, error } = await supabase
    .from("base_folhaponto")
    .select("url,data_folha,total_horas,total_horas_extra,total_horas_extracem,total_horas_ad,total_feriado,dias_feriado,status,ano_folha")
    .eq("ano_folha", anoSelecionado)
    .eq("user_id", user.user_id)
    .order("data_folha", { ascending: true });

  if (error) {
    console.error("Erro ao buscar pagamentos", error);
  } else {
    console.log("dados de retorno",data)
    return data || [];
  }
};

