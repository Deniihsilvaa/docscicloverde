import  { useState } from 'react';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

const UploadXML = () => {
    const [xmlData, setXmlData] = useState(null);
    const toast = useRef(null);

    const handleUpload = (event) => {
        const file = event.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const xmlText = e.target.result;
            setXmlData(xmlText);
            console.log('Conteúdo do XML:', xmlText);
            toast.current.show({ severity: 'success', summary: 'Upload Realizado', detail: 'Arquivo XML carregado com sucesso' });
        };

        reader.onerror = () => {
            toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao ler o arquivo' });
        };

        reader.readAsText(file);
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-gray-100">
            <Toast ref={toast} />
            <div className="p-4 bg-white shadow-md rounded-md w-full max-w-lg">
                <h2 className="text-2xl font-semibold text-center mb-4">Importar Arquivo XML</h2>
                <FileUpload
                    mode="basic"
                    accept=".xml"
                    chooseLabel="Selecionar XML"
                    customUpload
                    uploadHandler={handleUpload}
                    auto
                    className="w-full mb-4"
                />
                <Button
                    label="Enviar para Console"
                    icon="pi pi-upload"
                    onClick={() => console.log('Dados XML:', xmlData)}
                    disabled={!xmlData}
                    className="w-full p-button-outlined"
                />
            </div>
        </div>
    );
};

export default UploadXML;
