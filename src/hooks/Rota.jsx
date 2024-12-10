import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext"; // Importar o contexto
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
import Registro from "../components/Operacional/Registro/Registro.jsx";

const Rota = () => {
  const { user } = useContext(UserContext); // Consome o contexto

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* Rotas públicas (Acessíveis para todos os usuários) */}
      <Route path="/" element={<Layout userLevel={user} />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* Rotas protegidas para Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute userRole={user} requiredRole="admin">
            <Layout userLevel={user} />
          </ProtectedRoute>
        }
      >
        <Route path="cadastropessoas" element={<CadastroPessoas />} />
        <Route path="registro" element={<Registro />} />
        <Route path="cadastroprodutos" element={<CadastroProdutos />} />
        <Route path="nfe" element={<RegistroNotasFiscais />} />
      </Route>

      {/* Página de acesso negado */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Redirecionamento para home em caso de rota não encontrada */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Rota;
