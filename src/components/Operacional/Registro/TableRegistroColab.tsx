import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColaboradorProps, fetchDataColaboradores,FormDataPros } from "./types";
import { useToast } from "../../Toast/ToastContext";
import InputMenu from "./inputMenu"

const DataTableColaboradores = ( { setDialogVisible, setInitialValues }: any) => {
  const [dataTable, setDataTable] = useState<FormDataPros[]>([]);
  const [quantidadeColaboradores, setQuantidadeColaboradores] = useState(0);
  const [totalSalario, setTotalSalario] = useState(0);
  const [selectRow, setSelectRow] = useState<FormDataPros | null>(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  

  useEffect(() => {
    setLoading(true);
    fetchColaboradores();
  }, []);

  const fetchColaboradores = async () => {
    try {
      const colaboradores = await fetchDataColaboradores();
      setDataTable(colaboradores);
      const totalAtivo = colaboradores.filter(
        (colaborador: ColaboradorProps) => colaborador.state === "true"
      ).length;
      setQuantidadeColaboradores(totalAtivo);
      const totalSalarios = colaboradores
        .filter((colaborador: ColaboradorProps) => colaborador.state === "true")
        .reduce((total: number, colaborador: ColaboradorProps) => total + colaborador.salario, 0);
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
    fetchColaboradores();
  };
  const onEdit = (data: FormDataPros) => {
    const rest = { ...data };
  
    // Safely format the dates if they exist
    if (rest.data_nascimento) {
      rest.data_nascimento = formatDate(rest.data_nascimento as Date);
    }
    if (rest.data_admissao) {
      rest.data_admissao = formatDate(rest.data_admissao as Date);
    }
    setInitialValues(rest);
    setDialogVisible(true);
  };
  const formatDate = (date: Date | null): Date => {
      const dataformatada = new Date(date!);
      return dataformatada;
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
        value={dataTable}
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
       <Column 
         field="data_nascimento" 
         header="Nascimento" 
         body={(rowData: FormDataPros) => 
           rowData.data_nascimento 
             ? new Date(rowData.data_nascimento).toLocaleDateString() 
             : ''
         } 
       />
        <Column
          field="salario"
          header="Salário"
          body={(salario) => `R$ ${salario.salario.toFixed(2)}`}
        />
      <Column 
        field="data_admissao" 
        header="Admissão" 
        body={(rowData: FormDataPros) => 
          rowData.data_admissao 
            ? new Date(rowData.data_admissao).toLocaleDateString() 
            : ''
        } 
      />
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
