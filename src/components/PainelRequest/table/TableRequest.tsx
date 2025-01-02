import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { TabView, TabPanel } from "primereact/tabview";

import { Column } from "primereact/column";
import { fetchMtrs } from "../../../utils/mtr";
const TableRequest: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  const getData = async () => {
    const result = await fetchMtrs();
    setData(result);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <TabView>
        <TabPanel header="Request Serviços" leftIcon="pi pi-clipboard mr-2" key={'tab1'}>
          <DataTable
            value={data}
            paginator
            rows={10}
            className="p-datatable-sm"
          >
            <Column field="dataemissao" header="Data" />
            <Column field="mtr" header="MTR" />
          </DataTable>
        </TabPanel>
        <TabPanel header="Request Material" rightIcon="pi pi-clipboard ml-2" key={'tab2'}>
          
        </TabPanel>
      </TabView>
    </div>
  );
};

export default TableRequest;
