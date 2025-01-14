import React, { useState, useEffect ,useRef} from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Payment } from "./Payment";
import { viewTableBasePagamentos, saveOrUpdatePayment, deletePayment, listColab } from "../../api/Api";
import { formatMoney } from "../../utils/formatMoney";
import Toast from "../../components/Toast/ToastModel";

const PaymentRegistration: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [visible, setVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newPayment, setNewPayment] = useState<Partial<Payment>>({
    status: "pending",
    type_pg: "wage",
  });
  const [totalEfetuado, setTotalEfetuado] = useState(0);
  const [totalPendente, setTotalPendente] = useState(0);
  const [statusOptionsColab, setStatusOptions] = useState<{ label: string; value: string }[]>([]);
    const toast = useRef<any>(null);

  const fetchStatusOptions = async () =>{
    try{
        const dados = await listColab();
        setStatusOptions(dados);
    }catch (error) {
        console.log("Erro ao carregar dados", error)
    }
  }
  const statusOptionsStatus = [
    { label: 'Pendente', value: 'pendente' },
    { label: 'Pago', value: 'pago' },
    { label: 'Cancelado', value: 'cancelado' }
  ];

  const paymentTypes = [
    { label: "Salário", value: "wage" },
    { label: "Adiantamento", value: "advance" },
    { label: "Bônus", value: "bonus" },
    { label: "Outro", value: "other" },
  ];


  const calculaTotais = (payments: Payment[]) => {
    
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const efetuado = payments
      .filter(
        (payment) =>
          payment.status === "paid" &&
          payment.mes_referente === currentMonth &&
          payment.yearRef === currentYear
      )
      .reduce((sum, payment) => sum + payment.valor_total, 0);

    const pendente = payments
      .filter(
        (payment) =>
          payment.status === "pending" &&
          payment.mes_referente === currentMonth &&
          payment.yearRef === currentYear
      )
      .reduce((sum, payment) => sum + payment.valor_total, 0);

    setTotalEfetuado(efetuado);
    setTotalPendente(pendente);
  };

  const importaBase = async () => {
    const baseDados = await viewTableBasePagamentos();
    setPayments(baseDados);
    calculaTotais(baseDados);
  };

  useEffect(() => {
    importaBase();
  }, []);
