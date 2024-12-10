import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../components/layout/Layout.jsx";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import Login from "../pages/Login.jsx";
import CadastroPessoas from "../components/CadastroPessoas/CadastroPessoas.jsx";
import CadastroProdutos from "../components/CadastroProdutos/CadastroProdutos.jsx";
import RegistroNotasFiscais from "../components/CadastroNFE/RegistroNotasFiscais.jsx";
import Unauthorized from "../pages/Unauthorized.jsx";
import { supabase } from "../services/supabase.js";
import Registro from "../components/Operacional/Registro/Registro.jsx";

const Rota = () => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      // Obtém a sessão para recuperar o ID do usuário
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const { user: currentUser } = session;
        // Busca na tabela "base_users" com base no ID do usuário autenticado
        const { data: userData, error } = await supabase
          .from("base_user")
          .select("role") // Ajuste para os campos necessários
          .eq("user_id", currentUser.id) // Use o ID da sessão

        if (error) {
          console.error("Erro ao buscar dados do usuário:", error);
          return;
        }

        // Define o usuário no estado
        setUser(userData[0].role);
      } else {
        console.log("Usuário não autenticado");
        setUser(null);
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout userLevel={user}/>
          </ProtectedRoute>
        }
      >
        {/* Rotas acessíveis para todos os níveis permitidos */}
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      <Route
        path="/"
        element={
          <ProtectedRoute>
             <Layout userLevel={user}/>{/* Layout com permissões de ADMIN */}
          </ProtectedRoute>
        }
      >
        <Route path="cadastropessoas" element={<CadastroPessoas />} />
        <Route path="registro" element={<Registro />} />
        <Route path="cadastroprodutos" element={<CadastroProdutos />} />
        <Route path="nfe" element={<RegistroNotasFiscais />} />
        <Route path="home" element={<Home />} />
      </Route>

      {/* Rota de acesso negado */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Fallback para rotas não reconhecidas */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Rota;
