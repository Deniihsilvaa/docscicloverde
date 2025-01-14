import { InputText } from "primereact/inputtext";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { FormDataProsp, ExtractLogins, FormRegistoColabProps } from "./types";
import { Toast } from "primereact/toast";



const FormRegistroColab: React.FC<FormRegistoColabProps> = ({
  onSubmit,
  initialValues,
}) => {
  const toast = useRef<Toast>(null);
  const estadosCivis = ["Solteiro", "Casado", "Divorciado", "Viúvo"];
  const departamentos = ["RH", "Liderança", "Financeiro", "Operacional"];
  const cargos = ["Analista", "Gerente", "Assistente", "Separador de reciclaveis"];
  const status = [
    { label: "Ativo", value: true },
    { label: "Inativo", value: false },
  ];
  const stepperRef = useRef<any>(null);
  const [logins, SetLogins] = useState<{ label: string; value: any }[]>([]);

  const [formRGData, setFormData] = useState<FormDataProsp>({
    id: initialValues?.id,
    nome: initialValues?.nome || "",
    cpf: initialValues?.cpf || "",
    rg: initialValues?.rg || "",
    estado_civil: initialValues?.estado_civil || "",
    endereco: initialValues?.endereco || "",
    telefone: initialValues?.telefone || "",
    salario: initialValues?.salario || "",
    carteira_trabalho: initialValues?.carteira_trabalho || "",
    pis: initialValues?.pis || "",
    departamento: initialValues?.departamento || "",
    cargo: initialValues?.cargo || "",
    user_id: initialValues?.user_id || "",
    observacoes: initialValues?.observacoes || "",
    state: initialValues?.state || true,
    data_nascimento: initialValues?.data_nascimento || null,
    data_admissao: initialValues?.data_admissao || null
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const missingFields = Object.keys(formRGData).filter((key) => !formRGData[key]);
  const handleSubmit = async () => {

    if (missingFields.length > 0) {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Preencha todos os campos",
        life: 3000,
      });
      //mostrar quais campos nao foram preenchidos
      console.log(missingFields);

      return;
    }
    setFormData(formRGData);
    onSubmit(formRGData);
  };

  const optionsLogins = async () => {
    try {
      const loginsExtraidos = await ExtractLogins();
      const dadosLogin = loginsExtraidos.map((login) => ({
        label: login.email,
        value: login.user_id,
      }));
      SetLogins(dadosLogin);
    } catch (error) {
      console.error("Erro ao carregar logins:", error);
      SetLogins([]);
    }
  };

  useEffect(() => {
    optionsLogins();
  }, []);

  return (
    <div>
      <Toast ref={toast} />
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Stepper ref={stepperRef} linear={true} >
          <StepperPanel header="Dados Gerais">
            <div className="animate-fade-in-up">
              <fieldset className="col-span-4">
                <legend className="mb-2 text-lg font-semibold">
                  Dados Gerais
                </legend>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block mb-1 text-gray-700">
                      Nome Completo
                    </label>
                    <InputText
                      name="nome"
                      value={formRGData.nome}
                      className="w-full"
                      onChange={handleChange}
                      placeholder="Digite o nome completo"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">CPF</label>
                    <InputMask
                      name="cpf"
                      value={formRGData.cpf}
                      className="w-full"
                      mask="999.999.999-99"
                      placeholder="000.000.000-00"
                      onChange={(e: InputMaskChangeEvent) => {
                        setFormData({ ...formRGData, cpf: e.value });
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">RG</label>
                    <InputText
                      name="rg"
                      value={formRGData.rg}
                      className="w-full"
                      onChange={handleChange}
                      placeholder="Digite o RG"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">
                      Data de Nascimento
                    </label>
                    <Calendar
                      name="data_nascimento"
                      value={formRGData.data_nascimento}
                      className="w-full"
                      onChange={(e) => {
                        setFormData({ ...formRGData, data_nascimento: e.value as Date });
                      }}
                      dateFormat="dd/mm/yy"
                      placeholder="DD/MM/AAAA"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">
                      Estado Civil
                    </label>
                    <Dropdown
                      name="estado_civil"
                      value={formRGData.estado_civil}
                      className="w-full"
                      onChange={(e) => setFormData({ ...formRGData, estado_civil: e.value })}
                      options={estadosCivis}
                      placeholder="Selecione"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block mb-1 text-gray-700">Endereço</label>
                    <InputText
                      name="endereco"
                      value={formRGData.endereco}
                      className="w-full"
                      onChange={handleChange}
                      placeholder="Digite o endereço"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Telefone</label>
                    <InputMask
                      name="telefone"
                      value={formRGData.telefone}
                      className="w-full"
                      onChange={(e) => setFormData(({ ...formRGData, telefone: e.value }))}

                      mask="(99) 99999-9999"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>
              </fieldset>
              <Button
                label="Proximo"
                onClick={() => stepperRef.current.nextCallback()}
                severity="success"
              />
            </div>
          </StepperPanel>
          <StepperPanel header="Dados de Pagamento">
            <div className="animate-fade-in-up">
              <fieldset className="col-span-4">
                <legend className="mb-2 text-lg font-semibold">
                  Dados de Pagamento
                </legend>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-gray-700">Salário</label>
                    <InputText
                      name="salario"
                      value={formRGData.salario}
                      className="w-full"
                      onChange={handleChange}
                      placeholder="R$ 0,00"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">
                      Data de Admissão
                    </label>
                    <Calendar
                      name="data_admissao"
                      value={formRGData.data_admissao}
                      className="w-full"
                      onChange={(e) =>
                        setFormData(({ ...formRGData, data_admissao: e.value as Date }))
                      }
                      dateFormat="dd/mm/yy"
                      placeholder="DD/MM/AAAA"
                    />
                  </div>
                </div>
              </fieldset>
              <Button
                label="Voltar"
                onClick={() => stepperRef.current.prevCallback()}
                severity="secondary"
              />
              <Button
                label="Proximo"
                onClick={() => stepperRef.current.nextCallback()}
                severity="success"
              />
            </div>
          </StepperPanel>
          <StepperPanel header="Dados CLT">
            <div className="animate-fade-in-up">
              <fieldset className="col-span-4">
                <legend className="mb-2 text-lg font-semibold">Dados CLT</legend>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-gray-700">
                      Carteira de Trabalho
                    </label>
                    <InputText
                      name="carteira_trabalho"
                      value={formRGData.carteira_trabalho}
                      className="w-full"
                      onChange={handleChange}
                      placeholder="Digite o número"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">PIS</label>
                    <InputText
                      name="pis"
                      value={formRGData.pis}
                      className="w-full"
                      onChange={handleChange}
                      placeholder="Digite o número"
                    />
                  </div>
                </div>
              </fieldset>
              <Button
                label="Voltar"
                onClick={() => stepperRef.current.prevCallback()}
                severity="secondary"
              />
              <Button
                label="Proximo"
                onClick={() => stepperRef.current.nextCallback()}
                severity="success"
              />
            </div>
          </StepperPanel>
          <StepperPanel header="Informações">
            <div className="animate-fade-in-up">
              <fieldset className="col-span-4">
                <legend className="mb-2 text-lg font-semibold">
                  Mais Informações
                </legend>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-gray-700">
                      Departamento
                    </label>
                    <Dropdown
                      name="departamento"
                      value={formRGData.departamento}
                      className="w-full"
                      onChange={(e) => setFormData(({ ...formRGData, departamento: e.value }))}


                      options={departamentos}
                      placeholder="Selecione"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Cargo</label>
                    <Dropdown
                      name="cargo"
                      value={formRGData.cargo}
                      className="w-full"
                      onChange={(e) => setFormData(({ ...formRGData, cargo: e.value }))}
                      options={cargos}
                      placeholder="Selecione"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">
                      Email de acesso ao sistema
                    </label>
                    <Dropdown
                      name=" user_id"
                      value={formRGData.user_id}
                      onChange={(e) => {
                        setFormData({ ...formRGData, user_id: e.value });
                      }}
                      className="w-full"
                      options={logins}
                      placeholder="Selecione"
                      required
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block mb-1 text-gray-700">
                      Observações
                    </label>
                    <InputText
                      name="observacoes"
                      value={formRGData.observacoes}
                      className="w-full"
                      onChange={handleChange}
                      placeholder="Digite observações"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Status</label>
                    <Dropdown
                      name="status"
                      value={formRGData.state}
                      className="w-full"
                      onChange={(e) =>
                        setFormData({ ...formRGData, state: e.value })
                      }
                      options={status}
                      placeholder="Selecione"
                    />
                  </div>
                </div>
              </fieldset>
              <div className="col-span-4 mt-4 text-right">
                <Button
                  label="Salvar"
                  className="p-button-success"
                  onClick={handleSubmit}
                />
                <Button
                  label="Cancelar"
                  className="ml-2 p-button-secondary"
                  type="button"
                />
              </div>

              <Button
                label="Voltar"
                onClick={() => stepperRef.current.prevCallback()}
                severity="secondary"
              />
            </div>
          </StepperPanel>
        </Stepper>
      </div>
    </div>
  );
};

export default FormRegistroColab;
