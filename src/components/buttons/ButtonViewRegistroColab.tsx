import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthContext";
import { supabase } from "../../services/supabase";

// Tipagem para os documentos do colaborador
interface DocsColabProps {
  link: string;
  typeDocs: string;
  refDate: Date;
}

const ButtonViewRegistroColab = ({ typeDocs }) => {
  const { user } = useAuth();
  const [docs, setDocs] = useState<DocsColabProps[]>([]);

  useEffect(() => {
    loadDocs();
  }, []);

  const loadDocs = async () => {
    const { data, error } = await supabase
      .from("docs_colab")
      .select("link,typeDocs,refDate")
      .eq("user_id", user?.user_id)
      .eq("typeDocs", typeDocs);

    if (error) {
      console.error("Erro ao carregar os dados!", error);
    }
    setDocs(data || []);
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
