import React, { useEffect, useState } from "react";
import TableProdut from "../../components/PainelRequest/table/TableProdut";
import ListProducts from "../../components/PainelRequest/table/ListProducts";

import {
  viewTableRequestProduct,
  viewTableListProducts,
  listProdutc,
} from "../../api/Api";
import { viewTableRequestProductPros } from "../../components/PainelRequest/types";

import { Card } from "primereact/card";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

const TableInfo: React.FC = () => {
  const [dadosView, setDadosView] = useState<any[]>([]);
  const [dadosViewList, setDadosViewList] = useState<any[]>([]);
  const [materials, setMaterials] = useState<{ label: string; value: string }[]>([]);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  
  const [loading, setLoading] = useState<boolean>(false);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [productsData, groupedData] = await Promise.all([
        viewTableRequestProduct(),
        viewTableListProducts(),
      ]);

      setDadosView(productsData);
      setDadosViewList(groupedData);
      setMaterials(
        Array.from(new Set(groupedData.map((item) => item.material))).map((material) => ({
          label: material,
          value: material,
        }))
      );
    } catch (error) {
      console.error("Erro ao carregar dados iniciais:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filteredView = [...dadosView];
    let filteredList = [...dadosViewList];
    
    if (selectedYear) {
      console.log("Ano selecionado",selectedYear)
      filteredView = filteredView.filter((item) => {
        const date = new Date(item.data_coleta);
        return date.getFullYear() === selectedYear;
      });

      filteredList = filteredList.filter((item) => {
        const date = new Date(item.data_coleta);
        return date.getFullYear() === selectedYear;
      });
    }

    if (startDate && endDate) {
      filteredView = filteredView.filter(
        (item) => {
          const date = new Date(item.data_coleta);
          const ano = date.getFullYear();
          const anoInicio = startDate.getFullYear();
          const anoFim = endDate.getFullYear();
          console.log("Filtrando ano:",endDate.getFullYear() )
          
          if( anoInicio && anoFim == ano){
            console.log("Ano completo")
            return date >= startDate && date <= endDate
          }
             
          return false;
        }
      );

      filteredList = filteredList.filter(
        (item) => {
          const date = new Date(item.data_coleta);
          return date >= startDate && date <= endDate;
        }
      );
    }

    if (selectedMaterial) {
      filteredView = filteredView.filter((item) => item.material === selectedMaterial);
      filteredList = filteredList.filter((item) => item.material === selectedMaterial);
    }

    setDadosView(filteredView);
    setDadosViewList(filteredList);
  };

  const resetFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedMaterial(null);
    fetchInitialData();
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <div className="overflow-x-auto p-d-flex p-jc-center p-mt-3">
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <ProgressSpinner />
        </div>
      ) : (
        <>
          <Card title="Resumo" className="mb-4">
            <div className="grid grid-cols-3 gap-4 p-3">
              <div className="text-center">
                <h4 className="font-semibold">Total de Produtos</h4>
                <p>{dadosView.length}</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold">Peso Total</h4>
                <p>
                  {dadosView.reduce((acc, item) => acc + (item.peso_total || 0), 0)} kg
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold">Valor Total</h4>
                <p>
                  R$
                  {dadosView
                    .reduce((acc, item) => acc + (item.valor_total || 0), 0)
                    .toFixed(2)}
                </p>
              </div>
            </div>
          </Card>

          <Card title="Filtros" className="mb-4">
            <div className="p-3">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="startDate"
                    className="block mb-2 font-semibold"
                  >
                    Data Inicial
                  </label>
                  <Calendar
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.value? e.value : null)}
                    placeholder="Selecione a data inicial"
                    className="w-full"
                    dateFormat="dd/mm/yy"
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block mb-2 font-semibold">
                    Data Final
                  </label>
                  <Calendar
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.value? e.value : null)}
                    placeholder="Selecione a data final"
                    className="w-full"
                    dateFormat="dd/mm/yy"
                  />
                </div>
                <div>
                  <label
                    htmlFor="material"
                    className="block mb-2 font-semibold"
                  >
                    Material
                  </label>
                  <Dropdown
                    id="material"
                    value={selectedMaterial}
                    onChange={(e) => setSelectedMaterial(e.value)}
                    options={materials}
                    placeholder="Selecione o material"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  label="Limpar Filtros"
                  className="mr-2 p-button-secondary"
                  onClick={resetFilters}
                />
                <Button
                  label="Aplicar Filtros"
                  className="p-button"
                  onClick={applyFilters}
                />
              </div>

            </div>
          </Card>

          <Card title="Request">
            <div className="grid grid-cols-2 p-3">
              <div className="col-12">
                <h3 className="mb-2 text-lg font-bold">Produtos Agrupados</h3>
                <ListProducts products={dadosViewList} years={[2024, 2025]} onYearChange={(year) => setSelectedYear(year)} />
              </div>

              <div className="col-12">
                <h3 className="mb-2 text-lg font-bold">Detalhes dos Produtos</h3>
                <TableProdut products={dadosView} />
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default TableInfo;
