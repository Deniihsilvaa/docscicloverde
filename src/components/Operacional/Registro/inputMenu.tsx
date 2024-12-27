    import React, { useRef } from "react";
    import { Button } from "primereact/button";
    import { Menu } from "primereact/menu";
    import { deletarColaborador, InputMenuProps } from "./types";
    import { useToast } from "../../Toast/ToastContext";
    import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";

    const InputMenu: React.FC<InputMenuProps> = ({ row, setRow }) => {
    const menuRight = useRef<Menu>(null); // Ref para o Menu
    const { showToast } = useToast();

    const items = [
        {
        label: "Oque vamos fazer?",
        items: [
            {
            label: "Editar",
            icon: "pi pi-pencil",
            command: () => {
                console.log("editando dados,", row);
            },
            },
            {
            label: "Deletar",
            icon: "pi pi-trash",
            command: (e) => confirm1(e.originalEvent),
            },
        ],
        },
    ];
    const accept = () => {
        deletarColaborador(row.id)
          .then(() => {
            showToast({
              severity: "success",
              summary: "Sucesso",
              detail: "Colaborador deletado com sucesso",
              life: 5000,
            });
            setRow((prev) => prev.filter((item) => item.id !== row.id));
          })
          .catch((error) => {
            showToast({
              severity: "error",
              summary: "Erro",
              detail: error.message,
              life: 5000,
            });
          });
      };
    
      const reject = () => {
        showToast({
          severity: "warn",
          summary: "Ação Cancelada",
          detail: "Você cancelou a exclusão",
          life: 3000,
        });
      };
    
      const confirm1 = (event: React.MouseEvent<HTMLButtonElement>) => {
        confirmPopup({
          group: "headless",
          target: event.currentTarget,
          message: "Tem certeza que deseja excluir este colaborador?",
          icon: "pi pi-exclamation-triangle",
          defaultFocus: "reject",
          accept,
          reject,
        });
      };
    const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        menuRight.current?.toggle(event);
    };

    return (
        <div className="flex card justify-content-center">
<ConfirmPopup
        group="headless"
        content={({ message, acceptBtnRef, rejectBtnRef, hide }) => (
          <div className="p-3 text-white bg-gray-900 border-round">
            <span>{message}</span>
            <div className="flex gap-2 mt-3 align-items-center">
              <Button
                ref={acceptBtnRef}
                label="Excluir"
                onClick={() => {
                  accept();
                  hide();
                }}
                className="p-button-sm p-button-outlined p-button-danger"
              />
              <Button
                ref={rejectBtnRef}
                label="Cancelar"
                outlined
                onClick={() => {
                  reject();
                  hide();
                }}
                className="p-button-sm p-button-text"
              />
            </div>
          </div>
        )}
      />
        <Menu model={items} popup ref={menuRight} id="popup_menu_right" />
        <Button
            label=""
            icon="pi pi-ellipsis-v"
            onClick={toggleMenu}
            aria-controls="popup_menu_right"
            aria-haspopup
            className="p-button-text p-button-sm" // Ajusta o estilo do botão
        />
        </div>
    );
    };

    export default InputMenu;
