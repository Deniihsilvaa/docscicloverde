import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColaboradorProps, fetchDataColaboradores,FormDataProsp } from "./types";
import { useToast } from "../../Toast/ToastContext";
import InputMenu from "./inputMenu"

const DataTableColaboradores = ( { setDialogVisible, setInitialValues }: any) => {
  const [dadosInput, setDadosInput] = useState<ColaboradorProps[]>([]);
  const [quantidadeColaboradores, setQuantidadeColaboradores] = useState(0);
  const [totalSalario, setTotalSalario] = useState(0);
  const [selectRow, setSelectRow] = useState<ColaboradorProps | null>(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  

  useEffect(() => {
    setLoading(true);
    fetchColaboradores();
  }, []);

  const fetchColaboradores = async () => {
    try {
      const colaboradores = await fetchDataColaboradores();
      setDadosInput(colaboradores);
      const totalAtivo = colaboradores.filter(
        (colaborador) => colaborador.state === "true"
      ).length;
      setQuantidadeColaboradores(totalAtivo);
      const totalSalarios = colaboradores
        .filter((colaborador) => colaborador.state === "true")
        .reduce((total, colaborador) => total + colaborador.salario, 0);
      setTotalSalario(totalSalarios);

      showToast({
        severity: "success",
        summary: "Sucesso",
        detail: "Dados carregados com sucesso",
        life: 1000,
      });

      setLoading(false);
    } catch (error) {
      showToast({
        severity: "error",
        summary: "Erro",
        detail: error.message,
        life: 5000,
      });
    }
  };
  const onLoadTable = () => {
    //fetchColaboradores();
  };
  const onEdit = (data: FormDataProsp) => {
    console.log(data);
    setDialogVisible(true);
    setInitialValues(data);
  };

  return (
    <>
      <h3>
        Colaboradores Ativo: {quantidadeColaboradores} Total de Salarios:{" "}
        {totalSalario.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </h3>
      <p>{loading && <span>Carregando...</span>}</p>
      <DataTable
        value={dadosInput}
        selectionMode="single"
        selection={selectRow!}
        onSelectionChange={(e) => setSelectRow(e.value)}
        dragSelection
        tableStyle={{ minWidth: "50rem" }}
        header="Colaborador"
        paginator
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[10, 20, 50]}
        first={0}
        rows={10}
        totalRecords={0}
        currentPageReportTemplate="Mostrando {first} de {totalRecords}"
        key={'id'}
        onLoad={onLoadTable}
        responsiveLayout="scroll"
        className="p-datatable-sm"
        scrollable
      >
        <Column field="nome" header="Nome" />
        <Column field="cpf" header="CPF" />
        <Column field="data_nascimento" header="Nascimento" />
        <Column
          field="salario"
          header="Salário"
          body={(salario) => `R$ ${salario.salario.toFixed(2)}`}
        />
        <Column field="data_admissao" header="Admissão" />
        <Column field="departamento" header="Departamento" />
        <Column field="cargo" header="Cargo" />
        <Column field="observacoes" header="Observações" />
        <Column
          field="state"
          header="Status"
          body={(state) => (state.state === "true" ? "Ativo" : "Inativo")}
        />
        <Column
          field="editar"
          header="Ações"
          body={(row) => (
            <InputMenu row={row} setRow={onLoadTable} onEdit={onEdit}/>
          )}
          style={{ width: "100px" }}
        />
      </DataTable>
    </>
  );
};

export default DataTableColaboradores;
