import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { TabView, TabPanel } from "primereact/tabview";
import { Column } from "primereact/column";
import {Button} from 'primereact/button';


type Props = {
  dataview: any;
  onDelet: (e: any) => void;
  onEdit: (e: any) => void;
};

  const TableRequest: React.FC<Props> = ({dataview,onDelet,onEdit}) => {
  const [data, setData] = useState<any[]>([ DataTable]);
  useEffect(() => {
    setData(dataview);
  }, [dataview]);
  function delet(e:any) {
    const retorno = confirm("Tem certeza que deseja excluir?");
    if (retorno) {
      onDelet(e.id)}
  }
  function edit(e:any) {
    onEdit(e);
  }

  return (
    <div>
      <TabView>
        <TabPanel header="Request Serviços" leftIcon="pi pi-clipboard mr-2" key={'tab1'}>
          <DataTable
            value={data}
            paginator
            rows={10}
            className="p-datatable-sm"
            scrollable
          >
            <Column field="numero_request" header="N° Request" filter/>
            <Column field="status_confirmacao" header="Status" />
            <Column field="data_coleta" header="Data de Coleta" body={(e) => new Date(e.data_coleta).toLocaleDateString()} />
            <Column field="peso_total" header="Peso Total" />
            <Column field="preco_por_kg" header="Preço por kg" />
            <Column field="valor_total" header="Valor Total" body={(e)=>{
              // formata moeda
              return new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(e.valor_total);
            }}  />
           <Column
              header="Ações"
              body={(e) => (
                <div>
                  <Button
                    icon="pi pi-eye"
                    className="mr-2 p-button-rounded p-button-success"
                    onClick={() => edit(e)}
                  />
                  <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger"
                    onClick={() => delet(e)}
                  />
                </div>
              )}
            />

          </DataTable>
        </TabPanel>
        <TabPanel header="Request Material" rightIcon="pi pi-clipboard ml-2" key={'tab2'}>
          
        </TabPanel>
      </TabView>
    </div>
  );
};

export default TableRequest;
