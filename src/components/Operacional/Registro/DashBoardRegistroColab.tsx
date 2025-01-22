import React, { useState,useEffect } from "react";
import { useToast } from "../../Toast/ToastContext";
import { useNavigate } from "react-router";
import FormRegistroColab from "./FormRegistroColab";
import { handleOnSubmit, FormDataPros } from "./types";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import DataTableColaboradores from "./TableRegistroColab";
import { FormProps } from "react-router";
export default function Registro() {
  const { showToast } = useToast();

  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [reloadTable, setReloadTable] = useState(false);
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<FormDataPros | undefined>(undefined);

  const handleSubmit = async (data : FormDataPros) => {
    try {
      const result = await handleOnSubmit(data);
      console.log('Resultado da função:', result);
      if (result) {
        showToast({
          severity: "success",
          summary: "Sucesso",
          detail: "Colaborador registrado com sucesso",
          life: 5000,
        });
        setReloadTable((prev) => !prev)
        setDialogVisible(false)
      } else {
        showToast({
          severity: "error",
          summary: "Erro",
          detail: "Erro ao salvar",
          life: 5000,
        });
      }
    } catch (error) {
      showToast({
        severity: "error",
        summary: "Erro",
        detail: error.message,
        life: 5000,
      });
    }
  };
  useEffect(() => {
    initialValues && setInitialValues(initialValues);
  }, [initialValues]);
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen mx-auto">
      <div className="justify-center bg-black">
        <Card title="Colaboradores" className="w-full">
          <div className="flex flex-col gap-3">
            <Button
              label="Registrar Colaborador"
              onClick={() => setDialogVisible(true)}
            />
            <Button
              label="Registrar Usuário"
              onClick={() => navigate("/admin/UserRegistrationForm")}
            />
          </div>
        </Card>

        <Card title="Tabela de Colaboradores" className="mt-1">
          <div className="overflow-x-auto">
            <DataTableColaboradores
              key={reloadTable ? "reload" : "default"}
              setDialogVisible={setDialogVisible}
              setInitialValues={setInitialValues}
            />
          </div>
        </Card>
      </div>
      <Dialog
        header="Registro de Colaborador"
        visible={dialogVisible}
        style={{ width: "70vw", maxHeight: "80vh" }}
        onHide={() => setDialogVisible(false)}
      >
        <div className="contents shadow-neutral-400">
          <FormRegistroColab
            initialValues={initialValues}
            onSubmit={handleSubmit}
            
          />
        </div>
      </Dialog>
    </div>
  );
}
