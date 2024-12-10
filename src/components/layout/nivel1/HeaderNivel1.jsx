import { Menubar } from "primereact/menubar";
import { supabase } from "../../../services/supabase";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import PropTypes from "prop-types";
export default function HeaderNivel1({ toggleSidebar }) {
  const navigate = useNavigate();

  // Função de logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login"); // Redireciona para a página de login após o logout
  };

  // Itens do menu para o nível 1
  const items = [
    {
      label: "Menu nivel 2",
      icon: "pi pi-bars", // Ícone de barras para o menu
      command: () => toggleSidebar(), // Função para abrir/fechar a sidebar
    },
    { label: "Home", icon: "pi pi-home", command: () => navigate("/home") }, // Home
    {
      label: "Sair",
      icon: "pi pi-sign-out",
      command: handleLogout, // Função para o logout
    },
  ];

  return (
    <Menubar
      model={items}
      className="p-shadow-2"
      start={
        <div className="flex align-items-center">
          <img src={logo} alt="Logo" className="iconLogo" />
          <h2 className="ml-2 text-xl font-bold text-blue-600">Ciclo Verde</h2>
        </div>
      }
    />
  );
}

HeaderNivel1.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};
