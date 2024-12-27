import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import React, { useState, useRef, ChangeEvent ,useEffect} from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { FormDataProsp ,ExtractLogins} from "./types";

const FormRegistroColab: React.FC<FormDataProsp> = ({
  onSubmit,
  ...initialValues
}) => {
  const estadosCivis = ["Solteiro", "Casado", "Divorciado", "Viúvo"];
  const departamentos = ["RH", "TI", "Financeiro", "Operacional"];
  const cargos = ["Analista", "Gerente", "Assistente", "Técnico"];
  const status = [
    { label: "Ativo", value: true },
    { label: "Inativo", value: false },
  ];
  const stepperRef = useRef<any>(null);
  const [logins, SetLogins] = useState<{ label: string; value: any }[]>([]);
  const [formRGData, setFormData] = useState<FormDataProsp>({
    onSubmit: () => handleSubmit,
    state: {
      label: initialValues.state === true ? "Ativo" : "Inativo",
      value: initialValues.state,
    },
    loginUsuario: initialValues.loginUsuario || "",
    nome: initialValues.nome || "",
    cpf: initialValues.cpf || "",
    rg: initialValues.rg || "",
    dataNascimento: initialValues.dataNascimento || null,
    estadoCivil: initialValues.estadoCivil || "",
    endereco: initialValues.endereco || "",
    telefone: initialValues.telefone || "",
    salario: initialValues.salario || "",
    dataAdmissao: initialValues.dataAdmissao || null,
    carteiraTrabalho: initialValues.carteiraTrabalho || "",
    pis: initialValues.pis || "",
    departamento: initialValues.departamento || "",
    cargo: initialValues.cargo || "",
    observacoes: initialValues.observacoes || "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = () => {
    console.log("Dados de envio", formRGData);
    setFormData(formRGData);

    // if (onSubmit) onSubmit(formRGData);  // Envia os dados preenchidos para o componente pai
  };
  const optionsLogins = async () => {
    try {
      const loginsExtraidos = await ExtractLogins(); // Espera a Promise resolver
      // Agora loginsExtraidos é um array e você pode chamar map
      const dadosLogin = loginsExtraidos.map((login) => ({
        label: `${login.email}`,
        value: login.user_id,
      }));
      SetLogins(dadosLogin);
    } catch (error) {
      console.error("Erro ao carregar logins:", error);
      SetLogins([]); // Ou tratar de outra forma caso haja erro
    }
  };
  
  
  useEffect(() => {
    optionsLogins(); // Chama a função para preencher as opções
  }, []);
  

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 ">
        <Stepper ref={stepperRef} linear={true}>
          <StepperPanel header="Dados Gerais">
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
                    onChange={handleChange}
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
                    name="dataNascimento"
                    value={formRGData.dataNascimento}
                    className="w-full" 
                    onChange={handleChange}
                    dateFormat="dd/mm/yy"
                    placeholder="DD/MM/AAAA"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700">
                    Estado Civil
                  </label>
                  <Dropdown
                    name="estadoCivil"
                    value={formRGData.estadoCivil}
                    className="w-full" 
                    onChange={handleChange}
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
                    onChange={handleChange}
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
          </StepperPanel>
          <StepperPanel header="Dados de Pagamento">
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
                    name="dataAdmissao"
                    value={formRGData.dataAdmissao}
                    className="w-full" 
                    onChange={handleChange}
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
          </StepperPanel>
          <StepperPanel header="Dados CLT">
            <fieldset className="col-span-4">
              <legend className="mb-2 text-lg font-semibold">Dados CLT</legend>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block mb-1 text-gray-700">
                    Carteira de Trabalho
                  </label>
                  <InputText
                    name="carteiraTrabalho"
                    value={formRGData.carteiraTrabalho}
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
          </StepperPanel>
          <StepperPanel header="Informações">
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
                     onChange={handleChange}
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
                     onChange={handleChange}
                    options={cargos}
                    placeholder="Selecione"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700">
                    Email de acesso ao sistema
                  </label>
                  <Dropdown
                    name="loginUsuario"
                    value={formRGData.loginUsuario}
                    className="w-full"
                    onChange = {handleChange}
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
                  <label className="block mb-1 text-gray-700">
                    Status
                  </label>
                  <Dropdown
                    name="status"
                    value={formRGData.state}
                    className="w-full"
                     onChange={(e)=> setFormData({...formRGData, state: e.value})}
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
          </StepperPanel>
        </Stepper>
      </div>
    </div>
  );
};

export default FormRegistroColab;
