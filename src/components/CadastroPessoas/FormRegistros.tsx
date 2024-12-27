// src/components/CadastroPessoas/FormRegistros.tsx
import React from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import FormSection from "./FormSection";

interface FormRegistrosProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  onSubmit: (e: React.FormEvent) => void;
}

const FormRegistros: React.FC<FormRegistrosProps> = ({ formData, setFormData, onSubmit }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name: string, value: Date | null) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };
    
    return (
        <form >
        <FormSection title="Dados Pessoais">
          <div className="field">
            <label htmlFor="nome">Nome</label>
            <InputText
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Digite seu nome"
            />
          </div>
  
          <div className="field">
            <label htmlFor="endereco">Endereço</label>
            <InputText
              id="endereco"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              placeholder="Digite seu endereço"
            />
          </div>
  
          <div className="field">
            <label htmlFor="complemento">Complemento</label>
            <InputText
              id="complemento"
              name="complemento"
              value={formData.complemento}
              onChange={handleChange}
              placeholder="Digite seu complemento"
            />
          </div>
  
          <div className="field">
            <label htmlFor="cidade">Cidade</label>
            <InputText
              id="cidade"
              name="cidade"
              value={formData.cidade}
              onChange={handleChange}
              placeholder="Digite sua cidade"
            />
          </div>
  
          <div className="field">
            <label htmlFor="nacionalidade">Nacionalidade</label>
            <InputText
              id="nacionalidade"
              name="nacionalidade"
              value={formData.nacionalidade}
              onChange={handleChange}
              placeholder="Digite sua nacionalidade"
            />
          </div>
  
          <div className="field">
            <label htmlFor="nomeMae">Nome da Mãe</label>
            <InputText
              id="nomeMae"
              name="nomeMae"
              value={formData.nomeMae}
              onChange={handleChange}
              placeholder="Digite o nome da sua mãe"
            />
          </div>
  
          <div className="field">
            <label htmlFor="nomePai">Nome do Pai</label>
            <InputText
              id="nomePai"
              name="nomePai"
              value={formData.nomePai}
              onChange={handleChange}
              placeholder="Digite o nome do seu pai"
            />
          </div>
  
          <div className="field">
            <label htmlFor="telefone">Telefone</label>
            <InputText
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="Digite seu telefone"
            />
          </div>
  
          <div className="field">
            <label htmlFor="celular">Celular</label>
            <InputText
              id="celular"
              name="celular"
              value={formData.celular}
              onChange={handleChange}
              placeholder="Digite seu celular"
            />
          </div>
  
          <div className="field">
            <label htmlFor="escolaridade">Escolaridade</label>
            <InputText
              id="escolaridade"
              name="escolaridade"
              value={formData.escolaridade}
              onChange={handleChange}
              placeholder="Digite sua escolaridade"
            />
          </div>
  
          <div className="field">
            <label htmlFor="formacao">Formação</label>
            <InputText
              id="formacao"
              name="formacao"
              value={formData.formacao}
              onChange={handleChange}
              placeholder="Digite sua formação"
            />
          </div>
  
          <div className="field">
            <label htmlFor="estadoCivil">Estado Civil</label>
            <InputText
              id="estadoCivil"
              name="estadoCivil"
              value={formData.estadoCivil}
              onChange={handleChange}
              placeholder="Digite seu estado civil"
            />
          </div>
  
          <div className="field">
            <label htmlFor="dataNascimento">Data de Nascimento</label>
            <Calendar
              id="dataNascimento"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={(e) => handleDateChange("dataNascimento", e.value)}
              showIcon
              dateFormat="dd/mm/yy"
            />
          </div>
  
          <div className="field">
            <label htmlFor="rg">RG</label>
            <InputText
              id="rg"
              name="rg"
              value={formData.rg}
              onChange={handleChange}
              placeholder="Digite seu RG"
            />
          </div>
  
          <div className="field">
            <label htmlFor="cpf">CPF</label>
            <InputText
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder="Digite seu CPF"
            />
          </div>
  
          <div className="field">
            <label htmlFor="dataNascimentoConjuge">Data de Nascimento do Cônjuge</label>
            <Calendar
              id="dataNascimentoConjuge"
              name="dataNascimentoConjuge"
              value={formData.dataNascimentoConjuge}
              onChange={(e) => handleDateChange("dataNascimentoConjuge", e.value)}
              showIcon
              dateFormat="dd/mm/yy"
            />
          </div>
  
          <div className="field">
            <label htmlFor="nomeConjuge">Nome do Cônjuge</label>
            <InputText
              id="nomeConjuge"
              name="nomeConjuge"
              value={formData.nomeConjuge}
              onChange={handleChange}
              placeholder="Digite o nome do cônjuge"
            />
          </div>
  
          {/* Dependentes */}
          <div className="field">
            <label>Dependentes</label>
            {/* Aqui você pode mapear e renderizar os campos de dependentes */}
          </div>
  
          <div className="field">
            <label htmlFor="ctps">CTPS</label>
            <InputText
              id="ctps"
              name="ctps"
              value={formData.ctps}
              onChange={handleChange}
              placeholder="Digite sua CTPS"
            />
          </div>
  
          <div className="field">
            <label htmlFor="serieDv">Série e DV</label>
            <InputText
              id="serieDv"
              name="serieDv"
              value={formData.serieDv}
              onChange={handleChange}
              placeholder="Digite a série e DV"
            />
          </div>
  
          <div className="field">
            <label htmlFor="orgaoExpedidor">Órgão Expedidor</label>
            <InputText
              id="orgaoExpedidor"
              name="orgaoExpedidor"
              value={formData.orgaoExpedidor}
              onChange={handleChange}
              placeholder="Digite o órgão expedidor"
            />
          </div>
  
          <div className="field">
            <label htmlFor="dataEmissao">Data de Emissão</label>
            <Calendar
              id="dataEmissao"
              name="dataEmissao"
              value={formData.dataEmissao}
              onChange={(e) => handleDateChange("dataEmissao", e.value)}
              showIcon
              dateFormat="dd/mm/yy"
            />
          </div>
  
          <div className="field">
            <label htmlFor="pis">PIS</label>
            <InputText
              id="pis"
              name="pis"
              value={formData.pis}
              onChange={handleChange}
              placeholder="Digite seu PIS"
            />
          </div>
  
          <div className="field">
            <label htmlFor="tituloEleitor">Título de Eleitor</label>
            <InputText
              id="tituloEleitor"
              name="tituloEleitor"
              value={formData.tituloEleitor}
              onChange={handleChange}
              placeholder="Digite o título de eleitor"
            />
          </div>
  
          <div className="field">
            <label htmlFor="reservista">Reservista</label>
            <Checkbox
              id="reservista"
              name="reservista"
              checked={formData.reservista}
              onChange={handleCheckboxChange}
            />
          </div>
  
          <div className="field">
            <label htmlFor="naturalidade">Naturalidade</label>
            <InputText
              id="naturalidade"
              name="naturalidade"
              value={formData.naturalidade}
              onChange={handleChange}
              placeholder="Digite sua naturalidade"
            />
          </div>
  
          <div className="field">
            <label htmlFor="zona">Zona</label>
            <InputText
              id="zona"
              name="zona"
              value={formData.zona}
              onChange={handleChange}
              placeholder="Digite sua zona eleitoral"
            />
          </div>
  
          <div className="field">
            <label htmlFor="secao">Seção</label>
            <InputText
              id="secao"
              name="secao"
              value={formData.secao}
              onChange={handleChange}
              placeholder="Digite sua seção eleitoral"
            />
          </div>
  
          <div className="field">
            <label htmlFor="municipioUf">Município/UF</label>
            <InputText
              id="municipioUf"
              name="municipioUf"
              value={formData.municipioUf}
              onChange={handleChange}
              placeholder="Digite o município/UF"
            />
          </div>
  
          <div className="field">
            <label htmlFor="emissao">Emissão</label>
            <InputText
              id="emissao"
              name="emissao"
              value={formData.emissao}
              onChange={handleChange}
              placeholder="Digite o local de emissão"
            />
          </div>
          
  
          <Button type="submit" label="Enviar" />
        </FormSection>
      </form>
    )
}

export default FormRegistros;