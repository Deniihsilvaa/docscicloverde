import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";

// Componente separado para os dados gerais
const DadosGerais = ({ product, setProduct, description, setDescription }) => (
  <div className="grid grid-cols-2 gap-4">
    <div className="field">
      <label htmlFor="product" className="block">
        Nome do Produto
      </label>
      <InputText
        id="product"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        placeholder="Ex.: Cadeira de Madeira"
        className="w-full"
        required
      />
    </div>

    <div className="field">
      <label htmlFor="description" className="block">
        Descrição
      </label>
      <InputText
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Detalhes do produto"
        className="w-full"
      />
    </div>
  </div>
);

// Componente separado para informações adicionais
const InformacoesAdicionais = ({ parentProduct, setParentProduct, productionType, setProductionType }) => {
  const parentOptions = [
    { label: "Produto Pai", value: "pai" },
    { label: "Produto Filho", value: "filho" },
  ];

  const productionOptions = [
    { label: "Produzido", value: "produzido" },
    { label: "Comprado", value: "comprado" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="field">
        <label htmlFor="parentProduct" className="block">
          Tipo de Produto
        </label>
        <Dropdown
          id="parentProduct"
          value={parentProduct}
          options={parentOptions}
          onChange={(e) => setParentProduct(e.value)}
          placeholder="Selecione"
          className="w-full"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="productionType" className="block">
          Origem
        </label>
        <Dropdown
          id="productionType"
          value={productionType}
          options={productionOptions}
          onChange={(e) => setProductionType(e.value)}
          placeholder="Selecione"
          className="w-full"
          required
        />
      </div>
    </div>
  );
};

// Componente separado para dados financeiros
const DadosFinanceiros = ({ costPrice, setCostPrice, salePrice, setSalePrice, stock, setStock }) => (
  <div className="grid grid-cols-2 gap-4">
    <div className="field">
      <label htmlFor="costPrice" className="block">
        Preço de Custo (R$)
      </label>
      <InputNumber
        id="costPrice"
        value={costPrice}
        onValueChange={(e) => setCostPrice(e.value)}
        mode="currency"
        currency="BRL"
        className="w-full"
        required
      />
    </div>

    <div className="field">
      <label htmlFor="salePrice" className="block">
        Preço de Venda (R$)
      </label>
      <InputNumber
        id="salePrice"
        value={salePrice}
        onValueChange={(e) => setSalePrice(e.value)}
        mode="currency"
        currency="BRL"
        className="w-full"
        required
      />
    </div>

    <div className="field">
      <label htmlFor="stock" className="block">
        Quantidade em Estoque
      </label>
      <InputNumber
        id="stock"
        value={stock}
        onValueChange={(e) => setStock(e.value)}
        className="w-full"
      />
    </div>
  </div>
);

// Componente principal
const CadastroProdutos = () => {
  // Estados do formulário
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [parentProduct, setParentProduct] = useState(null);
  const [productionType, setProductionType] = useState(null);
  const [costPrice, setCostPrice] = useState(null);
  const [salePrice, setSalePrice] = useState(null);
  const [stock, setStock] = useState(null);

  // Submissão do formulário
  const handleSubmit = () => {
    console.log({
      product,
      description,
      parentProduct,
      productionType,
      costPrice,
      salePrice,
      stock,
    });
    alert("Produto cadastrado com sucesso!");
  };

  return (
    <TabView>
      <TabPanel header="Dados Gerais">
        <DadosGerais product={product} setProduct={setProduct} description={description} setDescription={setDescription} />
      </TabPanel>

      <TabPanel header="Informações Adicionais">
        <InformacoesAdicionais
          parentProduct={parentProduct}
          setParentProduct={setParentProduct}
          productionType={productionType}
          setProductionType={setProductionType}
        />
      </TabPanel>

      <TabPanel header="Dados Financeiros">
        <DadosFinanceiros
          costPrice={costPrice}
          setCostPrice={setCostPrice}
          salePrice={salePrice}
          setSalePrice={setSalePrice}
          stock={stock}
          setStock={setStock}
        />
      </TabPanel>

      <TabPanel header="Ações">
        <Button label="Cadastrar Produto" icon="pi pi-check" onClick={handleSubmit} className="w-full p-button-success" />
      </TabPanel>
    </TabView>
  );
};

export default CadastroProdutos;
