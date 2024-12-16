// src/Rota.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { useState, useEffect } from "react";
import Aut from "./Aut.jsx";

import Layout from "../components/layout/Layout.jsx";
import LayoutOp from "../components/layout/LayoutOp.jsx";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import Login from "../pages/Login.jsx";
import CadastroPessoas from "../components/CadastroPessoas/CadastroPessoas.jsx";
import CadastroProdutos from "../components/CadastroProdutos/CadastroProdutos.jsx";
import RegistroNotasFiscais from "../components/CadastroNFE/RegistroNotasFiscais.jsx";
import Unauthorized from "../pages/Unauthorized.jsx";
import Registro from "../components/Operacional/Registro/Registro.jsx";
import UserOP from "../pages/user.jsx";
import PainelRegistro from "../components/Users/PainelDeRegistros/PainelRegistro.jsx";
import PainelFinanceiro from "../components/Users/PainelFinanceiro/PainelFinanceiro.jsx";
import NotUse from "../pages/v2.jsx";
import UserRegistrationForm from "../components/CadastroPessoas/UserRegistrationForm.tsx";
import TableMTR from "../components/CadastroMTR/TableMTR.jsx";

const Rota = () => {
  const [user, setUser] = useState(false);

  const getUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      const { user: currentUser } = session;
      const { data: userData, error } = await supabase
        .from("base_user")
        .select("role")
        .eq("user_id", currentUser.id)
        .single();

      if (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        return;
      }

      setUser({ role: userData.role });
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  console.log("ROTA: nivel de usuario", user.role);

  return (
    <Routes>
      {/* Rota de Login */}
      <Route path="/login" element={<Login />} />
      <Route path="/Aut" element={<Aut />} />

      {/* Rotas protegidas para Admin */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute userRole={user.role} requiredRole="Admin">
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="home" element={<Home />} />
        <Route path="UserRegistrationForm" element={<UserRegistrationForm/>} />
        <Route path="cadastropessoas" element={<CadastroPessoas />} />
        <Route path="registro" element={<Registro />} />
        <Route path="cadastroprodutos" element={<CadastroProdutos />} />
        <Route path="nfe" element={<RegistroNotasFiscais />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="user" element={<UserOP />} />
        <Route path="user/painel" element={<PainelRegistro />} />
        <Route path="user/financeiro" element={<PainelFinanceiro />} />
        <Route path="mtr" element={<TableMTR />} />
      </Route>

      {/* Rotas protegidas para Operacional */}
      <Route
        path="/op/*"
        element={
          <ProtectedRoute userRole={user.role} requiredRole="COLLABORATOR">
            <LayoutOp />
          </ProtectedRoute>
        }
      >
        <Route path="home" element={<UserOP />} />
        <Route path="painel" element={<PainelRegistro />} />
        <Route path="financeiro" element={<PainelFinanceiro />} />
        <Route path="user" element={<UserOP />} />
      </Route>

      {/* Página de acesso negado */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/NotUse" element={<NotUse />} />
      {/* Redirecionamento para home em caso de rota não encontrada */}
      <Route path="*" element={<Navigate to={user.role === "Admin" ? "/admin/home" : "/op/home"} replace />} />
    </Routes>
  );
};

export default Rota;
