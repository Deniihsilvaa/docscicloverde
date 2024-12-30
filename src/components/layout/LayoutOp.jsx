import { useState } from "react";
import { Outlet } from "react-router";
import "./layout.css";

import Header from "./nivel2/HeaderNivel2";
import Sidebar from "./nivel2/SidebarNivel2";
import Footer from "./nivel2/FooterNivel2";
import UserOP from "../../pages/leader/user"

import PropTypes from "prop-types";
const LayoutOp = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  // Função para alternar o estado da sidebar
  const toggleSidebar = () => {
    setIsOpenSidebar((prevState) => !prevState);
  };

  return (
<div className="flex flex-col min-h-screen shadow-neutral-300 layout">
  <Header toggleSidebar={toggleSidebar} />
  
  <div className="flex flex-col flex-1 md:flex-row">
    <main className="flex-1 w-full px-4 py-4 md:px-6">
      <Outlet>
        <UserOP />
      </Outlet>
    </main>
  </div>
  
  <Footer className="w-full py-2 text-sm text-center" />
</div>

  );
};

LayoutOp.propTypes = {
  userLevel: PropTypes.shape({
    role: PropTypes.string,
  }),
};

export default LayoutOp;
