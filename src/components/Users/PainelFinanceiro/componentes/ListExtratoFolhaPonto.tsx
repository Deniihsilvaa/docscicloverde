import React from "react";
import { Card } from "primereact/card";
import { fetchPagamentosFolhaPontoProps } from "../../types";

interface ListExtratoFolhaPontoProps {
  dadosFolha: fetchPagamentosFolhaPontoProps[];
  anoSelecionado: number;
}
const ListExtratoFolhaPonto: React.FC<ListExtratoFolhaPontoProps> = ({ dadosFolha, anoSelecionado }) => {

  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];

  const getPagamentoMes = (index: number) => {
    const dateFolha = dadosFolha.find((p) => {
      const data_folha = new Date(p.data_folha);
      return data_folha.getMonth() === index;
    });
    return dateFolha || null;
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
            const dateFolha = getPagamentoMes(index);
            return (
              <div key={index} className="w-full max-w-sm m-1 p-col-12 md:p-col-6 lg:p-col-4">
                <Card
                  className={`p-d-flex p-flex-column p-ai-center p-jc-between p-p-4 space-y-4 shadow-md ${getCardColor(dateFolha?.status || "")}`}
                >
                  <div className="flex flex-row-reverse space-x-4 space-x-reverse">
                    <span className="text-lg font-semibold text-white">
                      {mes}
                    </span>
                  </div>
                  <div className="flex flex-row-reverse space-x-4 space-x-reverse">
                    <span className="text-sm text-white">
                      Mês Ref: {dateFolha?.data_folha}
                    </span>
                  </div>
                  <div className="flex space-x-4">
                    <span className="text-2xl font-bold text-white">
                      {dateFolha ? `R$ ${dateFolha.total_horas}` : "(Sem dados)"}
                    </span>
                  </div>
                  <div className="flex flex-row-reverse space-x-4 space-x-reverse">
                    <div className={`h-1 ${getCardColor(dateFolha?.status || "")}`} />
                    <span className="mt-2 text-sm text-white">
                      {dateFolha?.status}
                    </span>
                  </div>
                    <button
                      className="bg-transparent border-none p-button text-gray-950 p-mt-2 hover:bg-gray-950 hover:text-white"
                      onClick={() => window.open(dateFolha?.url, "_blank")}
                    >
                      <span className="pi pi-external-link"> -- Comprovante</span>
                    </button>
               
                </Card>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default ListExtratoFolhaPonto;
