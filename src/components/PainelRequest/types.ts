import { supabase } from "../../services/supabase";
export interface ServiceRequest {
  email: string;
  razaoSocial: string;
  os: string;
  numeroRelatorio: string;
  dataFinalizacao: Date | null;
  valorFaturado: number | null;
  solicitante: string;
  comprador: string;
  cnpj: string;
  manutencaoPreventiva: boolean;
}
export interface FormData {
    email: string;
    dataColeta: string;
    pesagemInicial: number;
    pesagemFinal: number;
    itemColetado: string;
    pesoTotal: number;
    precoPorKg: number;
    valorTotal: number;
    responsavel: string;
    telefone: string;
    numeroRequest: number;
    urlNuvem: string;
}

export const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.from("service_requests").insert([]);

    if (error) {
      console.error("Erro ao salvar dados no Supabase:", error);
      return false
    }
    return (
        data: string
    )
}