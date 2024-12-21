import React, { useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import * as XLSX from "xlsx";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

interface PlanilhaRow {
  [key: string]: any;
}

type CpImportProps = {
  dialogVisible: boolean;
  setDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onFileProcessed: (data: any[]) => void;
};

const CpImport: React.FC<CpImportProps> = ({
  dialogVisible,
  setDialogVisible,
  onFileProcessed,
}) => {
  const stepperRef = useRef<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [tableData, setTableData] = useState<any[]>([""]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const toast = useRef<Toast>(null);
   
  const requiredColumns = [
    "mtr", "tipomanifesto", "responsavelemissao", "gerador", 
    "geradorunidade", "geradorcnpjcpf", "transportadornome",
    "transportadorunidade", "transportadorcnpjcpf", 
    "armazenadortemporarionome",
    "armazenadortemporariounidade", "armazenadortemporariocnpjcpf",
    "destinadornome", "destinadorunidade", "destinadorcnpjcpf",
    "nomemotorista", "placaveiculo", "observacaogerador",
    "temmtrcomplementar", "mtrprovisorionumero", "dataemissao",
    "datarecebimento", "situacao", "responsavelrecebimento",
    "residuocoddescricao", "classe", "descricaointernagerador",
    "identificacaointernadestinador", "quantidadeindicada",
    "quantidaderecebida", "unidade", "justificativa",
    "observacaodestinador", "tratamento", "cdfnumero",
    "documentotipo", "documentonumero", "item", "codigoabnt"
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      processFile(uploadedFile);
      toast.current?.show({
        severity: "success",
        summary: "Sucesso",
        detail: "Arquivo processado com sucesso",
        life: 5000,
      })
    }
  };

  const validateSheet = (sheet: any[]) => {
    const sheetColumns = Object.keys(sheet[0]);
    const missingColumns = requiredColumns.filter(col => !sheetColumns.includes(col));
    const invalidColumns = sheetColumns.filter(col => !requiredColumns.includes(col));

    if (missingColumns.length || invalidColumns.length) {
      let message = "Erro ao validar o arquivo:\n";
      if (missingColumns.length) {
        message += `Colunas ausentes: ${missingColumns.join(", ")}.
`;
      }
      if (invalidColumns.length) {
        message += `Colunas inválidas: ${invalidColumns.join(", ")}.`;
      }
      alert(message);
      return false;
    }
    return true;
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      console.log('Dados da planilha:', sheet);
      if (sheet.length === 0 || !validateSheet(sheet)) {
        return;
      }

      setTableData(sheet);
      setTotalRecords(sheet.length);
      onFileProcessed(sheet);
    };
    reader.readAsBinaryString(file);
  };

  const handleDelete = () => {
    const updatedData = tableData.filter((row) => !selectedRows.includes(row));
    setTableData(updatedData);
    setSelectedRows([]);
  };

  const renderTable = () => (
    <div className="table-container">
      <div className="p-2 ">
      {selectedRows.length > 0 && (
        <Button
          icon="pi pi-trash"
          className="p-button-danger p-mb-3"
          label="Excluir"
          onClick={handleDelete}
        />
      )}
      <DataTable
        value={tableData}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem", minHeight: "20rem", }}
        totalRecords={tableData.length}
        selection={selectedRows}
        onSelectionChange={(e) => setSelectedRows(e.value)}
        dataKey="MTR"
        responsiveLayout="scroll"
        scrollHeight="300px"
        className="font-normal p-datatable-sm"
        header="MTRS IMPORTADO"
        rowGroupMode="single"
        
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
        {requiredColumns.map((col) => (
          <Column key={col} field={col.toLowerCase()} header={col} />
        ))}
      </DataTable>
      </div>
    </div>
  );

  return (
    <div className="flex card justify-content-center">
      <Toast ref={toast} position="top-center" />
      <Dialog
        header="Importar MTR"
        visible={dialogVisible}
        style={{ width: "70vw", height: "79vh" }}
        onHide={() => setDialogVisible(false)}
      >
        <Stepper ref={stepperRef}>
          <StepperPanel header="Upload do Arquivo">
            <div className="p-field">
              <label htmlFor="file-upload">Selecione o arquivo:</label>
              <InputText
                id="file-upload"
                type="file"
                accept=".xlsx"
                onChange={handleFileUpload}
              />
            </div>
            <Button label="Importar" onClick={() => stepperRef.current.nextCallback()} disabled={!file} />
          </StepperPanel>
          <StepperPanel header="Visualizar Dados">
            <h3>TOTAL DE REGISTROS: {totalRecords}</h3>
            {tableData.length > 0 ? renderTable() : <p>Nenhum dado disponível.</p>}
            <div className="p-d-flex p-jc-between p-mt-4">
              <Button label="Voltar" onClick={() => stepperRef.current.prevCallback()} />
              <Button label="Próximo" onClick={() => stepperRef.current.nextCallback()} />
                <Button label="Limpar" onClick={()=> setTableData([])} />
            </div>
          </StepperPanel>
        </Stepper>
      </Dialog>
    </div>
  );
};

export default CpImport;
