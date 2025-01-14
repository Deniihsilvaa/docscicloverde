import {supabase} from "../../../services/supabase";

export interface FormDataProsp {
  id?: string | number;
  nome?: string;
  cpf?: string | null;
  rg?: string;
  data_nascimento?: Date | null;
  estado_civil?: string;
  endereco?: string;
  telefone?: string | null;
  salario?: string;
  data_admissao?: Date | null;
  carteira_trabalho?: string;
  pis?: string;
  departamento?: string;
  cargo?: string;
  observacoes?: string;
  state:boolean;
  user_id?:string | null;
}

export interface FormData {
  nome?: string;
  cpf: string | null;
  rg?: string;
  data_nascimento?: Date | null; 
  estado_civil?: string;
  endereco?: string;
  telefone?: string;
  salario?: string;
  data_admissao?: Date | null; 
  carteira_trabalho?: string;
  pis?: string;
  departamento?: string;
  cargo?: string;
  observacoes?: string;
  state:boolean;
  user_id?:string | null;
}

export type FormRegistoColabProps = {
  onSubmit: (data: FormDataProsp) => void;
  initialValues?: Partial<FormDataProsp>;
};
export interface TableRegistroColabProps {
  data: FormDataProsp[];
  onEdit: (data: FormDataProsp) => void;
  onDelete: (data: FormDataProsp) => void;
}
export interface ColaboradorProps {
  id?: number;
  nome: string;
  cpf: string | null;
  rg: string;
  data_nascimento: Date | null;
  estado_civil: string;
  endereco: string;
  telefone: string;
  salario: string;
  data_admissao: Date | null;
  carteira_trabalho: string;
  pis: string;
  departamento: string;
  cargo: string;
  observacoes: string;
  state: string;
}
 export const fetchDataColaboradores = async () => {
   const { data, error } = await supabase.from("base_colab").select("*");
   if (error)  throw new Error("Erro ao carregar os dados!");
   return data
  };
export interface InputMenuProps {
  row: FormDataProsp;
  onEdit: (data: FormDataProsp) => void;
  setRow: React.Dispatch<React.SetStateAction<FormDataProsp[]>>;
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

export const handleOnSubmit = async (dados) => {
  console.log("Typescript: Dados enviado:",dados)
  try{
    const {error } = await supabase.from("base_colab").insert(dados);
    if (error){
      throw new Error("Erro ao carregar os dados!");
    }
    return true
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao salvar dados no Supabase:", error.message);

    } else {
      console.error("Erro ao salvar dados no Supabase:", error);
  }
  }
}