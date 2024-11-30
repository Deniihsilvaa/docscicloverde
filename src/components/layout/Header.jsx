import { Menubar } from "primereact/menubar";
import { supabase } from "../../services/supabase";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login"); // Redireciona para a página de login após o logout
  };

  const items = [
    { label: "Home", icon: "pi pi-home", command: () => navigate("/") },
    { label: "Sobre", icon: "pi pi-info", command: () => navigate("/sobre") },
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
        <div className="flex align-content-center">
          <img src={logo} className="iconLogo"></img>
          <h2 className="text-xl font-bold text-blue-600">Ciclo Verde</h2>
        </div>
      }
    
    />
  );
};

export default Header;
