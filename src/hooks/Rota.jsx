import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

import Layout from "../components/layout/Layout.jsx";
import LayoutOp from "../components/layout/LayoutOp.jsx";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import Login from "../pages/Login.jsx";
import CadastroProdutos from "../components/CadastroProdutos/CadastroProdutos.jsx";
import RegistroNotasFiscais from "../components/CadastroNFE/RegistroNotasFiscais.jsx";
import DashBoardRegistroColab from "../components/Operacional/Registro/DashBoardRegistroColab.tsx";
import UserOP from "../pages/leader/user.jsx";
import PainelRegistro from "../components/Users/PainelDeRegistros/PainelRegistro.tsx";
import PainelFinanceiro from "../components/Users/PainelFinanceiro/PainelFinanceiro.jsx";
import NotUse from "../pages/VerificationUser.tsx";

import VerificationUser from '../pages/VerificationUser.tsx';
import UserRegistrationForm from "../components/CadastroPessoas/UserRegistrationForm.tsx";
import TableMTR from "../components/CadastroMTR/TableMTR.tsx";
import DashBoardRequest from '../pages/DashBoardRequest.tsx';
import ExtratoPGSMensal from "../components/Users/PainelFinanceiro/Pages/ExtratoPGSMensal.tsx";
import ExtratoPGAMensal from "../components/Users/PainelFinanceiro/Pages/ExtratoPGAMensal.tsx";
import ExtratoFolhaPonto from "../components/Users/PainelFinanceiro/Pages/ExtratoFolhaPonto.tsx";
import TableInfo from "../pages/Request/TableInfo.tsx";
import PaymentRegistration from "../pages/leaderADM/PaymentRegistration.tsx";

// Animation variants
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

// Animated wrapper component
const AnimatedPage = ({ children }) => (
  <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
    {children}
  </motion.div>
);

AnimatedPage.propTypes = {
  children: PropTypes.node.isRequired,
};

const Rota = () => {
  const { user } = useAuth();
  const location = useLocation();
  console.log(`Rota:${location.pathname} ROLE:`, user?.role)
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Rota de Login */}
        <Route
          path="/login"
          element={
            <Login />
          }
        />
        <Route
          path="/v2"
          element={
            <VerificationUser />
          }
        />

        {/* Rotas protegidas para Admin */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute userRole={user?.role} requiredRole="Admin">
              <AnimatedPage>
                <Layout />
              </AnimatedPage>
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="UserRegistrationForm" element={<UserRegistrationForm />} />
          <Route path="registro" element={<DashBoardRegistroColab />} />
          <Route path="cadastroprodutos" element={<CadastroProdutos />} />
          <Route path="nfe" element={<RegistroNotasFiscais />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="user" element={<UserOP />} />
          <Route path="user/painel" element={<PainelRegistro />} />
          <Route path="user/financeiro" element={<PainelFinanceiro />} />
          <Route path="mtr" element={<TableMTR />} />
          <Route path="request" element={<DashBoardRequest />} />
          <Route path="request/infoproducts" element={<TableInfo />} />
          <Route path="registro/payment" element={<PaymentRegistration />} />
        </Route>

        {/* Rotas protegidas para Operacional */}
        <Route
          path="/op/*"
          element={
            <ProtectedRoute userRole={user?.role} requiredRole="Colab">
              <AnimatedPage>
                <LayoutOp />
              </AnimatedPage>
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<UserOP />} />
          <Route path="painel" element={<PainelRegistro />} />
          <Route path="financeiro" element={<PainelFinanceiro />} />
          <Route path="extrato" element={<ExtratoPGSMensal />} />
          <Route path="extrato/adiantamento" element={<ExtratoPGAMensal />} />
          <Route path="extrato/folha" element={<ExtratoFolhaPonto />} />
          <Route path="user" element={<UserOP />} />
        </Route>

        {/* Outras rotas */}
          <Route
            path="/NotUse"
            element={
              <AnimatedPage>
                <NotUse />
              </AnimatedPage>
            }
          />
        {/* TODO:Rotas para v2 */}


        <Route
          path="/"
          element={
            <AnimatedPage>
              {user ? (
                user.role === "Admin" ? (
                  <Navigate to="/admin/home" />
                ) : (
                  <Navigate to="/op/home" />
                )
              ) : (
                <div className="flex items-center justify-center min-h-screen">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              )}
            </AnimatedPage>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default Rota;
