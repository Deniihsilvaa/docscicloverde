import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
import "./layout.css";
const Layout = () => {
  return (
    <div className="layout flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
