import React, { useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { fetchMtrs } from '../../../utils/mtr'
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

      <DataTable value={data} paginator rows={10} className="p-datatable-sm">
        <Column field="dataemissao" header="Data" />
        <Column field="mtr" header="MTR" />
      </DataTable>
    </div>
  );
}

export default TableRequest;
