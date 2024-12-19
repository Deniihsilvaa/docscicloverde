import React from "react";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { MTRData } from "./TableMTR";

interface SidebarDetailsProps {
  visible: boolean;
  onHide: () => void;
  selectedRow: MTRData | null;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  onSave: () => Promise<void>;
  onDelete: () => Promise<void>;
  setSelectedRow: (value: MTRData) => void;
  transportadoras: string[];
}

const SidebarDetails: React.FC<SidebarDetailsProps> = ({
  visible,
  onHide,
  selectedRow,
  isEditing,
  setIsEditing,
  onSave,
  onDelete,
  setSelectedRow,
  transportadoras,
}) => {
  if (!selectedRow) return null;

  return (
    <Sidebar visible={visible} onHide={onHide} className="p-sidebar-lg" position="right">
      <div className="grid p-fluid">
        <div className="field col-6">
          <label htmlFor="mtr">MTR</label>
          <InputText
            id="mtr"
            value={selectedRow.mtr}
            onChange={(e) => setSelectedRow({ ...selectedRow, mtr: e.target.value })}
            disabled={!isEditing}
          />
        </div>
        <div className="field col-6">
          <label htmlFor="situacao">Situação</label>
          <Dropdown
            id="situacao"
            value={selectedRow.situacao}
            options={["Recebido", "Salvo"]}
            onChange={(e) => setSelectedRow({ ...selectedRow, situacao: e.value })}
            disabled={!isEditing}
          />
        </div>
        {/* Outros campos... */}
        <div className="field col-6">
          <label htmlFor="transportadornome">Transportador</label>
          <Dropdown
            id="transportadornome"
            value={selectedRow.transportadornome}
            options={transportadoras}
            onChange={(e) => setSelectedRow({ ...selectedRow, transportadornome: e.value })}
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="flex mt-3 justify-content-between">
        {isEditing ? (
          <Button label="Salvar" icon="pi pi-save" className="p-button-success" onClick={onSave} />
        ) : (
          <Button label="Editar" icon="pi pi-pencil" className="p-button-warning" onClick={() => setIsEditing(true)} />
        )}
        <Button label="Excluir" icon="pi pi-trash" className="p-button-danger" onClick={onDelete} />
        <Button label="Fechar" icon="pi pi-times" className="p-button-secondary" onClick={onHide} />
      </div>
    </Sidebar>
  );
};

export default SidebarDetails;
