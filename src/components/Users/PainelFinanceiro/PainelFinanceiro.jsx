import { CreateListInfo } from "./listInfo";
import { BreadCrumb } from "primereact/breadcrumb";

const PainelFinanceiro = () => {

  const items = [
    {
      label: "financeiro",
      template: () => <a className="font-semibold text-primary">financeiro</a>,
    },
  ];
  const home = { icon: "pi pi-home", url: "/home" };

  return (
    <div>
      <BreadCrumb model={items} home={home} />
      <CreateListInfo />
    </div>
  );
};

export default PainelFinanceiro;
