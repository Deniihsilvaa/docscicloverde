import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import "primereact/resources/themes/lara-light-blue/theme.css"; // Tema moderno
import "primereact/resources/primereact.min.css"; // Estilos principais
import "primeicons/primeicons.css"; // Ícones
import "primeflex/primeflex.css"; // Utilitários CSS para responsividade
import {ToastProvider} from "./components/Toast/ToastContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>
);
