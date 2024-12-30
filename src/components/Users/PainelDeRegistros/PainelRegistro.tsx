import React, { useState, useEffect } from "react";
import ListInforUser from "./List/ListRegistro";
import { Card } from "primereact/card";
import ButtonHeader from "./headerRegistro/ButtonHeader";
import ButtonViewRegistroColab from "../../../components/buttons/ButtonViewRegistroColab";
const PainelRegistro = () => {
  return (
    <div className="px-4 space-y-4 max-w-100">
      <Card title="Registros">
        <div className="container overflow-x-auto">
          <h2 className="text-lg font-semibold">Meus Registros</h2>
          <ButtonViewRegistroColab typeDocs="Registro"/>
          <ListInforUser />
        </div>
      </Card>
    </div>
  );
};

export default PainelRegistro;