useEffect(()=>{
    fetchStatusOptions();
},[])
  

  const header = (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold">Pagamentos</h2>
        <div className="text-sm text-gray-600">
          <p>Total Efetuado: {formatMoney(totalEfetuado)}</p>
          <p>Total Pendente: {formatMoney(totalPendente)}</p>
        </div>
      </div>
      <div>
        <Button
          label="Registrar"
          icon="pi pi-plus"
          onClick={() => {
            setEditMode(false);
            setNewPayment({
              status: "pending",
              type_pg: "wage",
            });
            setVisible(true);
          }}
        />
      </div>
    </div>
  );

  const savePayment = async () => {
    try {
      if (editMode) {
        await saveOrUpdatePayment(newPayment as Payment);
      } else {
        console.log("salvando dados")
        await saveOrUpdatePayment(newPayment);
      }
      //setVisible(false);
      toast.current?.show({
          severity:"sucess",
          summary:"Sucesso",
          life:5000
      })
      importaBase();
    } catch (error) {
      console.error("Erro ao salvar o pagamento:", error);
      
      toast.current?.show({
        severity: "",
        summary: "erro ao salvar pagamentos",
        life: 5000
      })
      
    }
  };

  const handleEdit = (payment: Payment) => {
    console.log("Dados para editar:", payment);
    setEditMode(true);
    setNewPayment(payment);
    setVisible(true);
  };

  const handleDelete = async (payment: Payment) => {
    try {
      const response = await deletePayment(payment.id);
      if (!response) {
          toast.current?.show({
            severity: "erro",
            summary: "Erro ao deletar dados tente novamente",
            life: 500
          })
      }
      toast.current?.show({
        severity: "success",
        summary: "Dados deletados com sucesso",
        life: 500
      })
      importaBase();
    } catch (error) {
      console.error("Erro ao excluir o pagamento:", error);
    }
  };

  const handleClone = (payment: Payment) => {
    const clonedPayment = {
      ...payment,
      id: crypto.randomUUID(),
      user_id: `${payment.user_id} (Cópia)`,
    };
    setPayments([...payments, clonedPayment]);
  };

  const actionBodyTemplate = (rowData: Payment) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="p-button-warning"
          onClick={() => handleEdit(rowData)}
          tooltip="Editar"
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => handleDelete(rowData)}
          tooltip="Excluir"
        />
        <Button
          icon="pi pi-copy"
          rounded
          outlined
          severity="info"
          onClick={() => handleClone(rowData)}
          tooltip="Clonar"
        />
      </div>
    );
  };

  return (
    <div className="p-4">
        <Toast ref={toast} />
      <DataTable
        value={payments}
        header={header}
        className="mt-4"
        stripedRows
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        id="id"
      >
        <Column field="user_id" header="Colaborador" />
        <Column
          field="valor_total"
          header="Valor"
          body={(row) => formatMoney(row.valor_total)}
        />
        <Column field="status" header="Status" />
        <Column field="data_vencimento" header="Data Vencimento" />
        <Column field="type_pg" header="Tipo Pagamento" />
        <Column field="data_pagamento" header="Data Pagamento" />

        <Column
          body={actionBodyTemplate}
          header="Ações"
          style={{ width: "12rem" }}
        />
      </DataTable>

      <Dialog
        header={editMode ? "Editar Pagamento" : "Registrar Pagamento"}
        visible={visible}
        onHide={() => setVisible(false)}
        className="w-full max-w-lg"
      >
        <div className="grid grid-cols-2 gap-4 p-4">
          <div className="col-span-2">
            <label className="block mb-2">Colaborador</label>
            
            <Dropdown
              value={newPayment.user_id}
              options={statusOptionsColab}
              onChange={(e) =>
                setNewPayment({ ...newPayment, user_id: e.target.value })
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-2">Valor</label>
            <InputNumber
              value={newPayment.valor_total}
              onChange={(e) =>
                setNewPayment({ ...newPayment, valor_total: e.value })
              }
              mode="currency"
              currency="BRL"
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-2">Status</label>
            <Dropdown
              value={newPayment.status}
              options={statusOptionsStatus}
              onChange={(e) =>
                setNewPayment({ ...newPayment, status: e.value })
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-2">Data de Pagamento</label>
            <Calendar
              value={newPayment.data_pagamento}
              onChange={(e) =>
                setNewPayment({
                  ...newPayment,
                  data_pagamento: e.value as Date,
                })
              }
               dateFormat="dd/mm/yy"
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-2">Mês ref</label>
            <InputNumber
              value={newPayment.mes_referente}
              onChange={(e) =>
                setNewPayment({ ...newPayment, mes_referente: e.value as number })
              }
              min={1}
              max={12}
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-2">URL (Comprovante)</label>
            <InputText
              value={newPayment.url}
              onChange={(e) =>
                setNewPayment({ ...newPayment, url: e.target.value })
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-2">Tipo de Pagamento</label>
            <Dropdown
              value={newPayment.type_pg}
              options={paymentTypes}
              onChange={(e) =>
                setNewPayment({ ...newPayment, type_pg: e.value })
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-2">Data de Vencimento</label>
            <Calendar
              value={newPayment.data_vencimento}
              onChange={(e) =>
                setNewPayment({
                  ...newPayment,
                  data_vencimento: e.value as Date,
                })
              }
               dateFormat="dd/mm/yy"
              className="w-full"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            label="Cancelar"
            icon="pi pi-times"
            onClick={() => setVisible(false)}
            className="p-button-text"
          />
          <Button
            label={editMode ? "Salvar" : "Registrar"}
            icon="pi pi-check"
            onClick={savePayment}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default PaymentRegistration;
