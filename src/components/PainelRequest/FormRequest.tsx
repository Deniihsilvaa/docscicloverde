import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";

interface FormRequestProps {
  onSubmit: (data: any) => void;
}

const initialFormData = {
  email: "",
  razaoSocial: "",
  os: "",
  numeroRelatorio: "",
  dataFinalizacao: null,
  valorFaturado: null,
  solicitante: "",
  comprador: "",
  cnpj: "",
  manutencaoPreventiva: false,
  urlsRequest: "",
  statusRequest:"",
};

export const FormRequest: React.FC<FormRequestProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState(initialFormData);
  const toast = useRef<Toast>(null);
  const stepperRef = useRef<any>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: any) => {
    setFormData((prev) => ({ ...prev, manutencaoPreventiva: e.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (
      Object.values(formData).some((field) => field === "" || field === null)
    ) {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Preencha todos os campos",
        life: 3000,
      });
      return;
    }

    onSubmit(formData);
    setFormData(initialFormData);
    toast.current?.show({
      severity: "success",
      summary: "Sucesso",
      detail: "Formulário enviado!",
      life: 3000,
    });
  };

  return (
    <div className="w-full p-2">
      <Toast ref={toast} />
      <form onSubmit={handleSubmit} >
        <Stepper ref={stepperRef} linear={true}>
          <StepperPanel header="Dados Emitente">
            <div className="col-span-1 p-2">
              <label htmlFor="email">Email</label>
              <InputText
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            <div className="col-span-1 p-2">
              <label htmlFor="razaoSocial">Razão Social</label>
              <InputText
                id="razaoSocial"
                name="razaoSocial"
                value={formData.razaoSocial}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            <div className="col-span-1 p-2">
              <label htmlFor="cnpj">CNPJ</label>
              <InputText
                id="cnpj"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            <Button
              label="Avançar"
              onClick={() => stepperRef.current?.nextCallback()}
            />
          </StepperPanel>
          <StepperPanel header="Dados do Request">
            <div className="col-span-1 p-2">
              <label htmlFor="os">OS Comprador</label>
              <InputText
                id="os"
                name="os"
                value={formData.os}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div className="col-span-1 p-2">
              <label htmlFor="numeroRelatorio">Número Relatório</label>
              <InputText
                id="numeroRelatorio"
                name="numeroRelatorio"
                value={formData.numeroRelatorio}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div className="col-span-1 p-2">
              <label htmlFor="dataFinalizacao">Data Finalização</label>
              <Calendar
                id="dataFinalizacao"
                value={formData.dataFinalizacao}
                onChange={(e) =>
                  setFormData({ ...formData, dataFinalizacao: e.value })
                }
                required
                className="w-full"
              />
            </div>
            <div className="col-span-1 p-2">
              <label htmlFor="valorFaturado">Valor Faturado</label>
              <InputNumber
                id="valorFaturado"
                name="valorFaturado"
                value={formData.valorFaturado}
                onValueChange={(e) =>
                  setFormData({ ...formData, valorFaturado: e.value })
                }
                mode="currency"
                currency="BRL"
                locale="pt-BR"
                required
                className="w-full"
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
          <StepperPanel header="Conclusão">
            <div className="col-span-1 p-2">
              <label htmlFor="solicitante">Solicitante</label>
              <InputText
                id="solicitante"
                name="solicitante"
                value={formData.solicitante}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div className="col-span-1 p-2">
              <label htmlFor="comprador">Comprador</label>
              <InputText
                id="comprador"
                name="comprador"
                value={formData.comprador}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            <div className="col-span-1 p-2">
              <label htmlFor="comprador">Url do request</label>
              <InputText
                id="urlsRequest"
                name="urlsRequest"
                value={formData.urlsRequest}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            <div className="col-span-1 p-2">
              <label htmlFor="comprador">Status do request</label>
              <InputText
                id="statusRequest"
                name="statusRequest"
                value={formData.statusRequest}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div className="flex items-center col-span-3 gap-2">
              <Checkbox
                id="manutencaoPreventiva"
                checked={formData.manutencaoPreventiva}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="manutencaoPreventiva">
                Manutenção Preventiva?
              </label>
            </div>

            <div className="mt-4">
              <Button
                type="submit"
                label="Enviar"
                icon="pi pi-check"
                className=" p-button-success"
              />
            </div>
            <div className="mt-4">
              <Button
                label="Voltar"
                onClick={() => stepperRef.current?.prevCallback()}
                severity="warning"
              />
            </div>
          </StepperPanel>
        </Stepper>
      </form>
    </div>
  );
};
