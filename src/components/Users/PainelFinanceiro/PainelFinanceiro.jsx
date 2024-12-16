import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

const PainelFinanceiro = () => {
  return (
    <div>
      <Button label="Extrato de Pagamento" />
      <Button label="Extrato de Adintamento" />
      <Button label="Extrato de Folha de Ponto" />
      <Card title="Informações">
        <div>
          <b>Salário:</b>
        </div>
        <div>
          <b>Próximo Pagamento:</b>
        </div>
        <div>
          <b>Descrição:</b>
        </div>
      </Card>
    </div>
  );
};

export default PainelFinanceiro;