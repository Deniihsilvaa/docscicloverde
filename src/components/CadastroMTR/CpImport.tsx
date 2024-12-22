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
import { salvarDadosNoSupabase } from "./utils";
import { ProgressSpinner } from "primereact/progressspinner";
import { ScrollPanel } from 'primereact/scrollpanel';
import { Badge } from 'primereact/badge';
interface PlanilhaRow {
  [key: string]: any;
}

type CpImportProps = {
  dialogVisible: boolean;
  setDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onFileProcessed: React.Dispatch<React.SetStateAction<boolean>>;
};

const CpImport: React.FC<CpImportProps> = ({
  dialogVisible,
  setDialogVisible,
  onFileProcessed,
}) => {
  const stepperRef = useRef<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [tableData, setTableData] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [selectedAllRows, setSelectedAllRows] = useState<any[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast>(null);
  const [rowClick] = useState(true);
  const requiredColumns = [
    "mtr",
    "tipomanifesto",
    "responsavelemissao",
    "gerador",
    "geradorunidade",
    "geradorcnpjcpf",
    "transportadornome",
    "transportadorunidade",
    "transportadorcnpjcpf",
    "armazenadortemporarionome",
    "armazenadortemporariounidade",
    "armazenadortemporariocnpjcpf",
    "destinadornome",
    "destinadorunidade",
    "destinadorcnpjcpf",
    "nomemotorista",
    "placaveiculo",
    "observacaogerador",
    "temmtrcomplementar",
    "mtrprovisorionumero",
    "dataemissao",
    "datarecebimento",
    "situacao",
    "responsavelrecebimento",
    "residuocoddescricao",
    "classe",
    "descricaointernagerador",
    "identificacaointernadestinador",
    "quantidadeindicada",
    "quantidaderecebida",
    "unidade",
    "justificativa",
    "observacaodestinador",
    "tratamento",
    "cdfnumero",
    "documentotipo",
    "documentonumero",
    "item",
    "codigoabnt",
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      processFile(uploadedFile);
    }
  };

  const validateSheet = (sheet: any[]) => {
    const sheetColumns = Object.keys(sheet[0]);
    const missingColumns = requiredColumns.filter(
      (col) => !sheetColumns.includes(col)
    );
    const invalidColumns = sheetColumns.filter(
      (col) => !requiredColumns.includes(col)
    );

    if (missingColumns.length || invalidColumns.length) {
      let message = "Erro ao validar o arquivo:\n";
      if (missingColumns.length) {
        message += `Colunas ausentes: ${missingColumns.join(", ")}.
`;
      }
      if (invalidColumns.length) {
        message += `Colunas inválidas: ${invalidColumns.join(", ")}.`;
      }
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: message,
        life: 5000,
      });
      setLoading(false)
      return false;
    }
    return true;
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    setLoading(true);
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet: any[] = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheetName],
        {
          defval: null, // Define null para células vazias
          raw: false,
        }
      );

    const cleanedSheet = sheet.map(row => {
      const cleanedRow: any = {};
      Object.keys(row).forEach(key => {
        if (row[key] !== null && key !== "__EMPTY") {
          cleanedRow[key] = row[key];
        }
      });
      return cleanedRow;
    });

    // if (cleanedSheet.length === 0 || !validateSheet(cleanedSheet)) return;
    if (cleanedSheet.length === 0) return;
    toast.current?.show({
      severity: "success",
      summary: "Sucesso",
      detail: "Arquivo processado com sucesso",
      life: 5000,
    });
      setTableData(cleanedSheet);
      setTotalRecords(cleanedSheet.length);
      stepperRef.current?.nextCallback();
      setLoading(false)
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDelete = () => {
    const updatedData = tableData.filter(
      (row) => !selectedAllRows.includes(row)
    );
    setTableData(updatedData);
    setSelectedAllRows([]);
  };
  const renderCell = (rowData: any, field: string) => {
    const value = rowData[field];
    if (typeof value === "object") {
      return JSON.stringify(value); // Renderiza o objeto como JSON
    }
    return value ?? "-"; // Renderiza um traço se não houver valor
  };
  const handleSave = async (tableData: any) => {
    const resultado = await salvarDadosNoSupabase(tableData);
    if (resultado && typeof resultado === "object" && resultado.d) {
      toast.current?.show({
        severity: "warn",
        summary: "Aviso",
        detail: `Registros duplicados encontrados: ${resultado.d.length}`,
        life: 5000,
      });
    }
    
    if (resultado && typeof resultado === "object" && resultado.a) {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: `Erro ao salvar dados. : ${resultado.a}`,
        life: 5000,
      });
    } else {
      toast.current?.show({
        severity: "success",
        summary: "Sucesso",
        detail: "Dados salvos com sucesso!",
        life: 5000,
      });
      onFileProcessed(true);
    }
  };

  const renderTable = () => (
    <div className="table-container">
      <div className="p-2 ">
        {selectedAllRows.length > 0 && (
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
          dataKey="mtr"
          size={"small"}
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          selection={selectedRows || []}
          selectionMode={rowClick ? null : "checkbox"}
          onSelectionChange={(e) => setSelectedRows(e.value)}
          tableStyle={{ minWidth: "50rem" }}
          stripedRows
          responsiveLayout="scroll"
          header="MTRS IMPORTADO"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column>
          {requiredColumns.map((col) => (
            <Column
              key={col}
              field={col.toLowerCase()}
              header={col}
              body={(rowData) => renderCell(rowData, col.toLowerCase())}
            />
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
            {loading && <ProgressSpinner aria-label="Loading" style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"/>}

            <div className="p-field">
              <label htmlFor="file-upload">Selecione o arquivo:</label>
              <InputText
                id="file-upload"
                type="file"
                accept=".xlsx"
                onChange={handleFileUpload}
              />
              <h2>Importe apenas Planilhas .xlsx</h2>

              <Button
                label="Avançar"
                onClick={() => stepperRef.current?.nextCallback()}
              />
            </div>
          </StepperPanel>
          <StepperPanel header="Visualizar Dados">
          <ScrollPanel style={{ width: '100%', height: '200px' }}>
              <div>
                TOTAL DE REGISTROS: {totalRecords} Total de Registros
                Selecionados: {selectedRows.length}
                <p></p>
                {selectedRows.length > 0 && 
                <Button label="Excluir" icon="pi pi-trash" className="text-xs p-button-danger" onClick={handleDelete} />}
              </div>
              {tableData.length > 0 ? (
                renderTable()
              ) : (
                <p>Nenhum dado disponível.</p>
              )}
            </ScrollPanel>
              <div className="p-d-flex p-jc-between p-mt-4">
                <Button
                  label="Voltar"
                  onClick={() => stepperRef.current?.prevCallback()}
                />
                <Button
                  label="Próximo"
                  onClick={() => stepperRef.current?.nextCallback()}
                />
                <Button label="Limpar" onClick={() => setTableData([])} />
              </div>
          </StepperPanel>
          <StepperPanel header="Concluir">
            <div className="p-d-flex p-jc-between p-mt-4">
              <Button
                label="Importa Tabela"
                icon="pi pi-save"
                onClick={() => {
                  handleSave(tableData);
                }}
              />
            </div>
          </StepperPanel>
     
        </Stepper>
      </Dialog>
    </div>
  );
};

export default CpImport;
