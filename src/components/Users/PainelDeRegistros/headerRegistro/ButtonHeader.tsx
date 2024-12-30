import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { DocsColabProps, DocsColab } from "../types";

export default function ButtonHeader() {
  const [docs, setDocs] = useState<DocsColabProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    DocsColab().then((data) => {
      setDocs(data);
      setLoading(false);
    });
  }, []);

  const handleDownload = (link: string) => {
    const anchor = document.createElement("a");
    anchor.href = link;
    anchor.download = ""; // Força o download do arquivo
    anchor.click();
  };


  return (
    <>
      {docs.length > 0 ? (
        docs.map((doc, index) => (
          <Button
            key={index}
            label={doc.typeDocs || "Documento"}
            onClick={() => handleDownload(doc.link)}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">Nenhum documento disponível</p>
      )}
    </>
  );
}
