import React, { useEffect, useState } from "react";
import TableProdut from "../../components/PainelRequest/table/TableProdut";
import ListProducts from "../../components/PainelRequest/table/ListProducts";

import {
  viewTableRequestProduct,
  viewTableRequestProductPros,
} from "../../components/PainelRequest/types";
import { Card } from "primereact/card";

const TableInfo: React.FC = () => {
  const [dadosView, setDadosView] = useState<viewTableRequestProductPros[]>([]);

  const handlView = async () => {
    const data: any = await viewTableRequestProduct();
    setDadosView(data);
  };

  useEffect(() => {
    handlView();
  }, []);

  return (
    <div className="overflow-x-auto p-d-flex p-jc-center p-mt-3">
      <Card title="Request">
        <div className="grid grid-cols-2 p-3">
        <div className="col-6">
          <TableProdut products={dadosView} />
        </div>
        <div className="col-6">
          <ListProducts products={dadosView} />
        </div>
        </div>
      </Card>
    </div>
  );
};

export default TableInfo;
