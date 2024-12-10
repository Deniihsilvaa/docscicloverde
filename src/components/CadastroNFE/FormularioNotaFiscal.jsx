import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import PropTypes from "prop-types";
const FormularioNotaFiscal = ({
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
  produtoSelecionado,
  setProdutoSelecionado,
  quantidade,
  setQuantidade,
  adicionarProduto,
  removerProduto,
  handleSubmit,
  produtosDisponiveis,
  errors,
}) => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="field">
          <label htmlFor="numeroNota" className="block">
            Número da Nota
          </label>
          <InputText
            id="numeroNota"
            value={numeroNota}
            onChange={(e) => setNumeroNota(e.target.value)}
            placeholder="Ex.: 12345"
            className={`w-full ${errors.numeroNota ? "p-invalid" : ""}`}
          />
          {errors.numeroNota && (
            <small className="p-error">{errors.numeroNota}</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="dataEmissao" className="block">
            Data de Emissão
          </label>
          <Calendar
            id="dataEmissao"
            value={dataEmissao}
            onChange={(e) => setDataEmissao(e.value)}
            dateFormat="dd/mm/yy"
            placeholder="Selecione a data"
            className={`w-full ${errors.dataEmissao ? "p-invalid" : ""}`}
          />
          {errors.dataEmissao && (
            <small className="p-error">{errors.dataEmissao}</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="fornecedorCliente" className="block">
            {notaTipo === "entrada" ? "Fornecedor" : "Cliente"}
          </label>
          <InputText
            id="fornecedorCliente"
            value={fornecedorCliente}
            onChange={(e) => setFornecedorCliente(e.target.value)}
            placeholder={
              notaTipo === "entrada" ? "Nome do fornecedor" : "Nome do cliente"
            }
            className={`w-full ${errors.fornecedorCliente ? "p-invalid" : ""}`}
          />
          {errors.fornecedorCliente && (
            <small className="p-error">{errors.fornecedorCliente}</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="valorTotal" className="block">
            Valor Total (R$)
          </label>
          <InputNumber
            id="valorTotal"
            value={valorTotal}
            onValueChange={(e) => setValorTotal(e.value)}
            mode="currency"
            currency="BRL"
            placeholder="0,00"
            className={`w-full ${errors.valorTotal ? "p-invalid" : ""}`}
          />
          {errors.valorTotal && (
            <small className="p-error">{errors.valorTotal}</small>
          )}
        </div>
      </div>

      <Divider />

      <h3 className="mb-2 text-lg font-bold">Produtos</h3>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="field">
          <label htmlFor="produtoSelecionado" className="block">
            Produto
          </label>
          <Dropdown
            id="produtoSelecionado"
            value={produtoSelecionado}
            options={produtosDisponiveis}
            onChange={(e) => setProdutoSelecionado(e.value)}
            placeholder="Selecione"
            className="w-full"
          />
        </div>
        <div className="field">
          <label htmlFor="quantidade" className="block">
            Quantidade
          </label>
          <InputNumber
            id="quantidade"
            value={quantidade}
            onValueChange={(e) => setQuantidade(e.value)}
            min={1}
            className="w-full"
          />
        </div>
        <div className="field">
          <Button
            label="Adicionar Produto"
            icon="pi pi-plus"
            onClick={adicionarProduto}
            className="w-full p-button-success"
          />
        </div>
      </div>

      {produtos.length > 0 && (
        <ul className="pl-4 mb-4 list-disc">
          {produtos.map((item, index) => (
            <li key={index} className="flex items-center justify-between">
              <span>
                {item.produto} - {item.quantidade} unidade(s)
              </span>
              <Button
                icon="pi pi-times"
                className="p-button-danger p-button-text"
                onClick={() => removerProduto(index)}
              />
            </li>
          ))}
        </ul>
      )}

      <Button
        label="Registrar Nota"
        icon="pi pi-check"
        onClick={handleSubmit}
        className="p-button-primary"
      />
      {errors.produtos && <small className="p-error">{errors.produtos}</small>}
    </div>
  );
};
FormularioNotaFiscal.propTypes = {
  notaTipo: PropTypes.string.isRequired,
  numeroNota: PropTypes.string.isRequired,
  setNumeroNota: PropTypes.func.isRequired,
  dataEmissao: PropTypes.any, // Use `any` se pode ser null ou Date
  setDataEmissao: PropTypes.func.isRequired,
  fornecedorCliente: PropTypes.string.isRequired,
  setFornecedorCliente: PropTypes.func.isRequired,
  valorTotal: PropTypes.number,
  setValorTotal: PropTypes.func.isRequired,
  produtos: PropTypes.arrayOf(
    PropTypes.shape({
      produto: PropTypes.string.isRequired,
      quantidade: PropTypes.number.isRequired,
    })
  ).isRequired,
  produtoSelecionado: PropTypes.string,
  setProdutoSelecionado: PropTypes.func.isRequired,
  quantidade: PropTypes.number.isRequired,
  setQuantidade: PropTypes.func.isRequired,
  adicionarProduto: PropTypes.func.isRequired,
  removerProduto: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  produtosDisponiveis: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  errors: PropTypes.object.isRequired,
};
export default FormularioNotaFiscal;
