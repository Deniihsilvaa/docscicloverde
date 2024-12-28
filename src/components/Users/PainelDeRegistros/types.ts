import { supabase } from "../../../services/supabase";
import { useAuth } from "../../../hooks/AuthContext";
import React, { useEffect, useState } from "react";

export interface ColaboradorProps {
  user_id: string;
  nome: string;
  email: string;
  role: string;
  dataAdmissao: Date | null;
  cpf: string;
}

const { user } = useAuth();
// Função para buscar dados
export const Colaboradores = async () => {
  const { data, error } = await supabase
    .from("base_colab")
    .select("id,nome")
    .eq("user_id", user?.user_id);
  console.log('Dados de Colaboradores',data);
  if (error) {
    console.error("Erro ao carregar os dados!", error);
    throw new Error("Erro ao carregar os dados!");
  }
  return data;
};
