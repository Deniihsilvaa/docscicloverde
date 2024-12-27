import React, { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import FormRegistroColab from "./FormRegistroColab";
import { FormDataProsp } from "./types";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import DataTableColaboradores from "./TableRegistroColab";

export default function Registro() {
  const toast = useRef<Toast>(null);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);

  function handleSubmit(data: FormDataProsp) {
    console.log("Dados para salvar:", data);
  }
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen mx-auto">
      <Toast ref={toast} position="top-right" />
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
