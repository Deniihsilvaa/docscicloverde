import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import 'primereact/resources/themes/lara-light-blue/theme.css';  // Tema moderno
import 'primereact/resources/primereact.min.css';               // Estilos principais
import 'primeicons/primeicons.css';                             // Ícones
import 'primeflex/primeflex.css';                               // Utilitários CSS para responsividade


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
