import React, { useEffect, useState } from "react";
import TableProdut from "../../components/PainelRequest/table/TableProdut";
import ListProducts from "../../components/PainelRequest/table/ListProducts";
import { viewTableRequestProduct,viewTableListProducts } from "../../api/Api";
import { viewTableRequestProductPros } from "../../components/PainelRequest/types";
import { Card } from "primereact/card";

const TableInfo: React.FC = () => {
  const [dadosView, setDadosView] = useState<viewTableRequestProductPros[]>([]);
  const [dadosViewList, setDadosViewList] = useState([]);


  const handlView = async () => {
    const data: any = await viewTableRequestProduct();
    setDadosView(data);
  };
  const handlViewList = async () => {
    const data: any = await viewTableListProducts();
    setDadosViewList(data);
  };

  useEffect(() => {
    handlView();
    handlViewList();
  }, []);

  return (
    <div className="overflow-x-auto p-d-flex p-jc-center p-mt-3">
      <Card title="Request">
        <div className="grid grid-cols-2 p-3">
          <div className="col-12">{<ListProducts products={dadosViewList} />}</div>

          <div className="col-12 ">
            <TableProdut products={dadosView} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TableInfo;
