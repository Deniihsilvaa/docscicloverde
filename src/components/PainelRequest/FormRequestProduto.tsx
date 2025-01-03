import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from 'primereact/calendar';

import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { FormData } from "./types";

import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import Toast from "../Toast/ToastModel";

type FormRequestProps = {
  onSubmit: (data: FormData) => void;
  initialValues?: Partial<FormData>;
};

const items = [
  { label: "SUCATA DE PAPEL KRAFT", value: "219869" },
  { label: "SUCATA DE FELTRO", value: "219867" },
  { label: "SUCATA DE PAPELÃO", value: "2000383" },
  { label: "SUCATA DE MADEIRA", value: "2198690" },
  { label: "SUCATA DE FERRO", value: "2198677" },
];

export const FormRequestProduto: React.FC<FormRequestProps> = ({
  onSubmit,
  initialValues,
}) => {

  const [isEdit] = useState<boolean>(!!initialValues?.id);
  const [formData, setFormData] = useState<FormData>({
    id: initialValues?.id,
    email: initialValues?.email || "",
    data_coleta: initialValues?.data_coleta || new Date(),
    pesagem_inicial: initialValues?.pesagem_inicial || 0,
    pesagem_final: initialValues?.pesagem_final || 0,
    item_coletado: initialValues?.item_coletado || "",
    peso_total: initialValues?.peso_total || 0,
    preco_por_kg: initialValues?.preco_por_kg || 0,
    valor_total: initialValues?.valor_total || 0,
    responsavel: initialValues?.responsavel || "",
    telefone: initialValues?.telefone || "",
    numero_request: initialValues?.numero_request || 0,
    url_nuvem: initialValues?.url_nuvem || "http://",
    historico_aprovacao: initialValues?.historico_aprovacao || "",
    status_confirmacao: initialValues?.status_confirmacao || "",
    nfe: initialValues?.nfe || 0
  });
  const stepperRef = useRef<any>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newFormData = { ...prev, [name]: value };

      // Recalcular valor total se campos relevantes forem alterados
      if (
        name === "pesagem_inicial" ||
        name === "pesagem_final" ||
        name === "preco_por_kg"
      ) {
        const peso_total =
          (Number(newFormData.pesagem_final) || 0) -
          (Number(newFormData.pesagem_inicial) || 0);
        const valor_total =
          peso_total * (Number(newFormData.preco_por_kg) || 0);

        newFormData.peso_total = peso_total;
        newFormData.valor_total = valor_total;
      }

      return newFormData;
    });
  };

  const toast = useRef<any>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) {
      toast.current?.show({
        severity: "warn",
        summary: "Campos obrigatórios",
        detail: "Preencha todos os campos.",
      });
      return;
    }
    if (isEdit) {
      toast.current?.show({
        severity: "info",
        summary: "Edição",
        detail: "Registro atualizado com sucesso.",
      });
    } else {
      toast.current?.show({
        severity: "success",
        summary: "Novo Registro",
        detail: "Registro salvo com sucesso.",
      });
    }
    onSubmit(formData);
    //form.reset();
  };
  const ajustarParaHorarioLocal = (data: Date) => {
    const offset = data.getTimezoneOffset() * 60000;  // Offset em milissegundos
    return new Date(data.getTime() - offset);
  };
  const converterParaDate = (dataString: string) => {
    const [mes, dia, ano] = dataString.split('-');  // Quebra a string MM-DD-AAAA
    return new Date(`${ano}-${mes}-${dia}`);  // Cria um objeto Date
  };
  
  // Ao carregar os dados:
  const dataFormatada = (data: string)=>{
    return converterParaDate(data);
  }
    
  return (
    <div className="mt-2">
      <Toast />
      <form onSubmit={handleSubmit}>
        <Stepper ref={stepperRef} linear={true}>
          <StepperPanel header="Informações da Solicitação">
            <div className="col-span-1 p-2">
              <span>E-mail</span>
              <InputText
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                placeholder="Pesagem Final (kg)"
                type="number"
                className="w-full"
                required
              />
            </div>
            <div className="col-span-1 p-2">
              <span>Item Coletado</span>
              <Dropdown
                name="item_coletado"
                value={formData.item_coletado}
                options={items}
                onChange={(e) =>{setFormData({...formData, item_coletado: e.value})}}
                placeholder="Selecione o item"
                className="w-full"
                required
              />
            </div>
            <div className="col-span-1 p-2">
              <span>Peso Total (kg)</span>
              <InputText
                name="peso_total"
                value={formData.peso_total?.toString()}
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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

          <StepperPanel header="Informações de Contato">
            <div className="col-span-1 p-2">
              <span>Responsável</span>
              <InputText
                name="responsavel"
                value={formData.responsavel}
                onChange={handleChange}
                placeholder="Responsável"
                className="w-full"
                required
              />
            </div>

            <div className="col-span-1 p-2">
              <span>Telefone</span>
              <InputText
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="Telefone"
                className="w-full"
                required
              />
            </div>

            <div className="col-span-1 p-2">
              <span>Numero do Request</span>
              <InputText
                name="numero_request"
                value={formData.numero_request}
                onChange={handleChange}
                placeholder="Numero request"
                className="w-full"
              />
            </div>

            <div className="col-span-1 p-2">
              <span>Link</span>
              <InputText
                name="url_nuvem"
                value={formData.url_nuvem}
                onChange={handleChange}
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
                onChange={handleChange}
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
