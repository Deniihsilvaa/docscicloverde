//
import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Banknote, Notebook } from "lucide-react";
import { PainelFinanceiroProps, loadingDateColaborador } from "../types";
import { useAuth } from "../../../hooks/AuthContext";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Dialog } from "primereact/dialog";
import DocsColabProps from "../../../components/buttons/buttonStyle";
import { useNavigate } from "react-router";

import { formatMoney } from "../../../utils/formatMoney";

export const CreateListInfo: React.FC = () => {
  const [colaborador, setColaborador] = useState<PainelFinanceiroProps | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchData = async () => {
    if (!user?.user_id) {
      console.error("Usuário não encontrado");
      setLoading(false);
      return;
    }
  
    try {
      const response = await loadingDateColaborador(user.user_id);
      if (typeof response) {
        setColaborador(response);  // Armazena o resultado em um array
        console.log("Retorno colaborador",response)
      }
    } catch (e) {
      console.error("ERRO DE CARREGAMENTO", e);
    } finally {
      setLoading(false);
    }
  };
  
  const [visible, setVisible] = useState(false);

  const openModal = () => {
    setVisible(true);
  };
  const handleNavigation = (path) => {
    navigate.apply(this, [`/op/${path}`]);
  };
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-text-center">Carregando...</div>;
  }

  return (
    <>

<Card title="Informações">
  <Accordion multiple activeIndex={[0]}>
    {/* Salário */}
    <AccordionTab
      header={
        <span className="flex w-full gap-2 align-items-center">
          <Banknote size={24} />
          <span className="font-bold white-space-nowrap">Salário</span>
        </span>
      }
    >
      <b>Salário:</b> {formatMoney(colaborador?.salario)}
      <p className="font-bold">Informações sobre o Adiantamento:</p>
      <p>
        O colaborador pode solicitar adiantamento de até 40% do seu salário até o dia 18 de cada mês. O pagamento do adiantamento será feito no dia 20 (útil) do mesmo mês. O pagamento do salário é realizado no 5º dia útil de cada mês.
      </p>
    </AccordionTab>

    {/* Cesta Básica */}
    <AccordionTab
      header={
        <span className="flex w-full gap-2 align-items-center">
          <Banknote size={24} />
          <span className="font-bold white-space-nowrap">Cesta Básica</span>
        </span>
      }
    >
      <p>{formatMoney(colaborador?.cesta_basica)}</p>
      <p className="font-bold">Informações:</p>
      <span>
      A cesta básica é um benefício oferecido pela Ciclo Verde aos seus colaboradores, no valor de R$ 130,00, e é pago diretamente na folha de pagamento. Esse benefício tem como objetivo auxiliar no custo de alimentação dos funcionários, garantindo uma maior qualidade de vida e bem-estar.

O valor da cesta básica é automaticamente descontado no salário, sendo parte integrante da remuneração mensal. Todos os colaboradores que fazem parte da empresa recebem esse benefício, contribuindo para o sustento e a alimentação durante o período de trabalho.
      </span>
    </AccordionTab>

    {/* Vale Transporte */}
    <AccordionTab
      header={
        <span className="flex w-full gap-2 align-items-center">
          <Banknote size={24} />
          <span className="font-bold white-space-nowrap">VT</span>
        </span>
      }
    >
      <p>{formatMoney(colaborador?.vt) || "Sem VT"}</p>
      <p className="font-bold">Informações:</p>
      <p>
        Vale Transporte (VT) é um benefício concedido pelas empresas aos seus colaboradores para cobrir os custos com deslocamento entre a residência e o local de trabalho. O VT é obrigatório para empresas com mais de 10 empregados, conforme a legislação brasileira (Lei nº 7.418/1985), e deve ser fornecido mensalmente, permitindo que o trabalhador utilize meios de transporte público, como ônibus, metrô ou trem. O valor do benefício não pode exceder 6% do salário base e é descontado do salário do empregado. Caso o trabalhador precise de mais transporte, ele pode complementar com recursos próprios.
      </p>
    </AccordionTab>

    {/* Plano de Saúde */}
    <AccordionTab
      header={
        <span className="flex w-full gap-2 align-items-center">
          <Notebook size={24} />
          <span className="font-bold white-space-nowrap">Plano de Saúde</span>
        </span>
      }
    >
      <p>{colaborador?.plano_saude || "-"}</p>
      <p className="font-bold">Informações:</p>
      <p>
        O plano de saúde é um benefício oferecido para garantir a assistência médica aos colaboradores. Na Ciclo Verde, o acesso ao plano de saúde é restrito aos colaboradores com mais de 90 dias de trabalho. Caso não esteja incluído, entre em contato com o RH após o prazo para solicitar a inclusão.
      </p>
    </AccordionTab>

    {/* Vale Refeição */}
    <AccordionTab
      header={
        <span className="flex w-full gap-2 align-items-center">
          <Notebook size={24} />
          <span className="font-bold white-space-nowrap">Vale Refeição</span>
        </span>
      }
    >
      <p>{colaborador?.vale_refeicao ? "Você possui vale refeição" : "-"}</p>
    </AccordionTab>

    {/* Extratos */}
    <AccordionTab header="Extratos">
      <div className="grid grid-cols-1 gap-3">
        <DocsColabProps label={"Extrato de Pagamento"} onClick={() => handleNavigation("extrato")} />
        <DocsColabProps label={"Extrato de Adiantamento"} onClick={openModal} />
        <DocsColabProps label={"Folha de Ponto"} onClick={openModal} />
      </div>
    </AccordionTab>
  </Accordion>

  {/* Modal de Detalhes */}
  <Dialog
    header="Detalhes"
    visible={visible}
    style={{ width: "50vw" }}
    onHide={() => setVisible(false)}
  >
    <p>Conteúdo do modal aqui...</p>
  </Dialog>
</Card>
</>
  );
};
