import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { viewTableRequestProductPros } from "../types";

type ListProductsProps = {
  products: any;
};

const ListProducts: React.FC<ListProductsProps> = ({ products }) => {
  const [expandedRows, setExpandedRows] = useState<any[]>([]);
  const [groupedProducts, setGroupedProducts] = useState<any[]>([]);

  // Função para agrupar os dados por mês/ano, item coletado e data de coleta
  useEffect(() => {
    const groupedData = groupBy(products);
    setGroupedProducts(Object.values(groupedData)); // Garantindo que o valor seja um array
  }, [products]);

  const groupBy = (data: any[]) => {
    return data.reduce((acc, product) => {
      const [ano, mes] = product.data_coleta.split('-');
      const monthYear = `${ano}-${mes}`;
      const itemColetado = product.material;
      const dataColeta = product.data_coleta;

      const groupKey = `${monthYear}-${itemColetado}-${dataColeta}`;

      // Se já existe esse grupo, somar os valores
      if (acc[groupKey]) {
        acc[groupKey].peso_total += product.peso_total;
        acc[groupKey].valor_total += product.valor_total;
        acc[groupKey].items.push(product);
      } else {
        acc[groupKey] = {
          monthYear,
          material,
          data_coleta,
          peso_total: product.peso_total,
          valor_total: product.valor_total,
          items: [product],
        };
      }

      return acc;
    }, {} as any);
  };

  // Função para exibir a data no formato de mês/ano
  const converterParaDate = (dataString: string) => {
    const [ano, mes] = dataString.split('-');
    const data = new Date(Number(ano), Number(mes) - 1);
    return data.toLocaleDateString("pt-BR", {
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Função para renderizar as colunas da tabela
  const renderColumn = (col: string, rowData: any) => {
    if (col === "valor_total") {
      return (
        <span className="font-bold">
          R$ {rowData.toFixed(2)}
        </span>
      );
    } else if (col === "data_coleta") {
      return (
        <span className="font-bold">
          {converterParaDate(rowData)}
        </span>
      );
    }
    return rowData[col];
  };

  // Template para os dados da linha expandida
  const expandedRowTemplate = (data: any) => {
    return (
      <div className="p-2 p-d-flex p-jc-between">
        <div>
          <strong>Quantidade de Itens:</strong> {data.items.length}
        </div>
        <div>
          <strong>Peso Total:</strong> {data.peso_total}
        </div>
        <div>
          <strong>Valor Total:</strong> R$ {data.valor_total.toFixed(2)}
        </div>
      </div>
    );
  };

  return (
    <div className="p-d-flex p-jc-center p-mt-3">
      <Card className="sample-card">
        <DataTable
          value={groupedProducts} // Agora `groupedProducts` é um array
          tableStyle={{ minWidth: "50rem" }}
          paginator
          rows={20}
          className="w-full p-datatable-sm"
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          rowExpansionTemplate={expandedRowTemplate}
          responsiveLayout="scroll"
        >
          <Column expander={true} style={{ width: "5rem" }} />
          <Column field="monthYear" header="Mês/Ano" />
          <Column field="itemColetado" header="Item Coletado" />
          <Column field="dataColeta" header="Data Coleta" />
          <Column field="peso_total" header="Peso Total" />
          <Column field="valor_total" header="Valor Total" body={(e) => renderColumn("valor_total", e.valor_total)} />
        </DataTable>
      </Card>
    </div>
  );
};

export default ListProducts;
