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
  id: number;
  email: string;
  data_coleta: string | Date;
  pesagem_inicial: number;
  pesagem_final: number;
  item_coletado: string;
  peso_total: number;
  preco_por_kg: number;
  valor_total: number;
  responsavel: string;
  telefone: string;
  numero_request: number;
  url_nuvem: string;
  historico_aprovacao: string;
  status_confirmacao: string;
  nfe: number;
}
export const handleSubmintRequestProduct = async (dados: FormData) => {
  try {
    if (dados.id) {
      const { id, ...dadosParaAtualizar } = dados;

      const { error } = await supabase
        .from("base_request")
        .update(dadosParaAtualizar)
        .eq("id", id);

      if (error) {
        console.error("Erro ao atualizar dados:", error);
        throw new Error("Erro ao atualizar os dados!");
      }
      return true;
    }
    const { id, ...dadosParaSalvar } = dados;

    const { error } = await supabase
      .from("base_request")
      .insert([dadosParaSalvar]);
    if (error) {
      console.error("Erro ao inserir dados:", error);
      throw new Error("Erro ao salvar os dados!");
    }
    return true;
  } catch (err) {
    console.error("Erro durante o processo de submissão:", err);
    throw new Error("Falha na operação. Tente novamente.");
  }
};

export const viewTableRequestProduct = async () => {
  const { data, error } = await supabase
  .from("base_request")
  .select("*")
  .order("numero_request", { ascending: false });
  if (error){
    console.log(error.message)
    return error.message
  }
  return data;
};
export const deletTableRequestProduct = async (id: number) => {
  const { error } = await supabase.from("base_request").delete().eq("id", id);
  if (error) {
    return error.message;
  }
  return true;
};

export const handleOnSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const { data, error } = await supabase.from("service_requests").insert([]);

  if (error) {
    console.error("Erro ao salvar dados no Supabase:", error);
    return false;
  }
  return data;
};
