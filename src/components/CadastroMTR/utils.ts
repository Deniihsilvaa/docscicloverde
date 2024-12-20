// src/components/CadastroMTR/utils.ts
import { supabase } from "../../services/supabase";
import { MTRData } from "./types";

export const fetchData = async (): Promise<MTRData[]> => {
  const { data, error } = await supabase.from("baseMtr").select("*");
  if (error) throw new Error("Erro ao carregar os dados!");
  return data as MTRData[];
};

export const searchMTRs = async (
  search: string,
  dateStart: Date | null,
  dateEnd: Date | null,
  selectSituacao: string | null
): Promise<MTRData[]> => {
  let query = supabase.from("baseMtr").select("*");

  if (search) {
    query = query.ilike("mtr", `%${search}%`);
  }

  if (dateStart && dateEnd) {
    query = query
      .gte("dataEmissao", dateStart.toISOString())
      .lte("dataEmissao", dateEnd.toISOString());
  } else if (dateStart || dateEnd) {
    throw new Error("Por favor, preencha ambas as datas para filtrar por período!");
  }

  if (selectSituacao) {
    query = query.eq("situacao", selectSituacao);
  }

  const { data, error } = await query;
  if (error) throw error;

  return data as MTRData[];
};

export const onDelete = async (id: number) => {
  const { error } = await supabase.from("baseMtr").delete().eq("id", id);
  if (error) throw error;
};