 // src/components/CadastroMTR/TableMTR.tsx
 import React, { useEffect, useState, useRef } from "react";
 import { DataTable } from "primereact/datatable";
 import { Column } from "primereact/column";
 import { InputText } from "primereact/inputtext";
 import { Dropdown } from "primereact/dropdown";
 import { Button } from "primereact/button";
 import { Sidebar } from "primereact/sidebar";
 import { Calendar } from "primereact/calendar";
 import { Toast } from "primereact/toast";
 import { Card } from "primereact/card";
 import { fetchData, searchMTRs,onDelete } from "./utils";
 import { MTRData } from "./types";
 
 const TableMTR: React.FC = () => {
   const [mtrData, setMtrData] = useState<MTRData[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [viewSidebar, setViewSidebar] = useState<boolean>(false);
   const [selectedRow, setSelectedRow] = useState<MTRData | null>(null);
   const [search, setSearch] = useState<string>("");
   const [dateStart, setDateStart] = useState<Date | null>(null);
   const [dateEnd, setDateEnd] = useState<Date | null>(null);
   const [selectSituacao, setSelectSituacao] = useState<string | null>(null);
   const [isEditing, setIsEditing] = useState<boolean>(false);
   const [deleteId, setDeleteId] = useState<string>("");
   const [manifestoTypes] = useState<string[]>(["Recebido", "Salvo"]);

   const toast = useRef<Toast>(null);
 
   const loadMTRData = async () => {
     try {
       const data = await fetchData();
       setMtrData(data);
     } catch (error) {
       toast.current?.show({
         severity: "error",
         summary: "Erro",
         detail: (error as Error).message,
         life: 5000,
       });
     } finally {
       setLoading(false);
     }
   };
   useEffect(() => {
     loadMTRData();
   }, []);
 
   const handleSearch = async () => {
     setLoading(true);
     try {
       const data = await searchMTRs(search, dateStart, dateEnd, selectSituacao);
       setMtrData(data);
     } catch (error) {
       toast.current?.show({
         severity: "error",
         summary: "Erro",
         detail: (error as Error).message,
         life: 5000,
       });
     } finally {
       setLoading(false);
     }
   };
   const handleDelete = async (id: number) => {
    if (!id) {
      toast.current?.show({
        severity: "warn",
        summary: "Aviso",
        detail: "Nenhum MTR selecionado para exclusão",
        life: 5000,
      });
      return;
    }
    try {
      await onDelete(id);
      toast.current?.show({
        severity: "success",
        summary: "Sucesso",
        detail: "MTR excluído com sucesso",
        life: 5000,
      });
      loadMTRData(); // Atualiza a tabela após exclusão
      setViewSidebar(false); // Fecha o sidebar após exclusão
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: (error as Error).message,
        life: 5000,
      });
    }
  };
  
 
   const onViewDetails = (rowData: MTRData): void => {
      if (rowData) {
        setSelectedRow(rowData);
        setViewSidebar(true);
      }else {
        toast.current?.show({
          severity: "error",
          summary: "Erro",
          detail: "Nenhuma linha selecionada",
          life: 5000,
            
        });
      }
   };
   const actionTemplate = (rowData: MTRData): JSX.Element => (
    <Button
      icon="pi pi-eye"
      className="p-button-rounded p-button-info"
      onClick={() => onViewDetails(rowData)}
    />
  );
  return (
    <div className="flex items-center justify-center min-h-screen p-2 bg-gray-50">
       <Toast ref={toast} />
      <div className="container">
        <Card title="Cadastro de MTR">
          <div className="flex gap-3 card flex-column md:flex-row">
            <div className="flex-1 p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-search"></i>
              </span>
              <InputText
                placeholder="Busque pela MTR"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex-1 p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-calendar"></i>
              </span>
              <Calendar
                placeholder="Data inicial"
                value={dateStart}
                onChange={(e) => setDateStart(e.value ?? null)}
                dateFormat="dd/mm/yy"
              />
              <Calendar
                placeholder="Data final"
                value={dateEnd}
                onChange={(e) => setDateEnd(e.value ?? null)}
                dateFormat="dd/mm/yy"
              />
            </div>
            <div className="flex-1">
              <Dropdown
                value={selectSituacao}
                options={[
                  { label: "Todos", value: "" },
                  { label: "Recebido", value: "Recebido" },
                  { label: "Salvo", value: "salvo" },
                ]}
                onChange={(e) => setSelectSituacao(e.value ?? null)}
                placeholder="Selecione uma situação"
              />
            </div>
            <div className="flex-1">
              <Button label="Buscar" onClick={handleSearch} />
            </div>
          </div>
        </Card>
        <DataTable
          value={mtrData}
          dataKey="id"
          loading={loading}
          paginator
          rows={10}
          selectionMode={"single"}
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          rowsPerPageOptions={[10, 20, 50]}
          scrollable
          responsiveLayout="scroll"
          scrollHeight="400px"
          className="font-normal p-datatable-sm"
        >
          <Column
            field="dataemissao"
            header="Data Emissão"
            style={{ width: "15%" }}
          />
          <Column
            field="mtr"
            header="MTR"
            style={{ width: "15%" }}
            filter={true}
            filterField="mtr"
            filterApply={true}
          />
          <Column
            field="situacao"
            header="Situação"
            style={{ width: "15%" }}
            filter={true}
            filterApply={true}
            filterMatchModeOptions={[
              { label: "Recebido", value: "Recebido" },
              { label: "Salvo", value: "Salvo" },
            ]}
          />
          <Column field="gerador" header="Gerador" style={{ width: "20%" }} />
          <Column
            field="transportadornome"
            header="Transportador"
            style={{ width: "20%" }}
          />
          <Column
            field="quantidaderecebida"
            header="Quantidade"
            style={{ width: "10%" }}
          />
          <Column
            body={actionTemplate}
            header="Ações"
            style={{ width: "10%" }}
          />
        </DataTable>

        <Sidebar
          visible={viewSidebar}
          onHide={() => setViewSidebar(false)}
          className="p-sidebar-lg"
          position="right"
          header="Detalhes da MTR"
        >
          {selectedRow && (
            <div className="grid p-fluid">
              {/* MTR */}
              <div className="field col-6">
                <label htmlFor="mtr">MTR</label>
                <InputText
                  id="mtr"
                  value={selectedRow.mtr || ""}
                  onChange={(e) =>
                    setSelectedRow({ ...selectedRow, mtr: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="field col-6">
                <label htmlFor="situacao">Situação</label>
                <Dropdown
                  id="situacao"
                  value={selectedRow.situacao}
                  options={manifestoTypes}
                  onChange={(e) =>
                    setSelectedRow({ ...selectedRow, situacao: e.value })
                  }
                  disabled={!isEditing}
                />
              </div>

              {/* Tipo Manifesto */}
              <div className="field col-6">
                <label htmlFor="tipomanifesto">Tipo Manifesto</label>
                <InputText
                  id="tipomanifesto"
                  value={selectedRow.tipomanifesto || ""}
                  onChange={(e) =>
                    setSelectedRow({
                      ...selectedRow,
                      tipomanifesto: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                />
              </div>

              {/* Responsável Emissão */}
              <div className="field col-6">
                <label htmlFor="responsavelemissao">Responsável Emissão</label>
                <InputText
                  id="responsavelemissao"
                  value={selectedRow.responsavelemissao || ""}
                  onChange={(e) =>
                    setSelectedRow({
                      ...selectedRow,
                      responsavelemissao: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                />
              </div>

              {/* Gerador */}
              <div className="field col-6">
                <label htmlFor="gerador">Gerador</label>
                <InputText
                  id="gerador"
                  value={selectedRow.gerador || ""}
                  onChange={(e) =>
                    setSelectedRow({ ...selectedRow, gerador: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>

              {/* Unidade do Gerador */}
              <div className="field col-6">
                <label htmlFor="geradorunidade">Unidade do Gerador</label>
                <InputText
                  id="geradorunidade"
                  value={selectedRow.geradorunidade || ""}
                  onChange={(e) =>
                    setSelectedRow({
                      ...selectedRow,
                      geradorunidade: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                />
              </div>

              {/* Transportador Nome */}
              <div className="field col-6">
                <label htmlFor="transportadornome">Transportador Nome</label>
                <InputText
                  id="transportadornome"
                  value={selectedRow.transportadornome || ""}
                  onChange={(e) =>
                    setSelectedRow({
                      ...selectedRow,
                      transportadornome: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                />

              </div>

              {/* Transportador Unidade */}
              <div className="field col-6">
                <label htmlFor="transportadorunidade">
                  Transportador Unidade
                </label>
                <InputText
                  id="transportadorunidade"
                  value={selectedRow.transportadorunidade || ""}
                  onChange={(e) =>
                    setSelectedRow({
                      ...selectedRow,
                      transportadorunidade: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                />
              </div>

              {/* CDF Número */}
              <div className="field col-6">
                <label htmlFor="cdfnumero">CDF Número</label>
                <InputText
                  id="cdfnumero"
                  value={selectedRow.cdfnumero || ""}
                  onChange={(e) =>
                    setSelectedRow({
                      ...selectedRow,
                      cdfnumero: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                />
              </div>

              {/* Classe */}
              <div className="field col-6">
                <label htmlFor="classe">Classe</label>
                <InputText
                  id="classe"
                  value={selectedRow.classe || ""}
                  onChange={(e) =>
                    setSelectedRow({ ...selectedRow, classe: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>

              {/* Data de Emissão */}
              <div className="field col-6">
                <label htmlFor="dataemissao">Data de Emissão</label>
                <InputText
                  id="dataemissao"
                  value={selectedRow.dataemissao || ""}
                  onChange={(e) =>
                    setSelectedRow({
                      ...selectedRow,
                      dataemissao: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                />
              </div>

              {/* Quantidade Recebida */}
              <div className="field col-6">
                <label htmlFor="quantidaderecebida">Quantidade Recebida</label>
                <InputText
                  id="quantidaderecebida"
                  value={selectedRow.quantidaderecebida || ""}
                  onChange={(e) =>
                    setSelectedRow({
                      ...selectedRow,
                      quantidaderecebida: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                />
              </div>

              {/* Tratamento */}
              <div className="field col-6">
                <label htmlFor="tratamento">Tratamento</label>
                <InputText
                  id="tratamento"
                  value={selectedRow.tratamento || ""}
                  onChange={(e) =>
                    setSelectedRow({
                      ...selectedRow,
                      tratamento: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                />
              </div>

              {/* Unidade */}
              <div className="field col-6">
                <label htmlFor="unidade">Unidade</label>
                <InputText
                  id="unidade"
                  value={selectedRow.unidade || ""}
                  onChange={(e) =>
                    setSelectedRow({ ...selectedRow, unidade: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
            </div>
          )}
          <div className="flex mt-3 justify-content-between">
            {isEditing ? (
              <Button
                label="Salvar"
                icon="pi pi-save"
                className="p-button-success"
              />
            ) : (
              <Button
                label="Editar"
                icon="pi pi-pencil"
                className="p-button-warning"
                onClick={() => setIsEditing(true)}
              />
            )}
            <Button
              label="Excluir"
              icon="pi pi-trash"
              className="p-button-danger"
              onClick={() => handleDelete(selectedRow?.id || 0)}
              
            />
            <Button
              label="Fechar"
              icon="pi pi-times"
              className="p-button-secondary"
              onClick={() => setViewSidebar(false)}
            />
          </div>
        </Sidebar>
      </div>
    </div>
  );
};

export default TableMTR;
