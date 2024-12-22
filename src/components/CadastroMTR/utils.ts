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
export const onSalvUrl = async (url: string, id: number) => {
  const { error } = await supabase.from("baseMtr").update({ url }).eq("id", id);
  if (error) throw error;
}
export const onDeleteUrl = async (id: number) => {
  const { error } = await supabase.from("baseMtr").update({ url: null }).eq("id", id);
  if (error) throw error;
}
export const salvarDadosNoSupabase = async (tableData: any) => {
  try {
    if (!tableData || tableData.length === 0) {
      return {
        a: "Tabela Vazia",
      };
    };

    const { data: existingMtrs, error: fetchError } = await supabase
      .from('baseMtr')
      .select('mtr ,situacao');

    if (fetchError) {
      console.error('Erro ao buscar MTRs existentes:', fetchError);
      return null;
    }

    const existingMtrSet = new Set(existingMtrs.map((item: any) => item.mtr));
    const registrosDuplicados = tableData.filter((row: any) =>
      existingMtrSet.has(row.mtr)
    );

    const novosRegistros = tableData.filter(
      (row: any) => !existingMtrSet.has(row.mtr)
    );

    // TODO: Implementar a lógica de salvamento no Supabase
    if (novosRegistros.length > 0) {
      const { error: insertError } = await supabase
        .from('baseMtr')
        .insert(novosRegistros);


        console.log("dados inseridos",novosRegistros)
      if (insertError) {
        console.error('Erro ao salvar dados no Supabase:', insertError);
        return null;
      }
    }

    if (registrosDuplicados.length > 0) {
      return {
        d: registrosDuplicados.length,
      };
    }


    return true;
  } catch (error) {
    console.error('Erro geral no processo de salvamento:', error);
    return null;
  }
};

