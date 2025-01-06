import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";

type Product = {
  material: string;
  months: { [key: string]: number };
  peso_total: number;
};

type ListProductsProps = {
  products: Product[];
  years: number[];
  onYearChange: (year: number) => void;
};

const ListProducts: React.FC<ListProductsProps> = ({
  products,
  years,
  onYearChange,
}) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // Define os meses na ordem esperada
  const months = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  useEffect(() => {
    console.log("products", products);
  }, [years]);

  return (
    <div className="p-d-flex p-jc-center p-mt-3">
      <Card className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Produtos por Mês</h3>
          <Dropdown
            value={selectedYear}
            options={years.map((year) => ({
              label: year.toString(),
              value: year,
            }))}
            onChange={(e) => {
              setSelectedYear(e.value);
              onYearChange(e.value);
            }}
            placeholder="Selecione o ano"
            className="w-48"
          />
        </div>

        <DataTable
          value={products}
          className="w-full p-datatable-sm"
          responsiveLayout="scroll"
        >
          {/* Coluna fixa para o material */}
          <Column
            field="material"
            header="Material"
            style={{ fontWeight: "bold" }}
            frozen
            className="w-60"
          />

          {/* Colunas para os meses */}
          {months.map((month) => (
            <Column
              key={month}
              field={`months.${month}`}
              header={month.charAt(0).toUpperCase() + month.slice(1)}
              body={(rowData: Product) =>
                rowData.months?.[month]?.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                }) || "0,00"
              }
              className="text-right"
            />
          ))}

          {/* Coluna para o total */}
          <Column
            field="peso_total"
            header="Total"
            body={(rowData: Product) =>
              rowData.peso_total
                ? rowData.peso_total
                : "R$ 0,00"
            }
            className="font-semibold text-right"
          />
        </DataTable>
      </Card>
    </div>
  );
};

export default ListProducts;
