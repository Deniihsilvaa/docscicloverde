import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { TabView, TabPanel } from "primereact/tabview";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import {FormData} from "../types";


type Props = {
  dataview: any;
  onDelet: (e: any) => void;
  onEdit: (e: any) => void;
  duplic: (e: any) => void
};

const TableRequest: React.FC<Props> = ({ dataview, onDelet, onEdit ,duplic}) => {
  const [data, setData] = useState<any[]>([DataTable]);
  useEffect(() => {
    setData(dataview);
  }, [dataview]);
  function delet(e: any) {
    const retorno = confirm("Tem certeza que deseja excluir?");
    if (retorno) {
      onDelet(e.id);
    }
  }
  function edit(e: any) {
    onEdit(e);
  }
  
  function duplicar(e: any) {
    duplic(e);
  }

  // Ao carregar os dados:
  const dataFormatada = (data: string) => {
    if (!data) return '';  
  
    // Forçar interpretação como data local, evitando UTC
    const [ano, mes, dia] = data.split('-');
    const dataObj = new Date(Number(ano), Number(mes) - 1, Number(dia));
  
    if (isNaN(dataObj.getTime())) return 'Data Inválida';
  
    const diaFormatado = String(dataObj.getDate()).padStart(2, '0');
    const mesFormatado = String(dataObj.getMonth() + 1).padStart(2, '0');
    const anoFormatado = dataObj.getFullYear();
  
    return `${diaFormatado}/${mesFormatado}/${anoFormatado}`;
  };
  

  return (
    <div>
      <TabView>
        <TabPanel
          header="Request Serviços"
          leftIcon="pi pi-clipboard mr-2"
          key={"tab1"}
        >
          <DataTable
            value={data}
            paginator
            rows={20}
            rowsPerPageOptions={[10, 20, 50,100]}
            dataKey="id"
            responsiveLayout="stack"
            about="Request Serviços"
            totalRecords={data.length}
            className="p-datatable-sm"
            scrollable
            selectionPageOnly={true}
            showGridlines
            scrollHeight="600px"
          >
            <Column field="numero_request" header="N° Request" filter />
            <Column field="status_confirmacao" header="Status" />
            <Column field="material" header="Material" />
            <Column
              field="data_coleta"
              header="Data de Coleta"
              body={(e) => dataFormatada(e.data_coleta)}
            />
            <Column field="peso_total" header="Peso Total" />
            <Column field="preco_por_kg" header="Preço por kg" />
            <Column
              field="valor_total"
              header="Valor Total"
              body={(e) => {
                // formata moeda
                return new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(e.valor_total);
              }}
            />
            <Column
              header=""
              body={(e) => (
                <div>
                  <Button
                    icon="pi pi-eye"
                    className="p-row-editor-init"
                    onClick={() => edit(e)}
                  />
                  <Button
                    icon="pi pi-trash"
                    className="p-row-editor-init"
                    onClick={() => delet(e)}
                  />
                  <Button
                    

                    icon="pi pi-clipboard"
                    className="p-row-editor-init"
                    onClick={() => duplicar(e)}
                  />
                </div>
              )}
            />
          </DataTable>
        </TabPanel>
        <TabPanel
          header="Request Material"
          rightIcon="pi pi-clipboard ml-2"
          key={"tab2"}
        ></TabPanel>
      </TabView>
    </div>
  );
};

export default TableRequest;
