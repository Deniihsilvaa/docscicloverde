import React, { useState, useRef, useEffect } from "react";
import {useToast} from "../../Toast/ToastContext";

import FormRegistroColab from "./FormRegistroColab";
import { handleOnSubmit } from "./types";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import DataTableColaboradores from "./TableRegistroColab";
export default function Registro() {
  const {showToast} = useToast();
  
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);

  async function handleSubmit(data:any[]):Promise<void> {
    const result = await handleOnSubmit(data);


    console.log("Retorno do salvamento:", result);
    if (result) {
      showToast({
        severity: "success",
        summary: "Sucesso",
        detail: "Dados salvos com sucesso!",
        life:3000,
      });
      setDialogVisible(false);
    }else if (!result || result === null) {
      showToast({
        severity: "error",
        summary: "Erro",
        detail: `Erro ao cadastrar Solicitação!${result}`,
        life:5000,
      })
      showToast({
        severity: "info",
        summary: "Informação",
        detail: "O colaborador nao foi cadastrado, Por favor tentar novamente ou falar com Adm!",
        life:5000,
      })
    }

  }
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen mx-auto">
      <div className="justify-center">
        <Card title="Colaboradores" className="w-full">
          <div className="flex gap-3 card flex-column md:flex-row">
            <Button
              label="Registrar Colaborador"
              onClick={() => setDialogVisible(true)}
            />
          </div>
        </Card>
        <Card title="Tabela de Colaboradores" className="mt-1">
          <DataTableColaboradores />
        </Card>
      </div>
      <Dialog
        header="Registro de Colaborador"
        visible={dialogVisible}
        style={{ width: "70vw", maxHeight: "80vh" }}
        onHide={() => setDialogVisible(false)}
      >
        <div className="contents shadow-neutral-400">
          <FormRegistroColab onSubmit={handleSubmit} />
        </div>
      </Dialog>
    </div>
  );
}
