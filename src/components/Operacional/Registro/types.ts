import {supabase} from "../../../services/supabase";

export interface FormDataProsp {
  nome?: string;
  cpf?: string;
  rg?: string;
  dataNascimento?: Date | null;
  estadoCivil?: string;
  endereco?: string;
  telefone?: string;
  salario?: string;
  dataAdmissao?: Date | null;
  carteiraTrabalho?: string;
  pis?: string;
  departamento?: string;
  cargo?: string;
  observacoes?: string;
  state:any;
  user_id?:string
}

export interface FormData {
  nome?: string;
  cpf?: string;
  rg?: string;
  dataNascimento?: Date | null; // Change the type here
  estadoCivil?: string;
  endereco?: string;
  telefone?: string;
  salario?: string;
  dataAdmissao?: Date | null; // Change the type here
  carteiraTrabalho?: string;
  pis?: string;
  departamento?: string;
  cargo?: string;
  observacoes?: string;
  state:boolean;
}

export interface TableRegistroColabProps {
  data: FormDataProsp[];
  onEdit: (data: FormDataProsp) => void;
  onDelete: (data: FormDataProsp) => void;
}
export interface ColaboradorProps {
  id: number;
  nome: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
  estadoCivil: string;
  endereco: string;
  telefone: string;
  salario: string;
  dataAdmissao: Date | null;
  carteiraTrabalho: string;
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
  row: ColaboradorProps;
  setRow: React.Dispatch<React.SetStateAction<ColaboradorProps[]>>;
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
  try{
    const {error } = await supabase.from("base_colab").insert(dados);
    if (error){
      console.log(error.message)
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