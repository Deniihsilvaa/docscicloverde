import  { useState } from 'react';

const PainelRegistro = () => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="employee-record">
      <div className="header" onClick={toggleDetails}>
        <h2>Registro de colaborador</h2>
        <span className="arrow">{showDetails ? '▲' : '▼'}</span>
      </div>
      {showDetails && (
        <div className="details">
          <div className="section">
            <h3>Plano de Saúde</h3>
          </div>
          <div className="section">
            <h4>Data de início</h4>
            <h4>Salário</h4>
            <h4>Função</h4>
            <h4>Benefício</h4>
            <h4>Salário família</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default PainelRegistro;
