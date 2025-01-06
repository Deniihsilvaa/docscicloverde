import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import Toast from "../Toast/ToastModel";
import { listProdutc } from "../../api/Api";
interface Item {
  label: string;
  value: string;
}
const FormRequestProduto = ({ metodo, onSubmit, initialValues }) => {
  const [loading, setLoading] = useState(false);
  const [isEdit] = useState<boolean>(!!initialValues?.id);
  const [formData, setFormData] = useState({
    id: "",
    url_nuvem: "",
    email: "",
    data_coleta: new Date() || initialValues?.data_coleta,
    pesagem_inicial: 0 || initialValues?.pesagem_inicial,
    pesagem_final: 0 || initialValues?.pesagem_final,
    item_coletado: "" || initialValues?.item_coletado,
    material: "",
    preco_por_kg: 0 || initialValues?.preco_por_kg,
    peso_total: 0,
    valor_total: 0,
    responsavel: "",
    telefone: "",
    numero_request: 0 || initialValues?.numero_request,
    historico_aprovacao: "",
    status_confirmacao: "",
    nfe: 0 || initialValues?.nfe,
  });
  const [items, setItems] = useState<Item[]>([]);
  const stepperRef = useRef<any>(null);
  const toast = useRef<any>(null);

  const listaProdutos = async () => {
    const response = await listProdutc();
    setItems(response);
  };
  const formatDate = (dateString) => {
    const dataFormatada = new Date(dateString);

    dataFormatada.setHours(dataFormatada.getHours() + 3);
    return dataFormatada;
  };

  const handleDateChange = (e) => {
    setFormData({ ...formData, data_coleta: e.value });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (
        !formData.email ||
        !formData.data_coleta ||
        !formData.pesagem_inicial ||
        !formData.pesagem_final ||
        !formData.item_coletado ||
        !formData.preco_por_kg ||
        !formData.peso_total ||
        !formData.valor_total ||
        !formData.responsavel ||
        !formData.telefone ||
        !formData.numero_request ||
        !formData.status_confirmacao
      ) {

        toast.current?.show({
          severity: "warn",
          summary: "Campos obrigatórios",
          detail: "Preencha todos os campos.",
        });
        return;
      }
      console.log(metodo)
      debugger
      if (metodo === "duplic") {
        const { id, material, ...rest } = formData;
        onSubmit(rest);
      } else if (metodo === "edit") {
        const { material, ...rest } = formData;
        onSubmit(rest);
      }
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Erro ao enviar formulário",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChangeSomar = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newFormData = { ...prev, [name]: value };
      const pesagem_inicial = Number(newFormData.pesagem_inicial) || 0;
      const pesagem_final = Number(newFormData.pesagem_final) || 0;
      const preco_por_kg = Number(newFormData.preco_por_kg) || 0;

      const peso_total = pesagem_final - pesagem_inicial;
      const valor_total = peso_total > 0 ? peso_total * preco_por_kg : 0;

      return { ...newFormData, peso_total, valor_total };
    });
  };
  useEffect(() => {
    listaProdutos();
  }, []);
  useEffect(() => {
    if (initialValues) {
      setFormData({
        ...initialValues,
        data_coleta: initialValues.data_coleta
          ? formatDate(initialValues.data_coleta)
          : new Date(),
      });
    }
  }, [initialValues]);

  return (
    <div className="mt-2">
      <Toast ref={toast} />
      <form onSubmit={handleSubmit}>
        <Stepper ref={stepperRef} linear={true}>
          <StepperPanel header="Informações da Solicitação">
            <div className="col-span-1 p-2">
              <span>E-mail</span>
              <InputText
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="E-mail"
                className="w-full"
                required
              />
            </div>
            <div className="col-span-1 p-2">
              <span>Data da Coleta</span>
              <Calendar
                name="data_coleta"
                value={formData.data_coleta}
                onChange={(e) => handleDateChange(e)}
                icon="fa-calendar"
                dateFormat="dd/mm/yy"
                required
              />
            </div>
            <Button
              label="Avançar"
              onClick={() => stepperRef.current?.nextCallback()}
            />
          </StepperPanel>
          <StepperPanel header="Informações da Pesagem">
            <div className="col-span-1 p-2">
              <span>Pesagem Inicial (kg)</span>
              <InputNumber
                name="pesagem_inicial"
                value={formData.pesagem_inicial}
                onValueChange={handleChangeSomar}
                placeholder="Pesagem Inicial (kg)"
                className="w-full"
                required
              />
            </div>
            <div className="col-span-1 p-2">
              <span>Pesagem Final (kg)</span>
              <InputNumber
                name="pesagem_final"
                value={formData.pesagem_final}
                onValueChange={handleChangeSomar}
                placeholder="Pesagem Final (kg)"
                className="w-full"
                required
              />
            </div>

            <div className="col-span-1 p-2">
              <span>Item Coletado</span>
              <select
                aria-label="Select item coletado"
                name="item_coletado"
                value={formData.item_coletado}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    item_coletado: e.target.value,
                  });
                }}
              >
                <option value="">Selecione um item</option>
                {items.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-1 p-2">
              <span>Peso Total (kg)</span>
              <InputNumber
                name="peso_total"
                value={formData.peso_total}
                placeholder="Peso Total (kg)"
                className="w-full"
                disabled
                required
              />
            </div>
            <div className="col-span-1 p-2">
              <span>Preço por kg (R$)</span>
              <InputNumber
                name="preco_por_kg"
                value={formData.preco_por_kg}
                onValueChange={handleChangeSomar}
                placeholder="Preço por kg (R$)"
                className="w-full"
                mode="decimal"
                minFractionDigits={2}
                required
              />
            </div>
            <div className="col-span-1 p-2">
              <span>Valor Total (R$)</span>
              <InputNumber
                name="valor_total"
                value={formData.valor_total}
                placeholder="Valor Total (R$)"
                className="w-full"
                required
                disabled
                mode="currency"
                currency="BRL"
                locale="pt-BR"
              />
            </div>
            <Button
              label="Voltar"
              onClick={() => stepperRef.current?.prevCallback()}
            />
            <Button
              label="Avançar"
              onClick={() => stepperRef.current?.nextCallback()}
            />
          </StepperPanel>
          <StepperPanel header="Informações do Contato">
            <div className="col-span-1 p-2">
              <span>Responsável</span>
              <InputText
                name="responsavel"
                value={formData.responsavel}
                onChange={(e) => {
                  setFormData({ ...formData, responsavel: e.target.value });
                }}
                placeholder="Nome do responsável"
                className="w-full"
                required
              />
            </div>
            <div className="col-span-1 p-2">
              <span>Telefone</span>
              <InputText
                name="telefone"
                value={formData.telefone}
                onChange={(e) =>
                  setFormData({ ...formData, telefone: e.target.value })
                }
                placeholder="(XX) XXXXX-XXXX"
                className="w-full"
                required
              />
            </div>

            <Button
              label="Voltar"
              onClick={() => stepperRef.current?.prevCallback()}
            />
            <Button
              label="Avançar"
              onClick={() => stepperRef.current?.nextCallback()}
            />
          </StepperPanel>
          <StepperPanel header="Informações de finais">
            <div className="col-span-1 p-2">
              <span>Numero do Request</span>
              <InputNumber
                name="numero_request"
                value={formData.numero_request}
                onValueChange={(e) =>
                  setFormData({
                    ...formData,
                    numero_request: e.value,
                  })
                }
                useGrouping={false}
                placeholder="Numero request"
                className="w-full"
                required
              />
            </div>
            <div className="col-span-1 p-2">
              <span>Link</span>
              <InputText
                name="url_nuvem"
                value={formData.url_nuvem}
                onChange={(e) =>
                  setFormData({ ...formData, url_nuvem: e.target.value })
                }
                placeholder="https//"
                className="w-full"
              />
            </div>
            <div className="col-span-1 p-2">
              <span>Histórico de Aprovação</span>
              <textarea
                name="historico_aprovacao"
                value={formData.historico_aprovacao}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    historico_aprovacao: e.target.value,
                  })
                }
                placeholder="Exemplo: Aprovado por gilberto.gonzalez@aperam.com..."
                rows={5}
                className="w-full p-inputtext"
              />
            </div>
            <div className="col-span-1 p-2">
              <span>Nfe</span>
              <InputNumber
                name="nfe"
                value={formData.nfe}
                onChange={(e) => setFormData({ ...formData, nfe: e.value })}
                placeholder="Nº Nfe"
                className="w-full"
                useGrouping={false}
              />
            </div>
            <div className="col-span-1 p-2">
              <span>Confirmação de Status</span>
              <Dropdown
                name="status_confirmacao"
                value={formData.status_confirmacao}
                options={[
                  { label: "Completo", value: "completo" },
                  { label: "Negado", value: "negado" },
                  { label: "Registrado", value: "registrado" },
                ]}
                onChange={(e) =>
                  setFormData({ ...formData, status_confirmacao: e.value })
                }
                placeholder="Selecione o status"
                className="w-full"
                required
              />
            </div>
            <div className="flex justify-end p-2">
              <Button
                label={isEdit ? "Atualizar" : "Registrar"}
                type="submit"
                className="p-button-success"
              />
            </div>

            <Button
              label="Voltar"
              onClick={() => stepperRef.current?.prevCallback()}
            />
          </StepperPanel>
        </Stepper>
      </form>
    </div>
  );
};

export default FormRequestProduto;
