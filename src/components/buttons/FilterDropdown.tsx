import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { ColaboradorProps } from "../Operacional/Registro/types";

type FilterDropdownProps = {
  colaboradores: ColaboradorProps[];
  onFilterChange: (id: string) => void;
};

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  colaboradores,
  onFilterChange,
}) => {
  const dropdownItems = [
    { label: "Todos", value: "" },
    ...colaboradores.map((colaborador) => ({
      label: colaborador.nome,
      value: colaborador.id,
    })),
  ];
  const [selectedItem, setSelectedItem] = useState<string>("");
  return (
    <Dropdown
      value={selectedItem??""}
      options={dropdownItems}
      onChange={(e) => {
        setSelectedItem(e.value);
        onFilterChange(e.value);
      }}
      placeholder="Selecione um colaborador"
    />
  );
};

export default FilterDropdown;
