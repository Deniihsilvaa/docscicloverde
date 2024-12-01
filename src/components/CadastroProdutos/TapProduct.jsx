import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { TabPanel } from "primereact/tabview";
import { useState } from "react";

function TapProduct() {
  // Estado do formulário
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [tipo, setTipo] = useState(null);
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Opções do dropdown para tipo (Cliente ou Fornecedor)
  const tipos = [
    { label: "Cliente", value: "cliente" },
    { label: "Fornecedor", value: "fornecedor" },
  ];

  // Função para submeter o formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // Aqui você pode tratar a submissão do formulário, por exemplo, enviar para um servidor ou atualizar o estado
    console.log({
      product,
      description,
      costPrice,
      tipo,
      telefone,
      endereco,
    });

    // Exibe uma notificação de sucesso
    setShowToast(true);
  };

  return (
    <>
      <TabPanel header="Gerais">
        <div className="shadow-sm Card border-spacing-3">
          <Toast
            visible={showToast}
            severity="success"
            summary="Cadastro Realizado"
            detail="Cadastro realizado com sucesso!"
            onHide={() => setShowToast(false)}
          />

          <h1 className="mb-4 text-2xl font-bold">Cadastro de Produtos</h1>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-3 grid-rows-3 gap-4"
          >
            {/* Nome */}
            <div className="field">
              <label htmlFor="product" className="block">
                Produto
              </label>
              <InputText
                id="product"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                required
                placeholder="Produtos"
                className="w-full"
              />
            </div>

            {/* CPF */}
            <div className="field">
              <label htmlFor="description" className="block">
                Descrição
              </label>
              <InputMask
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full"
                placeholder="Informações adicionais"
                required
              />
            </div>

            {/* Email */}
            <div className="field">
              <label htmlFor="costPrice" className="block">
                Preço de custo
              </label>
              <InputText
                id="costPrice"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
                type="text"
                mask="R$"
                className="w-full"
                required
              />
            </div>

            {/* Tipo (Cliente ou Fornecedor) */}
            <div className="field">
              <label htmlFor="tipo" className="block">
                Tipo
              </label>
              <Dropdown
                id="tipo"
                value={tipo}
                options={tipos}
                onChange={(e) => setTipo(e.value)}
                optionLabel="label"
                className="w-full"
                required
              />
            </div>

            {/* Telefone */}
            <div className="field">
              <label htmlFor="telefone" className="block">
                Telefone
              </label>
              <InputMask
                id="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                mask="(99) 99999-9999"
                className="w-full"
                required
              />
            </div>

            {/* Endereço */}
            <div className="field">
              <label htmlFor="endereco" className="block">
                Endereço
              </label>
              <InputText
                id="endereco"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                className="w-full"
                required
              />
            </div>

            {/* Botão de Submissão */}
            <div className="field">
              <Button
                label="Cadastrar"
                icon="pi pi-check"
                type="submit"
                className="w-full p-button-success"
              />
            </div>
          </form>
        </div>
      </TabPanel>
      <TabPanel header="Gerais"></TabPanel>
    </>
  );
}
export default TapProduct