import { useState } from "react";
import { Outlet } from "react-router";
import "./layout.css";

import Header from "./nivel3/HeaderNivel3";
import Sidebar from "./nivel3/SidebarNivel3";
import Footer from "./nivel3/FooterNivel3";

import PropTypes from "prop-types";

const Layout = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  // Função para alternar o estado da sidebar
  const toggleSidebar = () => {
    setIsOpenSidebar((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col min-h-screen layout">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={isOpenSidebar} Isclose={toggleSidebar} />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  userLevel: PropTypes.shape({
    role: PropTypes.string,
  }),
};

export default Layout;
