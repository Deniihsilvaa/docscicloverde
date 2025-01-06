// src/pages/DashBoardRequest.tsx
import React, { useState,useEffect } from "react";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { Button } from "primereact/button";
import { FormRequest } from "../components/PainelRequest/FormRequest";
import  FormRequestProduto  from "../components/PainelRequest/FormRequestProduto";
import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";
import { viewTableRequestProduct,deleteTableRequestProduct } from "../api/Api";
import {handleSubmintRequestProduct,deletTableRequestProduct} from "../components/PainelRequest/types"
import { useNavigate } from "react-router";
import TableRequest from "../components/PainelRequest/table/TableRequest";
const DashBoardRequest: React.FC = () => {
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogVisibleProducts, setDialogVisibleProducts] = useState(false);
  const [dataTableRequest, setDataTableRequest] = useState<any>([]);
  const [editDataTableRequest, setEditDataTableRequest] = useState<any>([]);
  const [metodo,setMetodo] = useState<string>("")

  const handleNavigation = (path) => {
    navigate.apply(this, [`/admin/request/${path}`]);
  };
  const handleSubmitRequestProd = async (data) => {
    

    const retorno = await handleSubmintRequestProduct(data);    
    if (!retorno) {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Falha ao salvar solicitação.",
        life: 5000,
      });
      return;
    }
    if (retorno) {
      toast.current?.show({
        severity: "success",
        summary: "Sucesso",
        detail: "Solicitação salva com sucesso.",
        life: 5000,
      });
      setDialogVisible(false)
      setDialogVisibleProducts(false);
      loadingDataView();

      
    }
    
  };
  const loadingDataView = async () => {
    const data = await viewTableRequestProduct();
    setDataTableRequest(data);
    
  };
  const onDelet = async(onDelet)=>{
    const retorno = await deleteTableRequestProduct(onDelet);
    if (retorno) {
      toast.current?.show({
        severity: "success",
        summary: "Sucesso",
        detail: "Solicitação excluida com sucesso.",
        life: 5000,
      });
      loadingDataView();
    }else{
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Falha ao excluir solicitação.",
        life: 5000,
      })
    }
  }
  const onEdit = async(onEdit)=>{
    setMetodo("edit")
    setEditDataTableRequest(onEdit)
    setDialogVisibleProducts(true);
    
  }
  const duplicar = async(onDuplic)=>{
    setMetodo("duplic")
    setEditDataTableRequest(onDuplic)
    setDialogVisibleProducts(true);
    
  }
  const visiblrProducts = ()=>{
    setEditDataTableRequest([])
    setDialogVisibleProducts(true)
    
  }
useEffect(() => {
  loadingDataView()
},[])
  
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50 min-w-screen">
      <Toast ref={toast} />
      <div className="container w-full p-4 overflow-x-auto rounded-lg bg-slate-500">
        <Card title="Registros">
          <div className="grid grid-cols-1 gap-4">
            <div className="col-2">
              <Button
                label="Folha de solicitação"
                className="w-full"
                onClick={() => setDialogVisible(true)}
              />
            </div>
            <div className="col-2">
              <Button
                label="Request Diário"
                className="w-full"
                onClick={() => visiblrProducts()}
              />
            </div>
            <div className="col-2">
              <Button
                label="Informação Produtos"
                className="w-full"
                onClick={() => handleNavigation("infoproducts")}
              />
            </div>
          </div>

          {/* Diálogo de Solicitação */}
          <Dialog
            header="Folha de solicitação"
            visible={dialogVisible}
            style={{ width: "70vw", maxHeight: "80vh" }}
            onHide={() => setDialogVisible(false)}
          >
            <div className="contents shadow-neutral-400">
              <FormRequest onSubmit={handleSubmitRequestProd} />
            </div>
          </Dialog>

          {/* Diálogo de Produtos */}
          <Dialog
            header="Request Diário"
            visible={dialogVisibleProducts}
            style={{ width: "70vw", maxHeight: "80vh" }}
            onHide={() => setDialogVisibleProducts(false)}
            
          >
            <div className="contents shadow-neutral-400">
              <FormRequestProduto onSubmit={handleSubmitRequestProd} initialValues={editDataTableRequest} metodo={metodo}/>
            </div>
          </Dialog>
        </Card>

        <Card title="Informações" >
          <div className="p-4 overflow-x-auto rounded-lg bg-slate-500">
            <TableRequest  dataview={dataTableRequest} onDelet={onDelet} onEdit={onEdit} duplic={duplicar}/>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashBoardRequest;
