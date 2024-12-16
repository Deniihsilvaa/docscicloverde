import { useState } from "react";
import { Outlet } from "react-router";
import "./layout.css";

import Header from "./nivel2/HeaderNivel2";
import Sidebar from "./nivel2/SidebarNivel2";
import Footer from "./nivel2/FooterNivel2";
import UserOP from "../../pages/user"
import PropTypes from "prop-types";

const LayoutOp = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  // Função para alternar o estado da sidebar
  const toggleSidebar = () => {
    setIsOpenSidebar((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col min-h-screen layout">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={isOpenSidebar} closeSidebar={toggleSidebar} />
        <main>
          <Outlet>
            <UserOP />
          </Outlet>
        </main>
      </div>
      <Footer />
    </div>
  );
};

LayoutOp.propTypes = {
  userLevel: PropTypes.shape({
    role: PropTypes.string,
  }),
};

export default LayoutOp;
