import React, { useState } from "react";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { Button } from "primereact/button";
import { ServiceRequest } from "./types";
import { FormRequest } from "./FormRequest";
import { FormRequestProduto } from "./FormRequestProduto";
import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";
import TableRequest from './table/TableRequest'
const DashBoardRequest: React.FC = () => {
  const [formData, setFormData] = useState<ServiceRequest>({
    email: "",
    razaoSocial: "",
    os: "",
    numeroRelatorio: "",
    dataFinalizacao: null,
    valorFaturado: null,
    solicitante: "",
    comprador: "",
    cnpj: "",
    manutencaoPreventiva: false,
  });

  const toast = useRef<Toast>(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogVisibleProducts, setDialogVisibleProducts] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="container max-w-5xl">
        <div className="w-full align-content-center">
          {/* Card de Solicitação */}
          <Card title="Solicitação">
            <Toast ref={toast} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                label="Folha de solicitação"
                className="w-full"
                onClick={() => setDialogVisible(true)}
              />
              <Button
                label="Request Diário"
                className="w-full"
                onClick={() => setDialogVisibleProducts(true)}
              />
            </div>
  
            {/* Diálogo de Solicitação */}
            <Dialog
              header="Folha de solicitação"
              visible={dialogVisible}
              style={{ width: '70vw', maxHeight: '80vh' }}
              onHide={() => setDialogVisible(false)}
            >
              <div className="contents shadow-neutral-400">
                <FormRequest onSubmit={handleSubmit} />
              </div>
            </Dialog>
  
            {/* Diálogo de Produtos */}
            <Dialog
              header="Request Diário"
              visible={dialogVisibleProducts}
              style={{ width: '70vw', maxHeight: '80vh' }}
              onHide={() => setDialogVisibleProducts(false)}
            >
              <div className="contents shadow-neutral-400">
                <FormRequestProduto onSubmit={handleSubmit} />
              </div>
            </Dialog>
          </Card>
  
          {/* Card da Tabela */}
          <Card title="Tabela">
            <div className="p-4">
              <TableRequest />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
  

 
};

export default DashBoardRequest;
