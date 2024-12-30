import React, { useState, useEffect } from "react";
import { ColaboradorProps } from "../types";
import { supabase } from "../../../../services/supabase";
import { useAuth } from "../../../../hooks/AuthContext";
import { useToast } from "../../../Toast/ToastContext";
export default function ListInforUser() {
  const [dados, setDados] = useState<ColaboradorProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { showToast } = useToast();

  const fetchColaboradores = async () => {
    try {
      const { data, error } = await supabase
        .from("base_colab")
        .select("*")
        .eq("user_id", user?.user_id);

      if (error) {
        showToast({
          severity: "error",
          summary: "Erro",
          detail: error.message,
          life: 5000,
        });
        throw new Error("Erro ao carregar os dados!");
      }

      setDados(data);
      showToast({
        severity: "success",
        summary: "Sucesso",
        detail: "Dados carregados com sucesso",
        life: 1000,
      });
    } catch (error) {
      showToast({
        severity: "error",
        summary: "Erro",
        detail: "Erro ao carregar os dados!",
        life: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColaboradores();
  }, []);

  return (
    <>
      {loading ? (
        <p className="text-center text-gray-500">Carregando...</p>
      ) : (
        <>
          {dados.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-4 scrollbar-x-auto">
                <ul className="space-y-2">
                  {dados.map((colab, index) => (
                    <li
                      key={index}
                      className="p-4 rounded-lg shadow-sm bg-gray-50"
                    >
                      <p className="text-lg font-semibold">
                        <span className="font-bold">Email:</span> {user?.email}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-bold">Cargo:</span> {colab.cargo}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-bold">Data de Admissão:</span>{" "}
                        {new Date(colab.dataAdmissao).toLocaleDateString()}
                      </p>
                      <p className="mt-2 text-lg font-semibold">
                        <span className="font-bold">Salário:</span>{" "}
                        {colab.salario.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <p className="py-6 text-center text-gray-500">
              Nenhum colaborador encontrado.
            </p>
          )}
        </>
      )}
    </>
  );
}
