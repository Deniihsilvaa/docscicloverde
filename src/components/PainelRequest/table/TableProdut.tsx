import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { viewTableRequestProductPros } from "../types";


type TableProdut = {
  products:any;
  
}
const TableProdut: React.FC <TableProdut> = ({products}) => {
  const [expandedRows, setExpandedRows] = useState<viewTableRequestProductPros[{}]>([]);
 
  const expandedRowTemplate = (data: viewTableRequestProductPros) => {
    return (
      <div className="p-2 p-d-flex p-jc-between">
        <div>
          <strong>Email:</strong> {data.email}
        </div>
        <div>
          <strong>Responsável:</strong> {data.responsavel}
        </div>
        <div>
          <strong>Telefone:</strong> {data.telefone}
        </div>
        <div>
          <strong>Histórico de Aprovação:</strong> {data.historico_aprovacao}
        </div>
        <div>
          <strong>Item Coletado:</strong> {data.item_coletado}
        </div>
        <div>
          <strong>NFE:</strong> {data.nfe}
        </div>
        <div>
          <strong>Pesagem Inicial:</strong> {data.pesagem_inicial}
        </div>
        <div>
          <strong>Pesagem Final:</strong> {data.pesagem_final}
        </div>
        <div>
          <strong>URL Nuvem:</strong>{" "}
          <a href={data.url_nuvem} target="_blank" rel="noopener noreferrer">
            {data.url_nuvem}
          </a>
        </div>
      </div>
    );
  };
  const converterParaDate = (dataString: string) => {
    const [ano, mes, dia] = dataString.split('-');
    const data = new Date(Number(ano), Number(mes) - 1, Number(dia));
    return data.toLocaleDateString("pt-BR", {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const renderColumn = (col: string, rowData: any) => {
    if (col === "valor_total") {
      return (
        <span className="font-bold">
          R$ {rowData.toFixed(2)}
        </span>
      );
    } else if (col === "data_coleta") {
      return (
        <span className="font-bold">
          {converterParaDate(rowData)}
        </span>
      );
    } else if(col === "status_confirmacao"){
      return (
        <span className={`font-bold 
        ${rowData === "completo" ? "text-green-500" : rowData === "negado" ? "text-red-500" : rowData === "registrado" ? "text-orange-500":""}`}>
          {rowData}
        </span>
      );
    }
    return rowData[col];
  };
  return (
    <div className="p-d-flex p-jc-center p-mt-3">
      <Card className="sample-card">
        <DataTable
          value={products}
          tableStyle={{ minWidth: "50rem" }}
          paginator
          rows={20}
          className="w-full p-datatable-sm"
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          rowExpansionTemplate={expandedRowTemplate}
          responsiveLayout="scroll"
        >
          <Column expander={true} style={{ width: "5rem" }} />
          <Column field="numero_request" header="Nº Request" />
          <Column field="data_coleta" header="Data Coleta" body={(e) => renderColumn("data_coleta", e.data_coleta)} />
          <Column field="peso_total" header="Peso Total" />
          <Column field="valor_total" header="Valor Total" body={(e) => renderColumn("valor_total", e.valor_total)} />
          <Column field="material" header="Material" />
          <Column field="responsavel" header="Responsável" />
          <Column field="status_confirmacao" header="Situação" body={(e) => renderColumn("status_confirmacao", e.status_confirmacao)} />
        </DataTable>
      </Card>
    </div>
  );
};

export default TableProdut;
