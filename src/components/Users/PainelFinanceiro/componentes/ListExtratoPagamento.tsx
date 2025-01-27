import React from "react";
import { Card } from "primereact/card";
import { PagamentoProps } from "../../types";




interface ListExtratoPagamentoProps {
  pagamentos: PagamentoProps[];
  anoSelecionado: number;
}
const ListExtratoPagamento: React.FC<ListExtratoPagamentoProps> = ({ pagamentos, anoSelecionado }) => {

  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];

  const getPagamentoMes = (index: number) => {
    const pagamento = pagamentos.find((p) => {
      const dataPagamento = new Date(p.data_pagamento);
      return dataPagamento.getMonth() === index;
    });
    return pagamento || null;
  };

  const getCardColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "bg-orange-500";
      case "pago":
        return "bg-green-500";
      case "negado":
        return "bg-red-500";
      default:
        return "bg-gray-200";
    }
  };


  return (
    <div className="p-d-flex p-flex-column p-ai-center">
       
      <Card title={`Extrato de ${anoSelecionado}`} className="w-full">
        <div className="gap-3 p-grid p-nogutter p-justify-center p-mt-4">
          {meses.map((mes, index) => {
            const pagamento = getPagamentoMes(index);
            return (
              <div key={index} className="w-full max-w-sm m-1 p-col-12 md:p-col-6 lg:p-col-4">
                <Card
                  className={`p-d-flex p-flex-column p-ai-center p-jc-between p-p-4 space-y-4 shadow-md ${getCardColor(pagamento?.status || "")}`}
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
                    <span className="text-2xl font-bold text-white">
                      {pagamento ? `R$ ${pagamento.valor_total.toFixed(2)}` : "(Sem dados)"}
                    </span>
                  </div>
                  <div className="flex flex-row-reverse space-x-4 space-x-reverse">
                    <div className={`h-1 ${getCardColor(pagamento?.status || "")}`} />
                    <span className="mt-2 text-sm text-white">
                      {pagamento?.status}
                    </span>
                  </div>
                  {pagamento?.url && pagamento.url.length > 0 && (
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

export default ListExtratoPagamento;
