import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";


// Tipagem para os documentos do colaborador
interface DocsColabProps {
    onClick: ()=> void;
    label: string;
}

const ButtonSty: React.FC<DocsColabProps> = ({ label,onClick }) => {


  return (
    <div>

          <Button
            label={label}
            className="text-blue-600 bg-transparent border-none hover:bg-blue-600 hover:text-white"
            onClick={() => onClick()} 
          />

    </div>
  );
};

export default ButtonSty;
