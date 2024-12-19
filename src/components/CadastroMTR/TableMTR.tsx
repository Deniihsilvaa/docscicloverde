import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { supabase } from "../../services/supabase";
import { Card } from "primereact/card";
import { Calendar } from "primereact/calendar";

import { fetchTransportadoras } from "./index";

// Define a interface para os dados da MTR
interface MTRData {
  id: number;
  mtr: string;
  situacao: string;
  responsavelemissao: string;
  gerador: string;
  transportadornome: string;
  quantidaderecebida: number;
}

const TableMTR: React.FC = () => {
  const [mtrData, setMtrData] = useState<MTRData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [manifestoTypes] = useState<string[]>(["Recebido", "Salvo"]);
  const [viewSidebar, setViewSidebar] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<MTRData | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [transportadoras, setTransportadoras] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");
  const [dateStart, setDateStart] = useState<Date | null>(null);
  const [dateEnd, setDateEnd] = useState<Date | null>(null);
  const [selectSituacao, setSelectSituacao] = useState<string | null>(null);

  const [transportadorasLoading, setTransportadorasLoading] =
    useState<boolean>(false);

  const fetchData = async (): Promise<void> => {
    setLoading(true);
    const { data, error } = await supabase.from("baseMtr").select("*");

    if (error) return alert("Erro ao carregar os dados!");
    setMtrData(data as MTRData[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setTransportadorasLoading(true);
    fetchTransportadoras()
      .then((data) => setTransportadoras(data))
      .catch((error) =>
        console.error("Erro ao carregar transportadoras:", error)
      )
      .finally(() => setTransportadorasLoading(false));
  }, []);
  const handleSearch = async () => {
    setLoading(true);
    try {
      let query = supabase.from("baseMtr").select("*");

      if (search) {
        query = query.ilike("mtr", `%${search}%`);
      }

      if (dateStart && dateEnd) {
        query = query
          .gte("dataEmissao", dateStart.toISOString())
          .lte("dataEmissao", dateEnd.toISOString());
      } else if (dateStart || dateEnd) {
        alert("Por favor, preencha ambas as datas para filtrar por período!");
        setLoading(false);
        return;
      }

      if (selectSituacao) {
        query = query.eq("situacao", selectSituacao);
      }

      const { data, error } = await query;
      if (error) {
        console.error("Erro ao buscar os dados:", error);
        setLoading(false);
        return;
      } else {
        setMtrData(data as MTRData[]);
        setLoading(false);
      }
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    } finally {
      setLoading(false);
    }
  };
  const onViewDetails = (rowData: MTRData): void => {
    setSelectedRow(rowData);
    setViewSidebar(true);
    setIsEditing(false); // Abre no modo de visualização
  };

  const onDelete = async (): Promise<void> => {
    if (!selectedRow) return;

    const { error } = await supabase
      .from("baseMtr")
      .delete()
      .eq("id", selectedRow.id);

    if (error) {
      alert("Erro ao excluir o registro!");
    } else {
      alert("Registro excluído com sucesso!");
      fetchData();
      setViewSidebar(false);
    }
  };

  const onSave = async (): Promise<void> => {
    if (!selectedRow) return;

    const { error } = await supabase
      .from("baseMtr")
      .update(selectedRow)
      .eq("id", selectedRow.id);

    if (error) {
      alert("Erro ao salvar as alterações!");
    } else {
      alert("Registro atualizado com sucesso!");
      fetchData();
      setViewSidebar(false);
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
    <div className="card p-fluid">
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
        <Column body={actionTemplate} header="Ações" style={{ width: "10%" }} />
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
            <div className="field col-6">
              <label htmlFor="mtr">MTR</label>
              <InputText
                id="mtr"
                value={selectedRow.mtr}
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
            <div className="field col-6">
              <label htmlFor="responsavelemissao">Responsável Emissão</label>
              <InputText
                id="responsavelemissao"
                value={selectedRow.responsavelemissao}
                onChange={(e) =>
                  setSelectedRow({
                    ...selectedRow,
                    responsavelemissao: e.target.value,
                  })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="field col-6">
              <label htmlFor="gerador">Gerador</label>
              <InputText
                id="gerador"
                value={selectedRow.gerador}
                onChange={(e) =>
                  setSelectedRow({ ...selectedRow, gerador: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="field col-6">
              <label htmlFor="transportadornome">Transportador</label>
              <Dropdown
                id="transportadornome"
                value={selectedRow.transportadornome}
                options={transportadoras}
                placeholder={
                  transportadorasLoading ? "Carregando..." : "Selecione"
                }
                onChange={(e) =>
                  setSelectedRow({ ...selectedRow, transportadornome: e.value })
                }
                disabled={transportadorasLoading || !isEditing}
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
              onClick={onSave}
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
            onClick={onDelete}
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
  );
};

export default TableMTR;
