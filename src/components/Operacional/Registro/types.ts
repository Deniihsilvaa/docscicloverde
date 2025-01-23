import {supabase} from "../../../services/supabase";
import {fetchCollaborators} from "../../../api/Operacional/ApiOp";

export interface FormDataPros {
  id?: string | number;
  nome?: string;
  cpf?: string | null;
  rg?: string;
  data_nascimento?: Date | string | null;
  estado_civil?: string;
  endereco?: string;
  telefone?: string | null;
  salario?: number;
  data_admissao?: Date | string | null;
  carteira_trabalho?: string;
  pis?: string;
  departamento?: string;
  cargo?: string;
  observacoes?: string;
  state: boolean;
  user_id?: null;
}

export interface FormData {
  nome?: string;
  cpf: string | null;
  rg?: string;
  data_nascimento?: Date | null; 
  estado_civil?: string;
  endereco?: string;
  telefone?: string;
  salario?: number;
  data_admissao?: Date | null; 
  carteira_trabalho?: string;
  pis?: string;
  departamento?: string;
  cargo?: string;
  observacoes?: string;
  state: boolean;
  user_id?: null;
}

export type FormRegistoColabProps = {
  initialValues?: Partial<FormDataPros>;
  onSubmit?: (data: FormDataPros) => void | Promise<void>;
};
export interface TableRegistroColabProps {
  data: FormDataPros[];
  onEdit: (data: FormDataPros) => void;
  onDelete: (data: FormDataPros) => void;
}
export interface ColaboradorProps {
  id?: number | string;
  nome: string;
  cpf: string | null;
  rg: string;
  data_nascimento: Date | null;
  estado_civil: string;
  endereco: string;
  telefone: string;
  salario: number;
  data_admissao: Date | null;
  carteira_trabalho: string;
  pis: string;
  departamento: string;
  cargo: string;
  observacoes: string;
  state: boolean;
}
 export const fetchDataColaboradores = async (idsearchTerm: string) => {
   const response = await fetchCollaborators(idsearchTerm);
   if (!response)  throw new Error("Erro ao carregar os dados!");   
   return response 
  };




  
export interface InputMenuProps {
  row: FormDataPros;
  onEdit: (data: FormDataPros) => void;
  setRow: React.Dispatch<React.SetStateAction<FormDataPros[]>>;
}
export const deletarColaborador = async (id: number) => {
  const { error } = await supabase.from("base_colab").delete().eq("id", id);
  if (error){
    return error.message
  }
  return true
};

// coletar login dos usuarios id_user e name
export const ExtractLogins = async () => {
  const { data, error } = await supabase.from("viewbase_user").select("user_id,email");
  if (error) throw new Error("Erro ao carregar os dados!");
  return data
}

export const handleOnSubmit = async (dados: FormDataPros): Promise<boolean> => {
  try {
    const { id, ...dadosSemId } = dados;
    
    // Validação básica dos dados
    if (!dadosSemId.nome || !dadosSemId.cpf) {
      throw new Error("Dados obrigatórios não fornecidos");
    }
    
    if (id) {
      console.log("Dados para alterar:", dadosSemId);
      const {data, error } = await supabase
      .from("base_colab")
      .update(dadosSemId)
      .eq("id", id)
      .select();
      console.log("Dados atualizados:", data);
      
      if (error) {
        console.error("Erro detalhado do Supabase:", {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        throw new Error(`Erro ao atualizar registro: ${error.message}`);
      }

      if (!data || data.length === 0) {
        console.warn("Nenhum registro foi atualizado");
      } else {
        console.log("Registro atualizado com sucesso:", data);
      }
    } else {
      // Inserção de novo registro
      const { error: insertError } = await supabase
        .from("base_colab")
        .insert([dadosSemId]);

      if (insertError) {
        throw new Error(`Erro ao inserir registro: ${insertError.message}`);
      }
    }

    return true;
  } catch (error) {
    // Log detalhado do erro
    console.error("Erro na operação do Supabase:", {
      erro: error instanceof Error ? error.message : 'Erro desconhecido',
      dados: { ...dados, cpf: '***' }, // Log seguro, ocultando dados sensíveis
      operacao: id? 'update' : 'insert'
    });

    // Re-throw do erro para tratamento adequado no componente
    throw error;
  }
};
