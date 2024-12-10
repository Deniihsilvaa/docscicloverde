import { useState } from "react";
import { Outlet } from "react-router";
import "./layout.css";

import HeaderNivel3 from "./nivel3/HeaderNivel3";
import SidebarNivel3 from "./nivel3/SidebarNivel3";
import FooterNivel3 from "./nivel3/FooterNivel3";

import HeaderNivel1 from "./nivel1/HeaderNivel1";
import SidebarNivel1 from "./nivel1/SidebarNivel1";
import FooterNivel1 from "./nivel1/FooterNivel1";

import HeaderNivel2 from "./nivel2/HeaderNivel2";
import SidebarNivel2 from "./nivel2/SidebarNivel2";
import FooterNivel2 from "./nivel2/FooterNivel2";

const Layout = ({ userLevel }) => {
  console.log('Nivel do usuario',userLevel);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  // Função para alternar o estado da sidebar
  const toggleSidebar = () => {
    setIsOpenSidebar((prevState) => !prevState);
  };

  // Determinar os componentes com base no nível do usuário
  let Header, Sidebar, Footer;

  switch (userLevel) {
    case 'Admin':
      Header = HeaderNivel3;
      Sidebar = SidebarNivel3;
      Footer = FooterNivel3;
      break;
    case 'COLLABORATOR':
      Header = HeaderNivel2;
      Sidebar = SidebarNivel2;
      Footer = FooterNivel2;
      break;
    default:
      Header = HeaderNivel1;
      Sidebar = SidebarNivel1;
      Footer = FooterNivel1;
      break;
  }

  return (
    <div className="flex flex-col min-h-screen layout">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={isOpenSidebar} closeSidebar={toggleSidebar} />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};
Layout.propTypes = {
  userLevel: Number,
}
export default Layout;
