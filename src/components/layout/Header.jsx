import { Menubar } from "primereact/menubar";
import { supabase } from "../../services/supabase";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import PropTypes from "prop-types";

export default function Header({ toggleSidebar }) {
  const navigate = useNavigate();

  // Função de logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login"); // Redireciona para a página de login após o logout
  };

  // Itens do menu
  const items = [
    {
      label: "Menu",
      icon: "pi pi-bars", // Alterei o ícone para o ícone de barras
      command: () => toggleSidebar(), // Aqui, a função precisa ser chamada
    },
    { label: "Home", icon: "pi pi-home", command: () => navigate("/home") },
    { label: "Sobre", icon: "pi pi-info", command: () => navigate("/about") },
    {
      label: "Contato",
      icon: "pi pi-envelope",
      command: () => navigate("/contato"),
    },
    {
      label: "Sair",
      icon: "pi pi-sign-out",
      command: handleLogout,
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

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired, // Agora especificamos que "toggleSidebar" é uma função
};
