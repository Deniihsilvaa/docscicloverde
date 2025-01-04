import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import Toast from "../Toast/ToastModel";

const items = [
  { label: "SUCATA DE PAPEL KRAFT", value: "219869" },
  { label: "SUCATA DE FELTRO", value: "219867" },
  { label: "SUCATA DE PAPELÃO", value: "2000383" },
  { label: "SUCATA DE MADEIRA", value: "2198690" },
  { label: "SUCATA DE FERRO", value: "2198677" },
];

const FormRequestProduto = ({ onSubmit, initialValues }) => {
  const [isEdit] = useState<boolean>(!!initialValues?.id);
  const [formData, setFormData] = useState({
    id: initialValues?.id,
    url_nuvem: initialValues?.url_nuvem || "",
    email: initialValues?.email || "",
    data_coleta: initialValues?.data_coleta || new Date(),
    pesagem_inicial: initialValues?.pesagem_inicial || 0,
    pesagem_final: initialValues?.pesagem_final || 0,
    item_coletado: initialValues?.item_coletado || "",
    material: initialValues?.material || "",
    preco_por_kg: initialValues?.preco_por_kg || 0,
    peso_total: initialValues?.peso_total || 0,
    valor_total: initialValues?.valor_total || 0,
    responsavel: initialValues?.responsavel || "",
    telefone: initialValues?.telefone || "",
    numero_request: initialValues?.numero_request || 0,
    historico_aprovacao: initialValues?.historico_aprovacao || "",
    status_confirmacao: initialValues?.status_confirmacao || "",
    nfe: initialValues?.nfe || 0,
    
  });

  const stepperRef = useRef<any>(null);
  const toast = useRef<any>(null);

  const handleDateChange = (e) => {
    setFormData((prev) => ({ ...prev, data_coleta: e.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.data_coleta) {
      toast.current?.show({
        severity: "warn",
        summary: "Campos obrigatórios",
        detail: "Preencha todos os campos.",
      });
      return;
    }
    // desestuturar formData e retirar material
    const { material, ...rest } = formData;
    // enviar para onSubmit
    onSubmit(rest);
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
                onChange={(e) =>
                  setFormData({ ...formData, data_coleta: e.target.value })
                }
                showButtonBar
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
              <InputText
                name="pesagem_inicial"
                value={formData.pesagem_inicial}
                onChange={handleChangeSomar}
                placeholder="Pesagem Inicial (kg)"
                type="number"
                className="w-full"
                required
              />
            </div>
            <div className="col-span-1 p-2">
              <span>Pesagem Final (kg)</span>
              <InputText
                name="pesagem_final"
                value={formData.pesagem_final}
                onChange={handleChangeSomar}
                placeholder="Pesagem Final (kg)"
                type="number"
                className="w-full"
                required
              />
            </div>

            <div className="col-span-1 p-2">
              <span>Item Coletado</span>
              <select
                name="item_coletado"
                value={formData.item_coletado}
                onChange={(e) => {
                  setFormData({ ...formData, item_coletado: e.target.value });
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
              <InputText
                name="peso_total"
                value={formData.peso_total?.toString()}
                placeholder="Peso Total (kg)"
                type="number"
                className="w-full"
                required
              />
            </div>
            <div className="col-span-1 p-2">
              <span>Preço por kg (R$)</span>
              <InputText
                name="preco_por_kg"
                value={formData.preco_por_kg}
                onChange={handleChangeSomar}
                placeholder="Preço por kg (R$)"
                type="number"
                className="w-full"
                required
              />
            </div>
            <div className="col-span-1 p-2">
              <span>Valor Total (R$)</span>
              <InputText
                name="valor_total"
                value={formData.valor_total}
                placeholder="Valor Total (R$)"
                type="number"
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
              <InputText
                name="numero_request"
                value={formData.numero_request}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    numero_request: e.target.value,
                  })
                }
                placeholder="Numero request"
                className="w-full"
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

            {/* Histórico de Aprovação */}
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
              <InputText
                name="nfe"
                value={formData.nfe}
                onChange={(e) => setFormData({ ...formData, nfe: e.target.value })}
                placeholder="Nº Nfe"
                className="w-full"
                required
              />
            </div>

            {/* Confirmação de Status */}
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
