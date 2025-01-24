import React, { useState, useEffect } from "react";
import ListInforUser from "./List/ListRegistro";
import ButtonViewRegistroColab from "../../../components/buttons/ButtonViewRegistroColab";
import { BreadCrumb } from "primereact/breadcrumb";
import { useNavigate } from "react-router";


const PainelRegistro = () => {
  const navigate = useNavigate();

  const handleNavigation = (path:string) => {
    navigate.apply(this, [`/op/${path}`] );
  };

  const items = [
    {
      label: "Documentos",
      template: () => (
        <a className="font-semibold text-primary">Documentos</a>
      ),
    },
  ];
  const home = { icon: "pi pi-home", command: () => handleNavigation("home") };

  return (
    <div className="container">
      <BreadCrumb model={items} home={home} />
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Meus Registros</h2>
        <ButtonViewRegistroColab typeDocs="Registro" />
        <ListInforUser />
      </div>
    </div>
  );
};

export default PainelRegistro;
