import { CreateListInfo } from "./listInfo";
import { BreadCrumb } from "primereact/breadcrumb";
import { useNavigate } from "react-router";
const PainelFinanceiro = () => {
const navigate = useNavigate();

const handleNavigation = (path) => {
  navigate.apply(this, [`/op/${path}`]);
};
  const items = [
    {
      label: "financeiro",
      template: () => <a className="font-semibold text-primary">financeiro</a>,
    },
  ];
  const home = { icon: "pi pi-home", command: () => handleNavigation("home") };

  return (
    <div>
      <BreadCrumb model={items} home={home} />
      <CreateListInfo />
    </div>
  );
};

export default PainelFinanceiro;
