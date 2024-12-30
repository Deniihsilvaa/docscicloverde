import { useNavigate } from "react-router";
import { Button } from "primereact/button";

function UserOP() {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate.apply(this, [`/op/${path}`]);
  };
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      {/* Main Content */}
      <div className="w-full max-w-4xl p-4 space-y-6 shadow-2xl">
        {/* Painel Documento */}
        <div className="flex items-center p-4 rounded-lg shadow-md bg-slate-50 hover:bg-cyan-700">
          <Button
            label="Painel de Documento"
            className="w-full font-bold text-black p-button-outlined p-button-info"
            onClick={() => handleNavigation("painel")}
          />
        </div>

        {/* Painel Financeiro */}
        <div className="flex items-center p-4 shadow-md bg-slate-50rounded-lg hover:bg-cyan-700">
          <Button
            label="Painel Financeiro"
            className="w-full font-bold text-black p-button-outlined p-button-help"
            onClick={() => handleNavigation("financeiro")}
          />
        </div>

        {/* Painel Solicitação */}
        <div className="flex items-center p-4 shadow-md bg-slate-50rounded-lg hover:bg-cyan-700">
          <Button
            label="Painel Solicitação"
            className="w-full font-bold text-black p-button-outlined p-button-success"
            onClick={() => navigate("/painel-solicitacao")}
          />
        </div>

        {/* Painel FeedBack */}
        <div className="flex items-center p-4 shadow-md bg-slate-50rounded-lg hover:bg-cyan-700">
          <Button
            label="Painel Feedback"
            className="w-full font-bold text-black p-button-outlined p-button-warning"
            onClick={() => navigate("/painel-feedback")}
          />
        </div>
      </div>
    </div>
  );
}

export default UserOP;
