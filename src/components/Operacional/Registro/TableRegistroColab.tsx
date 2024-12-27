import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColaboradorProps, fetchDataColaboradores } from "./types";
import {useToast} from "../../Toast/ToastContext";
const DataTableColaboradores = () => {
  const [dadosInput, setDadosInput] = useState<ColaboradorProps[]>([]);
  const [quantidadeColaboradores, setQuantidadeColaboradores] = useState(0);
  const [totalSalario, setTotalSalario] = useState(0);
  const [selectRow, setSelectRow] = useState<ColaboradorProps | null>(null);
  const [loading, setLoading] = useState(false);
  
  const {showToast} = useToast();
  
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
        .reduce((total, colaborador) => total + colaborador.salario, 0)
      setTotalSalario(totalSalarios)
      
      showToast({
        severity:"success",
        summary:"Sucesso",
        detail:"Dados carregados com sucesso",
        life:1000
      })

      
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

  
  return (
    <div>
      <h3>
        Colaboradores Ativo: {quantidadeColaboradores} Total de Salarios:{" "}
        {totalSalario.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </h3>
      <p>
        {loading && <span>Carregando...</span>}
      </p>
      <DataTable
        value={dadosInput}
        selectionMode="single"
        selection={selectRow!}
        onSelectionChange={(e) => setSelectRow(e.value)}
        dragSelection
        tableStyle={{ minWidth: "50rem" }}
        header="Colaborador"
        rowClassName={(rowData) =>
          rowData.state === "true" ? "active-row" : ""
        } // ESSA FUNCAO FAZ COM QUE A LINHA SEJA VERDE QUANDO O COLABORADOR ESTIVER ATIVO
        paginator
        rowsPerPageOptions={[10, 20, 50]}
        first={0}
        rows={10}
        className="p-datatable-sm"
      >
        <Column field="nome" header="Nome" />
        <Column field="cpf" header="CPF" />
        <Column field="datanascimento" header="Nascimento" />
        <Column
          field="salario"
          header="Salário"
          body={(salario) => `R$ ${salario.salario.toFixed(2)}`}
        />
        <Column field="dataadmissao" header="Admissão" />
        <Column field="departamento" header="Departamento" />
        <Column field="cargo" header="Cargo" />
        <Column field="observacoes" header="Observações" />
        <Column
          field="state"
          header="Status"
          body={(state) => (state.state === "true" ? "Ativo" : "Inativo")}
        />
      </DataTable>
    </div>
  );
};

export default DataTableColaboradores;
