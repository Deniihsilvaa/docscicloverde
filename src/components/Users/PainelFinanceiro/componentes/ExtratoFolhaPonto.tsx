import React, { useState, useEffect } from "react";
import { fetchPagamentosFolhaPontoProps, fetchPagamentosFolhaPonto } from "../../types";
import ListExtratoFolhaPonto from "./ListExtratoFolhaPonto";
import { Dropdown } from "primereact/dropdown";
import { BreadCrumb } from "primereact/breadcrumb";
import { useNavigate } from "react-router";

const ExtratoFolhaPonto = () => {
  const anos = [
    { label: "2025", value: 2025 },
    { label: "2024", value: 2024 },
    { label: "2023", value: 2023 },
    { label: "2022", value: 2022 },
  ];

  const [listFolha, setListFolha] = useState<fetchPagamentosFolhaPontoProps[]>([]);
  const [anoSelecionado, setAnoSelecionado] = useState(2024);
  const loadingData = async () => {
    const retur = await fetchPagamentosFolhaPonto(anoSelecionado);
    if (typeof retur) {
        console.log("Retornando ",retur)
      setListFolha(retur || []);
    }
  };
  useEffect(() => {
    loadingData();  // Carrega os dados sempre que o ano for alterado
  }, [anoSelecionado]);
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate.apply(this, [`/op/${path}`]);
  };
const items = [
  {
    label: "financeiro",
    command: () => handleNavigation("financeiro"),
    
  },
  {
    label: "Extrato de Folha de Ponto",
    template: () => <a className="font-semibold text-primary">Extrato de Folha de Ponto</a>,
  },
];
const home = { icon: "pi pi-home", url: "/home" };

  return (
    <>
    <BreadCrumb model={items} home={home} />
      <div className="p-mb-4">
        <Dropdown
          value={anoSelecionado}
          options={anos}
          onChange={(e) => setAnoSelecionado(e.value)}
          placeholder="Selecione o Ano"
        />
      </div>
      <ListExtratoFolhaPonto
         dadosFolha={listFolha}  // Passa os listFolha como prop
         anoSelecionado={anoSelecionado}  // Passa o ano selecionado
      ></ListExtratoFolhaPonto>
    </>
  );
};

export default ExtratoFolhaPonto;
