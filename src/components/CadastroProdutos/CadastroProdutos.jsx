import { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { DataTable } from "primereact/datatable";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import PropTypes from "prop-types";
import { supabase } from "../../services/supabase";

// Componentes organizados por responsabilidade

// Componente Dados Gerais
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

DadosGerais.propTypes = {
  product: PropTypes.string.isRequired,
  setProduct: PropTypes.func.isRequired,
  description: PropTypes.string,
  setDescription: PropTypes.func.isRequired,
};

// Componente Informações Adicionais
const InformacoesAdicionais = ({
  parentProduct,
  setParentProduct,
  productionType,
  setProductionType,
}) => {
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

InformacoesAdicionais.propTypes = {
  parentProduct: PropTypes.string,
  setParentProduct: PropTypes.func.isRequired,
  productionType: PropTypes.string,
  setProductionType: PropTypes.func.isRequired,
};

// Componente Dados Financeiros
const DadosFinanceiros = ({
  costPrice,
  setCostPrice,
  salePrice,
  setSalePrice,
  stock,
  setStock,
}) => (
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

DadosFinanceiros.propTypes = {
  costPrice: PropTypes.number,
  setCostPrice: PropTypes.func.isRequired,
  salePrice: PropTypes.number,
  setSalePrice: PropTypes.func.isRequired,
  stock: PropTypes.number,
  setStock: PropTypes.func.isRequired,
};

// Componente Principal
const CadastroProdutos = () => {
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [parentProduct, setParentProduct] = useState(null);
  const [productionType, setProductionType] = useState(null);
  const [costPrice, setCostPrice] = useState(null);
  const [salePrice, setSalePrice] = useState(null);
  const [stock, setStock] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase.from("viewBaseProducts").select("*");
    setProducts(data || []);
  };

  const handleSubmit = async () => {
    const { error } = await supabase.from("BaseProducts").insert([
      {
        product,
        description,
        parentProduct,
        productionType,
        costPrice,
        salePrice,
        stock,
      },
    ]);

    if (error) {
      alert("Erro ao salvar o produto!");
      return;
    }

    alert("Produto cadastrado com sucesso!");
    fetchProducts();
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("BaseProducts").delete().eq("id", id);

    if (error) {
      alert("Erro ao excluir o produto!");
      return;
    }

    alert("Produto excluído com sucesso!");
    fetchProducts();
  };

  const deleteTemplate = (rowData) => (
    <Button
      icon="pi pi-trash"
      className="p-button-danger"
      onClick={() => handleDelete(rowData.id)}
    />
  );

  return (
<div className="flex items-center justify-center min-h-screen p-4">
  <div className="w-full max-w-4xl">
    <TabView className="w-full">
      <TabPanel header="Dados Gerais">
        <DadosGerais
          product={product}
          setProduct={setProduct}
          description={description}
          setDescription={setDescription}
        />
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
        <Button
          label="Cadastrar Produto"
          icon="pi pi-check"
          onClick={handleSubmit}
          className="w-full mt-4 p-button-success"
        />
      </TabPanel>
      <TabPanel header="Produtos Cadastrados">
        <DataTable value={products} responsiveLayout="scroll">
          <Column field="material" header="Produto" />
          <Column field="description" header="Descrição" />
          <Column field="costPrice" header="Custo" />
          <Column field="salePrice" header="Venda" />
          <Column body={deleteTemplate} header="Ações" />
        </DataTable>
      </TabPanel>
    </TabView>
  </div>
</div>

  );
};

export default CadastroProdutos;
