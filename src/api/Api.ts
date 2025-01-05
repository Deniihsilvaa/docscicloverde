import axios from "axios";
import {supabase} from "../services/supabase"

//
const API =
  "https://backendcicloverde-chj4wpjov-denilson-silvas-projects-63b429e7.vercel.app";
export const viewTableRequestProduct = async () => {
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
export const viewTableListProducts = async () => {
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
      // Agrupar os dados por data_coleta e material
      const groupedData = data.reduce((acc, item) => {
        const key = `${item.data_coleta}-${item.material}`;
        if (!acc[key]) {
          acc[key] = {
            data_coleta: item.data_coleta,
            material: item.material,
            peso_total: 0,
            valor_total: 0,
            itens: [],
          };
        }

        acc[key].peso_total += item.peso_total || 0;
        acc[key].valor_total += item.valor_total || 0;
        acc[key].itens.push(item);

        return acc;
      }, {} as Record<string, any>);

      // Converter os dados agrupados para uma lista
      const result = Object.values(groupedData);
      console.log("Dados da lista:", result);
      return result;
    }

    return [];
  } catch (error) {
    console.error("Erro:", error);
    return false;
  }
};


export const deleteTableRequestProduct = async (id: number) => {
  try {
    //const response = await axios.delete(
     // `https://backendcicloverde-chj4wpjov-denilson-silvas-projects-63b429e7.vercel.app/api/request-products/d/${id}`
    //);
    const { data, error } = await await supabase.from("base_request").delete().eq("id", id);
    if (error) {
      console.error("Erro ao carregar os dados!", error);
      throw new Error("Erro ao carregar os dados!");
  }
    return data;
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
  return data;
};
