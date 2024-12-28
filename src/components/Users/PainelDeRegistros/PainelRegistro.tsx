import React, { useState, useEffect } from "react";
import ListInforUser from "./List/ListRegistro";
import { Card } from "primereact/card";
const PainelRegistro = () => {
  return (
    <div className="p-2">
      <Card
        title="Registros"
      >
        <ListInforUser />
      </Card>
    </div>
  );
};

export default PainelRegistro;
