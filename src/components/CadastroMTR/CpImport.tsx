// src/components/CadastroMTR/CpImport.tsx
import React, { useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import * as XLSX from "xlsx";

type CpImportProps = {
  dialogVisible: boolean;
  setDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onFileProcessed: (data: any[]) => void; // Retorna dados para o pai
};

const CpImport: React.FC<CpImportProps> = ({
  dialogVisible,
  setDialogVisible,
  onFileProcessed,
}) => {
  const stepperRef = useRef<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [tableData, setTableData] = useState<any[]>([]);

  // Função para processar o arquivo
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      processFile(uploadedFile);
    }
  };

  // Função para processar e validar o arquivo
  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      // Validação básica
      if (sheet.length === 0 || !Object.keys(sheet[0]).includes("MTR")) {
        alert(
          "Formato de arquivo inválido. Certifique-se de que a coluna 'MTR' existe."
        );
        return;
      }

      setTableData(sheet);
      onFileProcessed(sheet); // Envia para o componente pai
    };
    reader.readAsBinaryString(file);
  };

  // Próximo passo do Stepper
  const nextStep = () => {
    stepperRef.current.nextCallback();
    
  };

  // Voltar para o passo anterior
  const prevStep = () => {
    stepperRef.current.prevCallback();
  };

  // Renderização de dados do arquivo
  const renderTable = () => (
    <div className="table-container">
      <table className="p-datatable">
        <thead>
          <tr>
            {tableData.length > 0 &&
              Object.keys(tableData[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, idx) => (
                <td key={idx}>{value as string}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="flex card justify-content-center">
      <Dialog
        header="Importar MTR"
        visible={dialogVisible}
        style={{
          width: "70vw",
          height: "70vh",
        }}
        
        onHide={() => setDialogVisible(false)}
      >
        <Stepper ref={stepperRef} >
          {/* Passo 1 - Upload do Arquivo */}
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
            <Button label="Importar" onClick={nextStep} disabled={!file} />

          </StepperPanel>

          {/* Passo 2 - Exibição da Tabela */}
          <StepperPanel header="Visualizar Dados">
            {tableData.length > 0 ? (
              renderTable()
            ) : (
              <p>Nenhum dado disponível.</p>
            )}
            <div className="p-d-flex p-jc-between p-mt-4">
              <Button label="Voltar" onClick={prevStep} />
              <Button label="Próximo" onClick={nextStep} />
            </div>
          </StepperPanel>

          {/* Passo 3 - Finalização */}
          <StepperPanel header="Finalizar Importação">
            <p>Os dados estão prontos para serem enviados ao Supabase.</p>
            <div className="p-d-flex p-jc-between p-mt-4">
              <Button label="Voltar" onClick={prevStep} />
              <Button
                label="Finalizar"
                onClick={() => setDialogVisible(false)}
              />
            </div>
          </StepperPanel>
        </Stepper>
      </Dialog>
    </div>
  );
};

export default CpImport;
