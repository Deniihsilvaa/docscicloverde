import React, { useState } from "react";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { Button } from "primereact/button";
import { ServiceRequest } from "./types";
import { FormRequest } from "./FormRequest";
import { FormRequestProduto } from "./FormRequestProduto";
import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";
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
<div className="container p-1 mx-auto">
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-1">
            <div className="mb-4 text-2xl font-bold text-center header">
                Formulário de Solicitação Request
            </div>
                    <Card title="Solicitacao">
                        <Toast ref={toast} />
                        <div className="grid grid-cols-2">
                            <div className="m-2 ">
                                <Button
                                    label="Folha de solicitação"
                                    onClick={() => setDialogVisible(true)}
                                />
                            </div>
                            <div className="m-2 ">
                                <Button
                                    label="Request Diario..."
                                    onClick={() => setDialogVisibleProducts(true)}
                                />
                            </div>
                        </div>

                        <Dialog
                            header="Folha de solicitação"
                            visible={dialogVisible}
                            style={{ width: '70vw', height: '79vh' }}
                            onHide={() => setDialogVisible(false)}
                        >
                            <div className="contents shadow-neutral-400">
                                <FormRequest onSubmit={handleSubmit} />
                            </div>
                        </Dialog>

                        <Dialog
                            header="Request Diario..."
                            visible={dialogVisibleProducts}
                            style={{ width: '70vw', height: '79vh' }}
                            onHide={() => setDialogVisibleProducts(false)}
                        >
                            <div className="contents shadow-neutral-400">
                                <FormRequestProduto onSubmit={handleSubmit} />
                            </div>
                        </Dialog>
                    </Card>
                </div>
                <div className="col-span-2">
                <div className="mb-4 text-2xl font-bold text-center header">
                Dados 
            </div>
                    <Card title="Tabela">
                        <div className="p-6">
                            {/* Conteúdo da tabela aqui */}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );

 
};

export default DashBoardRequest;
