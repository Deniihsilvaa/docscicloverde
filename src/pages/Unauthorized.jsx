import { Button } from "primereact/button";
function Unauthorized() {
  return (
    <div className="justify-center h-screen bg-gray-100">
      <p>
        <h1 className="text-4xl font-bold">Acesso Restrito</h1>
      </p>
      <p className="mt-4">Você não tem permissão para acessar esta página.</p>
      <p>
        <Button label="Voltar" onClick={() => window.history.back()} />
      </p>
    </div>
  );
}

export default Unauthorized;
