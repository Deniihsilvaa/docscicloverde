import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColaboradorProps, fetchDataColaboradores, FormDataPros } from "./types";
import { useToast } from "../../Toast/ToastContext";
import InputMenu from "./inputMenu";
import FilterDropdown from "../../buttons/FilterDropdown";

const DataTableColaboradores = ({ setDialogVisible, setInitialValues }: any) => {
  const [dataTable, setDataTable] = useState<FormDataPros[]>([]);
  const [quantidadeColaboradores, setQuantidadeColaboradores] = useState(0);
  const [totalSalario, setTotalSalario] = useState(0);
  const [selectRow, setSelectRow] = useState<FormDataPros | null>(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const [filter, setFilter] = useState<number | string>("");
  const [baseColaboradores, setBaseColaboradores] = useState<ColaboradorProps[]>([]);

  useEffect(() => {
    fetchColaboradores();
  }, []);

  useEffect(() => {
    handleFilterChange(filter);
  }, [filter]);

  const fetchColaboradores = async () => {
    try {
      setLoading(true);
      const fillterDate = ""
      const colaboradoresData = await fetchDataColaboradores(fillterDate);
      setBaseColaboradores(colaboradoresData);

      const colaboradoresAtivos = colaboradoresData.filter(
        (colaborador: ColaboradorProps) => colaborador.state === "true"
      );

      setQuantidadeColaboradores(colaboradoresAtivos.length);

      const totalSalarios = colaboradoresAtivos.reduce(
        (total: number, colaborador: ColaboradorProps) =>
          total + colaborador.salario,
        0
      );

      setTotalSalario(totalSalarios);
      setDataTable(colaboradoresData);

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
        detail: "Erro ao carregar os dados.",
        life: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (id: any) => {
    if (typeof id === 'object') {
      setDataTable(baseColaboradores); 
    }else{
      const filteredData = baseColaboradores.filter(
        (colaborador) => colaborador.id === id
      );
      setDataTable(filteredData); 
    }
  };

  const onEdit = (data: FormDataPros) => {
    const rest = { ...data };

    // Formatando datas se existirem
    if (rest.data_nascimento && (typeof rest.data_nascimento === 'string' || rest.data_nascimento instanceof Date)) {
      rest.data_nascimento = formatDate(new Date(rest.data_nascimento));
    }
    if (rest.data_admissao && (typeof rest.data_admissao === 'string' || rest.data_admissao instanceof Date)) {
      rest.data_admissao = formatDate(new Date(rest.data_admissao));
    }

    setInitialValues(rest);
    setDialogVisible(true);
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("pt-BR");
  };

  return (
    <>
      <div className="grid grid-cols-2">
      <div className="m-2">
        <h3>
          Colaboradores Ativos: {quantidadeColaboradores} | Total de Salários:{" "}
          {totalSalario.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </h3>
        </div>

        <div className="m-2">
          <FilterDropdown
            colaboradores={baseColaboradores}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>
      {loading && <p>Carregando...</p>}
      <DataTable
        value={dataTable}
        selectionMode="single"
        dataKey="id"
        selection={selectRow}
        onSelectionChange={(e) => setSelectRow(e.value as FormDataPros)}
        paginator
        rows={10}
        responsiveLayout="scroll"
        scrollable
      >
        <Column field="nome" header="Nome" />
        <Column field="cpf" header="CPF" />
        <Column
          field="data_nascimento"
          header="Nascimento"
          body={(rowData: FormDataPros) =>
            rowData.data_nascimento
              ? new Date(rowData.data_nascimento).toLocaleDateString()
              : ""
          }
        />
        <Column
          field="salario"
          header="Salário"
          body={(rowData: FormDataPros) =>
            rowData.salario !== undefined ? `R$ ${rowData?.salario?.toFixed(2)}` : ""
          }
        />
        <Column
          field="state"
          header="Status"
          body={(rowData: FormDataPros) =>
            rowData?.state ? "Ativo" : "Inativo"
          }
        />
        <Column
          field="editar"
          header="Ações"
          body={(rowData) => (
            <InputMenu
              row={rowData}
              setRow={fetchColaboradores}
              onEdit={onEdit}
            />
          )}
          style={{ width: "100px" }}
        />
      </DataTable>
    </>
  );
};

export default DataTableColaboradores;
