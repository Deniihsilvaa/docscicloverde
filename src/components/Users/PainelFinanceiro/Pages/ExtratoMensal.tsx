import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { supabase } from "../../../../services/supabase";

interface Pagamento {
  mes: number;
  valor: number;
  status: string;
  data_pagamento: string;
  user_id: string;
  mes_referente: string;
  url?: string;
}

const ExtratoMensal = () => {
  const anos = [
    { label: "2025", value: 2025 },
    { label: "2024", value: 2024 },
    { label: "2023", value: 2023 },
    { label: "2022", value: 2022 },
  ];

  const [anoSelecionado, setAnoSelecionado] = useState(2024);
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  useEffect(() => {
    const fetchPagamentos = async () => {
      const { data, error } = await supabase
        .from("base_pagamentos")
        .select("url,valor,status,data_pagamento,user_id,mes_referente")
        .eq("ano", anoSelecionado)
        .eq("type_pg", "wage")
        .order("data_pagamento", { ascending: true });
      if (error) {
        console.error("Erro ao buscar pagamentos", error);
      } else {
        console.log("Pagamentos carregados", data);
        setPagamentos(data || []);
      }
    };

    fetchPagamentos();
  }, [anoSelecionado]);

  const getPagamentoMes = (index: number) => {
    // Garantir que mes é comparado corretamente a partir da data_pagamento
    const pagamento = pagamentos.find((p) => {
      // Extrair o mês da data_pagamento (ajuste conforme o formato da sua data)
      const dataPagamento = new Date(p.data_pagamento);
      const mesPagamento = dataPagamento.getMonth(); // getMonth() retorna um valor de 0 a 11 (Janeiro = 0)

      // Comparar o mês da data com o índice (adicionando 1 ao índice para corresponder ao mês)
      return mesPagamento === index;
    });

    return pagamento || null;
  };

  // Função para definir a cor do card com base no status
  const getCardColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "bg-orange-500";
      case "pago":
        return "bg-green-500"; // Verde para concluído
      case "negado":
        return "bg-red-500"; // Vermelho para negado
      default:
        return "bg-gray-200"; // Cinza para outros casos
    }
  };

  return (
    <div className="p-d-flex p-flex-column p-ai-center">
      <div className="p-mb-4">
        <Dropdown
          value={anoSelecionado}
          options={anos}
          onChange={(e) => setAnoSelecionado(e.value)}
          placeholder="Selecione o Ano"
        />
      </div>

      <Card title={`Extrato de ${anoSelecionado}`} className="w-full">
        <div className="gap-3 p-grid p-nogutter p-justify-center p-mt-4">
          {meses.map((mes, index) => {
            const pagamento = getPagamentoMes(index);
            return (
              <div
                key={index}
                className="w-full max-w-sm m-1 p-col-12 md:p-col-6 lg:p-col-4"
              >
                <Card
                  className={`p-d-flex p-flex-column p-ai-center p-jc-between p-p-4 space-y-4 shadow-md ${getCardColor(
                    pagamento?.status || ""
                  )}`}
                >
                  <div className="flex flex-row-reverse space-x-4 space-x-reverse">
                    <span className="text-lg font-semibold text-white">
                      {mes}
                    </span>
                  </div>
                  <div className="flex flex-row-reverse space-x-4 space-x-reverse">
                    <span className="text-sm text-white">
                      Mês Ref: {pagamento?.mes_referente}
                    </span>
                  </div>

                  <div className="flex space-x-4">
                    <p></p>
                    <span className="text-2xl font-bold text-white">
                      {pagamento
                        ? `R$ ${pagamento.valor.toFixed(2)}`
                        : "(Sem dados)"}
                    </span>
                  </div>

                  <div className="flex flex-row-reverse space-x-4 space-x-reverse">
                    <div
                      className={`h-1 ${
                        pagamento?.status === "pendente"
                          ? "bg-gray-950"
                          : pagamento?.status === "pago"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    ></div>
                    <span className="mt-2 text-sm text-white">
                      {pagamento?.status}
                    </span>
                  </div>
                  {pagamento && pagamento.url && pagamento.url.length > 0 && (
  <button
    className="bg-transparent border-none p-button text-gray-950 p-mt-2 hover:bg-gray-950 hover:text-white"
    onClick={() => window.open(pagamento.url, "_blank")}
  >
    <span className="pi pi-external-link"> -- Comprovante</span>
    
  </button>
)}

                </Card>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default ExtratoMensal;
