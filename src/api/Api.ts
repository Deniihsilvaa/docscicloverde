import axios from "axios";
import { supabase } from "../services/supabase";

//
const API =
  "https://backendcicloverde-chj4wpjov-denilson-silvas-projects-63b429e7.vercel.app";
export const viewTableRequestProduct = async (year?: number) => {
  // const response = await axios.get(
  //   "https://backendcicloverde-chj4wpjov-denilson-silvas-projects-63b429e7.vercel.app/api/request-products"
  // );
  const { data, error } = await supabase
    .from("viewbaseRequest")
    .select("*")
    .order("numero_request", { ascending: false });
  if (error) {
    console.error("Erro ao carregar os dados!", error);
    throw new Error("Erro ao carregar os dados!");
  }

  return data;
};
export const viewTableListProducts = async (): Promise<
  {
    material: string;
    year: number;
    months: { [key: string]: number };
    peso_total: number;
  }[]
> => {
  try {
    const { data, error } = await supabase
      .from("viewbaseRequest")
      .select(
        "id,item_coletado,data_coleta,material,peso_total,valor_total,status_confirmacao"
      )
      .order("id", { ascending: false });

    if (error) {
      console.error("Erro ao carregar os dados!", error);
      throw new Error("Erro ao carregar os dados!");
    }

    if (data) {
      // Agrupar os dados por material, ano e distribuir os valores por mês
      const groupedData = data.reduce((acc, item) => {
        const material = item.material;
        const date = new Date(item.data_coleta);
        const year = date.getFullYear();
        const data_coleta = item.data_coleta;
        const month = date
          .toLocaleString("pt-BR", { month: "long" })
          .toLowerCase();

        const key = `${material}-${year}`;

        if (!acc[key]) {
          acc[key] = {
            material,
            data_coleta,
            year,
            months: {},
            peso_total: 0,
          };
        }

        if (!acc[key].months[month]) {
          acc[key].months[month] = 0;
        }

        acc[key].months[month] += item.peso_total || 0;
        acc[key].peso_total += item.peso_total || 0;

        return acc;
      }, {} as Record<string, { material: string; data_coleta: Date; year: number; months: { [key: string]: number }; peso_total: number }>);

      const result = Object.values(groupedData);

      console.log("Dados agrupados para a tabela com ano:", result);
      return result;
    }

    return [];
  } catch (error) {
    console.error("Erro:", error);
    return [];
  }
};

export const deleteTableRequestProduct = async (id: number) => {
  try {
    //const response = await axios.delete(
    // `https://backendcicloverde-chj4wpjov-denilson-silvas-projects-63b429e7.vercel.app/api/request-products/d/${id}`
    //);
    const { error } = await await supabase
      .from("base_request")
      .delete()
      .eq("id", id);
    if (error) {
      console.error("Erro ao carregar os dados!", error);
      throw new Error("Erro ao carregar os dados!");
    }
    return true;
  } catch (error) {
    console.log("Erro ao deletar item:", error);
    return false;
  }
};
export const listProdutc = async () => {
  //const response = await axios.get(
  //"https://backendcicloverde-chj4wpjov-denilson-silvas-projects-63b429e7.vercel.app/api/products/list"
  //);
  const { data, error } = await supabase
    .from("base_produ")
    .select("id, material,pdv")
    .order("material", { ascending: false });
  if (error) {
    console.error("Erro ao carregar os dados!", error);
    throw new Error("Erro ao carregar os dados!");
  }
  const produtos = data.map((item: any) => ({
    label: item.material,
    value: item.pdv,
  }));
  return produtos;
};

// PayRegistration
export const viewTableBasePagamentos = async ()=>{
  try{
    const {data,error} = await supabase
      .from("viewbasepagamento")
      .select("*")
      .order("data_pagamento", { ascending: false });
      
      if(error){
        throw new Error("Erro ao carregar dados")
      }
      const baseData = data.map((item: any) => ({
        id: item.id,
        user_id: item.nome,
        valor_total: item.valor_total,
        status: item.status,
        data_pagamento: item.data_pagamento,
        mes_referente: item.mes_referente,
        yearRef: item.ano,
        type_pg: item.type_pg,
        data_vencimento: item.data_vencimento

      }))
      return baseData
  }catch(error){
    console.log(error)
    return error
  }
}
export const saveOrUpdatePayment = async (payment) => {
  try {
    //definir ano e mes referente
    payment.ano = new Date(payment.data_pagamento).getFullYear();
    console.log("Dados para salvar ou alterar:", payment);
    const { id, ...rest } = payment;

    const { data, error } = id
      ? await supabase // Atualizar (se ID existir)
          .from("base_pagamentos")
          .update(rest)
          .eq("id", id)
      : await supabase // Inserir (se ID não existir)
          .from("base_pagamentos")
          .insert([rest]);

    if (error) {
      throw new Error("Erro ao salvar os dados");
    }

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao salvar ou atualizar pagamento");
  }
};
export const deletePayment = async (id: string) => {
  try {
    const {error } = await supabase
      .from("base_pagamentos")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error("Erro ao excluir o pagamento");
    }

    return true;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao excluir pagamento");
  }
};
export const listColab = async () => {
  try {
    const { data, error } = await supabase
      .from("base_colab")
      .select("*")
      .order("nome", { ascending: false });

    if (error) {
      console.error("Erro ao carregar dados de base_colab:", error.message);
      throw new Error("Não foi possível carregar os dados dos colaboradores.");
    }

    const baseData = data
      .filter((item: any) => item.user_id && item.nome)
      .map((item: any) => ({
        value: item.user_id,
        label: item.nome,
      }));

    return baseData;
  } catch (error) {
    console.error("Erro inesperado ao carregar colaboradores:", error);
    return []; // Retorna um array vazio em caso de falha
  }
};


