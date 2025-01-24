import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import axios from "axios";


// Tipagem para os documentos do colaborador
interface DocsColabProps {
  link: string;
  typeDocs: string;
  refDate: Date;
}

const ButtonViewRegistroColab = ({ typeDocs }: { typeDocs: string }) => {
  const [docs, setDocs] = useState<DocsColabProps[]>([]);

  useEffect(() => {
    loadDocs();
  }, []);

  const loadDocs = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const userID = localStorage.getItem("authUser");
      const user = userID ? JSON.parse(userID).id : null;
      if (!token || !user) {
        console.error("Token ou colaborador inválido!");
        return;
      }
      
      const response = await axios.get(
        `https://newback-end-cicloverde.onrender.com/op/colab/docs`,
        {
          params: { idUser: user, typeDocs },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setDocs(response.data || []);
    } catch (error) {
      console.error("Erro ao carregar documentos do backend:", error);
    }
  };

  const viewDate = (url: string | null) => {
    if (url) {
      window.open(url, "_blank"); // Abre o link em uma nova aba
    } else {
      console.log("sem url"); // Exibe mensagem no console se não houver URL
    }
  };

  return (
    <div>
      {docs.length > 0 ? (
        docs.map((doc: DocsColabProps, index) => (
          <Button
            key={index}
            label={`Visualizar: ${doc.typeDocs}`}
            icon="pi pi-file"
            tooltip={`Visualizar: ${doc.typeDocs} ${doc.refDate}`}
            tooltipOptions={{ position: "bottom" }}
            className="text-blue-600 bg-transparent border-none hover:bg-blue-600 hover:text-white"
            onClick={() => viewDate(doc.link)}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">Nenhum documento disponível</p>
      )}
    </div>
  );
};

export default ButtonViewRegistroColab;
