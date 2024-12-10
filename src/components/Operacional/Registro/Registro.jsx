import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { useState } from "react";

export default function Registro() {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    rg: "",
    dataNascimento: null,
    estadoCivil: "",
    endereco: "",
    telefone: "",
    salario: "",
    dataAdmissao: null,
    carteiraTrabalho: "",
    pis: "",
    departamento: "",
    cargo: "",
    observacoes: "",
  });

  const estadosCivis = ["Solteiro", "Casado", "Divorciado", "Viúvo"];

  const departamentos = ["RH", "TI", "Financeiro", "Operacional"];

  const cargos = ["Analista", "Gerente", "Assistente", "Técnico"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
  };

  return (
    <div className="p-6 rounded-lg shadow-md bg-gray-50">
      <h1 className="mb-4 text-xl font-bold text-gray-800">Registro de Colaborador</h1>
      <form className="grid grid-cols-4 gap-4" onSubmit={handleSubmit}>
        {/* Dados Gerais */}
        <fieldset className="col-span-4">
          <legend className="mb-2 text-lg font-semibold">Dados Gerais</legend>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-2">
              <label className="block mb-1 text-gray-700">Nome Completo</label>
              <InputText
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="w-full"
                placeholder="Digite o nome completo"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">CPF</label>
              <InputMask
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                className="w-full"
                mask="999.999.999-99"
                placeholder="000.000.000-00"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">RG</label>
              <InputText
                name="rg"
                value={formData.rg}
                onChange={handleChange}
                className="w-full"
                placeholder="Digite o RG"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Data de Nascimento</label>
              <Calendar
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    dataNascimento: e.value,
                  }))
                }
                className="w-full"
                dateFormat="dd/mm/yy"
                placeholder="DD/MM/AAAA"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Estado Civil</label>
              <Dropdown
                name="estadoCivil"
                value={formData.estadoCivil}
                onChange={handleChange}
                className="w-full"
                options={estadosCivis}
                placeholder="Selecione"
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-1 text-gray-700">Endereço</label>
              <InputText
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                className="w-full"
                placeholder="Digite o endereço"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Telefone</label>
              <InputMask
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                className="w-full"
                mask="(99) 99999-9999"
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>
        </fieldset>

        {/* Dados de Pagamento */}
        <fieldset className="col-span-4">
          <legend className="mb-2 text-lg font-semibold">Dados de Pagamento</legend>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block mb-1 text-gray-700">Salário</label>
              <InputText
                name="salario"
                value={formData.salario}
                onChange={handleChange}
                className="w-full"
                placeholder="R$ 0,00"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Data de Admissão</label>
              <Calendar
                name="dataAdmissao"
                value={formData.dataAdmissao}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    dataAdmissao: e.value,
                  }))
                }
                className="w-full"
                dateFormat="dd/mm/yy"
                placeholder="DD/MM/AAAA"
              />
            </div>
          </div>
        </fieldset>

        {/* Dados CLT */}
        <fieldset className="col-span-4">
          <legend className="mb-2 text-lg font-semibold">Dados CLT</legend>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block mb-1 text-gray-700">Carteira de Trabalho</label>
              <InputText
                name="carteiraTrabalho"
                value={formData.carteiraTrabalho}
                onChange={handleChange}
                className="w-full"
                placeholder="Digite o número"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">PIS</label>
              <InputText
                name="pis"
                value={formData.pis}
                onChange={handleChange}
                className="w-full"
                placeholder="Digite o número"
              />
            </div>
          </div>
        </fieldset>

        {/* Mais Informações */}
        <fieldset className="col-span-4">
          <legend className="mb-2 text-lg font-semibold">Mais Informações</legend>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block mb-1 text-gray-700">Departamento</label>
              <Dropdown
                name="departamento"
                value={formData.departamento}
                onChange={handleChange}
                className="w-full"
                options={departamentos}
                placeholder="Selecione"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Cargo</label>
              <Dropdown
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
                className="w-full"
                options={cargos}
                placeholder="Selecione"
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-1 text-gray-700">Observações</label>
              <InputText
                name="observacoes"
                value={formData.observacoes}
                onChange={handleChange}
                className="w-full"
                placeholder="Digite observações"
              />
            </div>
          </div>
        </fieldset>

        <div className="col-span-4 mt-4 text-right">
          <Button label="Salvar" className="p-button-success" type="submit" />
          <Button label="Cancelar" className="ml-2 p-button-secondary" type="button" />
        </div>
      </form>
    </div>
  );
}
