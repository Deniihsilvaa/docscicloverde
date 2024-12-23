import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { supabase } from "../../../services/supabase";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export default function Header({ toggleSidebar }) {
  const navigate = useNavigate();
  const [nameUser, setNameUser] = useState("");
  const [emailUser, setEmailUser] = useState("");

  // Função de logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  // Nome e email do usuário
  const infoUser = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Erro ao obter sessão:", error);
      return;
    }

    const session = data.session;
    if (session) {
      const { user: currentUser } = session;
      const { data: userData, error: userError } = await supabase
        .from("viewbase_user")
        .select("first_name, email")
        .eq("user_id", currentUser.id)
        .single();

      if (userError) {
        console.error("Erro ao buscar dados do usuário:", userError);
        return;
      }

      setNameUser(userData.first_name);
      setEmailUser(userData.email);
    }
  };

  useEffect(() => {
    infoUser();
  }, []);

  // Itens do menu
  const items = [
    {
      label: "Menu",
      icon: "pi pi-bars",
      command: () => toggleSidebar(),
    },
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => navigate("/admin/home"),
    },
    {
      label: "Sobre",
      icon: "pi pi-info",
      command: () => navigate("/admin/about"),
    },
    {
      label: "Contato",
      icon: "pi pi-envelope",
      command: () => navigate("/admin/contato"),
    },
  ];

  return (
    <Menubar
      model={items}
      className="p-shadow-2"
      menuIcon={
        <Button
          className="p-button-text p-button-sm align-items-center"
          onClick={toggleSidebar}
        >
          <i className="mr-2 pi pi-bars" />
          <span>Menu</span>
        </Button>
      }
      start={
        <div className="flex align-items-center">
          <img src={logo} alt="Logo" className="iconLogo" />
        </div>
      }
      end={
        <div className="flex align-items-center">
          <h2 className="ml-2 text-xl font-bold text-blue-600">Ciclo Verde</h2>
          <p className="ml-4 text-sm text-gray-400">
            {nameUser} {emailUser}
          </p>

          <Button
            className="flex ml-4 p-button-text p-button-sm align-items-center"
            onClick={handleLogout}
          >
            <i className="mr-2 pi pi-sign-out" />
            <span>Sair</span>
          </Button>
        </div>
      }
    />
  );
}

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};
