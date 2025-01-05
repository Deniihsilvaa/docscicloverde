import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

type ListProductsProps = {
  products: any;
};

const ListProducts: React.FC<ListProductsProps> = ({ products }) => {


  return (
    <div className="p-d-flex p-jc-center p-mt-3">
      <Card className="sample-card">
        <DataTable
          value={products}
          paginator
          rows={20}
          className="w-full p-datatable-sm"
          responsiveLayout="scroll"
        >
          <Column field="material" header="Material" sortable />
          <Column field="peso_total" header="Total" />

        </DataTable>
      </Card>
    </div>
  );
};

export default ListProducts;
