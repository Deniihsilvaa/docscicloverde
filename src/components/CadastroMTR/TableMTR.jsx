import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { supabase } from "../../services/supabase";

function TableMTR() {
    const [mtrData, setMtrData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [manifestoTypes] = useState(['Recebido', 'Salvo']);
    const [filters, setFilters] = useState({});
    const [lazyLoading, setLazyLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [viewDialog, setViewDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const rowsPerPage = 10;

    // Fetch data from Supabase with lazy loading
    const fetchData = async (page = 0) => {
        setLazyLoading(true);
        const from = page * rowsPerPage;
        const to = from + rowsPerPage - 1;

        const { data, error, count } = await supabase
            .from('baseMtr')
            .select('*', { count: 'exact' })
            .range(from, to);

        if (error) {
            console.error('Error fetching data:', error);
        } else {
            setMtrData((prev) => (page === 0 ? data : [...prev, ...data]));
            setTotalRecords(count);
        }
        setLazyLoading(false);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onRowEditComplete = (e) => {
        let _mtrData = [...mtrData];
        let { newData, index } = e;

        // Update the local state
        _mtrData[index] = newData;
        setMtrData(_mtrData);

        // Update the database
        const updateRow = async () => {
            const { error } = await supabase
                .from('baseMtr')
                .update({
                    mtr: newData.mtr,
                    situacao: newData.situacao,
                    responsavelemissao: newData.responsavelemissao,
                    gerador: newData.gerador,
                    transportadornome: newData.transportadornome,
                    quantidaderecebida: newData.quantidaderecebida,
                })
                .eq('id', newData.id);

            if (error) {
                console.error('Error updating row:', error);
            }
        };

        updateRow();
    };

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

    const dropdownEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={manifestoTypes}
                onChange={(e) => options.editorCallback(e.value)}
                placeholder="Select a Type"
            />
        );
    };

    const onViewDetails = (rowData) => {
        setSelectedRow(rowData);
        setViewDialog(true);
    };

    const actionTemplate = (rowData) => {
        return (
            <Button
                icon="pi pi-eye"
                className="p-button-rounded p-button-info"
                onClick={() => onViewDetails(rowData)}
            />
        );
    };

    const onFilterChange = (e, field) => {
        const value = e.target.value;
        setFilters((prev) => ({ ...prev, [field]: { value, matchMode: 'contains' } }));
    };

    const loadMoreData = () => {
        const currentPage = Math.ceil(mtrData.length / rowsPerPage);
        fetchData(currentPage);
    };

    return (
        <div className="card p-fluid">
            <DataTable
                value={mtrData}
                editMode="row"
                dataKey="id"
                onRowEditComplete={onRowEditComplete}
                loading={loading || lazyLoading}
                tableStyle={{ minWidth: '60rem' }}
                filters={filters}
                rows={rowsPerPage}
                paginator
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                totalRecords={totalRecords}
                lazy // Enable lazy loading
                scrollable
                scrollHeight="400px"
                onVirtualScroll={(e) => loadMoreData()} // essa funcao faz o lazy loading
            >
                <Column
                    field="mtr"
                    header="MTR"
                    editor={(options) => textEditor(options)}
                    style={{ width: '15%' }}
                    filter
                    filterPlaceholder="Search MTR"
                    onFilterApplyClick={(e) => onFilterChange(e, 'mtr')}
                ></Column>
                <Column
                    field="situacao"
                    header="Situação"
                    editor={(options) => dropdownEditor(options)}
                    style={{ width: '15%' }}
                    filter
                    filterPlaceholder="Search Situação"
                    onFilterApplyClick={(e) => onFilterChange(e, 'situacao')}
                ></Column>
                <Column field="responsavelemissao" header="Responsável Emissão" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                <Column field="gerador" header="Gerador" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                <Column field="transportadornome" header="Transportador" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                <Column field="quantidaderecebida" header="Quantidade" editor={(options) => textEditor(options)} style={{ width: '10%' }}></Column>
                <Column body={actionTemplate} header="Actions" style={{ width: '10%' }}></Column>
                <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
            </DataTable>
            {lazyLoading && <div>Loading more data...</div>}

            <Dialog
                header="Detalhes da MTR"
                visible={viewDialog}
                style={{ width: '50vw' }}
                onHide={() => setViewDialog(false)}
                footer={<Button label="Fechar" icon="pi pi-times" onClick={() => setViewDialog(false)} />}
            >
                {selectedRow && (
                    <div className="grid p-fluid">
                        <div className="field col-12 md:col-4">
                            <label htmlFor="mtr">MTR</label>
                            <InputText id="mtr" value={selectedRow.mtr} disabled />
                        </div>
                        <div className="field col-12 md:col-4">
                            <label htmlFor="situacao">Situação</label>
                            <Dropdown id="situacao" value={selectedRow.situacao} options={manifestoTypes} disabled />
                        </div>
                        <div className="field col-12 md:col-4">
                            <label htmlFor="responsavelemissao">Responsável Emissão</label>
                            <InputText id="responsavelemissao" value={selectedRow.responsavelemissao} disabled />
                        </div>
                        <div className="field col-12 md:col-4">
                            <label htmlFor="gerador">Gerador</label>
                            <InputText id="gerador" value={selectedRow.gerador} disabled />
                        </div>
                        <div className="field col-12 md:col-4">
                            <label htmlFor="transportadornome">Transportador</label>
                            <InputText id="transportadornome" value={selectedRow.transportadornome} disabled />
                        </div>
                        <div className="field col-12 md:col-4">
                            <label htmlFor="quantidaderecebida">Quantidade</label>
                            <InputText id="quantidaderecebida" value={selectedRow.quantidaderecebida} disabled />
                        </div>
                    </div>
                )}
            </Dialog>
        </div>
    );
}


export default TableMTR;
