import { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import FormularioNotaFiscal from "./FormularioNotaFiscal";

const RegistroNotasFiscais = () => {
  const [notaTipo, setNotaTipo] = useState("entrada");
  const [numeroNota, setNumeroNota] = useState("");
  const [dataEmissao, setDataEmissao] = useState(null);
  const [fornecedorCliente, setFornecedorCliente] = useState("");
  const [valorTotal, setValorTotal] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [errors, setErrors] = useState({});

  const produtosDisponiveis = [
    { label: "Produto A", value: "produto_a" },
    { label: "Produto B", value: "produto_b" },
    { label: "Produto C", value: "produto_c" },
  ];

  const adicionarProduto = () => { /* Lógica */ };
  const removerProduto = () => { /* Lógica */ };
  const handleSubmit = () => { /* Lógica */ };

  return (
    <TabView>
      <TabPanel header="Nota de Entrada">
        <FormularioNotaFiscal
          {...{
            notaTipo,
            numeroNota,
            setNumeroNota,
            dataEmissao,
            setDataEmissao,
            fornecedorCliente,
            setFornecedorCliente,
            valorTotal,
            setValorTotal,
            produtos,
            setProdutos,
            produtoSelecionado,
            setProdutoSelecionado,
            quantidade,
            setQuantidade,
            adicionarProduto,
            removerProduto,
            handleSubmit,
            produtosDisponiveis,
            errors,
          }}
        />
        <div className="mt-4">
          <h3>Tabela de Exemplo</h3>
          <table className="w-full border">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((item, index) => (
                <tr key={index}>
                  <td>{item.produto}</td>
                  <td>{item.quantidade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TabPanel>
    </TabView>
  );
};

export default RegistroNotasFiscais;
