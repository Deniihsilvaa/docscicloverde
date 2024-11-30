import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import "./layout.css";

const Layout = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    // Avoid updating the state unnecessarily, only toggle the sidebar if needed
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

export default Layout;
