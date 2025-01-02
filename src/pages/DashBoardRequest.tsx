import React, { useState } from "react";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { Button } from "primereact/button";
import { ServiceRequest } from "../components/PainelRequest/types";
import { FormRequest } from "../components/PainelRequest/FormRequest";
import { FormRequestProduto } from "../components/PainelRequest/FormRequestProduto";
import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";

import TableRequest from "../components/PainelRequest/table/TableRequest";
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
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50 min-w-screen">
      <Toast ref={toast} />
      <div className="container w-full">
        <Card title="Registros">
          <div className="grid grid-cols-1 gap-4">
            <div className="col-1">
              <Button
                label="Folha de solicitação"
                className="w-full"
                onClick={() => setDialogVisible(true)}
              />
            </div>
            <div className="col-1">
              <Button
                label="Request Diário"
                className="w-full"
                onClick={() => setDialogVisibleProducts(true)}
              />
            </div>
          </div>

          {/* Diálogo de Solicitação */}
          <Dialog
            header="Folha de solicitação"
            visible={dialogVisible}
            style={{ width: "70vw", maxHeight: "80vh" }}
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
            style={{ width: "70vw", maxHeight: "80vh" }}
            onHide={() => setDialogVisibleProducts(false)}
          >
            <div className="contents shadow-neutral-400">
              <FormRequestProduto onSubmit={handleSubmit} />
            </div>
          </Dialog>
        </Card>

        <Card title="Tabela">
          <div className="p-4">
            <TableRequest />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashBoardRequest;
