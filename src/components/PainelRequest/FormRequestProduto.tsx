import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { FormData } from "./types";

import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";

interface FormRequestProdutoProps {
  onSubmit: (data: FormData) => void;
}

const items = [
  { label: "SUCATA DE PAPEL KRAFT", value: "219869" },
  { label: "SUCATA DE FELTRO", value: "219867" },
  { label: "SUCATA DE PAPELÃO", value: "2000383" },
];

export const FormRequestProduto: React.FC<FormRequestProdutoProps> = ({
  onSubmit,
}) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    dataColeta: "",
    pesagemInicial: 0,
    pesagemFinal: 0,
    itemColetado: "",
    pesoTotal: 0,
    precoPorKg: 0,
    valorTotal: 0,
    responsavel: "",
    telefone: "",
    numeroRequest: 0,
    urlNuvem: "http://",
  });
  const stepperRef = useRef<any>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

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
              <InputText
                name="dataColeta"
                value={formData.dataColeta}
                onChange={handleChange}
                placeholder="Data da Coleta"
                className="w-full"
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
                name="pesagemInicial"
                value={formData.pesagemInicial}
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
                name="pesagemFinal"
                value={formData.pesagemFinal}
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
                name="itemColetado"
                value={formData.itemColetado}
                options={items}
                onChange={handleChange}
                placeholder="Selecione o item"
                className="w-full"
                required
              />
            </div>
            <div className="col-span-1 p-2">
              <span>Peso Total (kg)</span>
              <InputText
                name="pesoTotal"
                value={formData.pesoTotal}
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
                name="precoPorKg"
                value={formData.precoPorKg}
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
                name="valorTotal"
                value={formData.valorTotal}
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
                name="numeroRequest"
                value={formData.numeroRequest}
                onChange={handleChange}
                placeholder="Numero request"
                className="w-full"
              />
            </div>
            <div className="col-span-1 p-2">
              <span>Link</span>
              <InputText
                name="urlNuvem"
                value={formData.urlNuvem}
                onChange={handleChange}
                placeholder="https//"
                className="w-full"
              />
            </div>
            <div className="flex justify-end p-2">
              <Button
                label="Registrar"
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
