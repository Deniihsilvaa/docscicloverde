import React, { useState } from "react";
import { Card } from 'primereact/card';
import FormRegistros from "./FormRegistros";

const CadastroPessoas: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
    complemento: "",
    cidade: "",
    nacionalidade: "",
    nomeMae: "",
    nomePai: "",
    telefone: "",
    celular: "",
    escolaridade: "",
    formacao: "",
    estadoCivil: "",
    dataNascimento: null,
    idade: "",
    rg: "",
    cpf: "",
    dataNascimentoConjuge: null,
    nomeConjuge: "",
    dependentes: [],
    ctps: "",
    serieDv: "",
    orgaoExpedidor: "",
    dataEmissao: null,
    dataExpedicao: null,
    pis: "",
    tituloEleitor: "",
    reservista: false,
    naturalidade: "",
    zona: "",
    secao: "",
    municipioUf: "",
    emissao: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Card title="Cadastro de Pessoas">
      <FormRegistros 
        formData={formData} 
        setFormData={setFormData} 
        onSubmit={handleSubmit} 
      />
    </Card>
  );
};

export default CadastroPessoas;