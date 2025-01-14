// src/App.jsx
import { BrowserRouter as Router } from "react-router-dom";
import Rota from "./hooks/Rota";
import { AuthProvider } from "./hooks/AuthContext"; 
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
const App = () => {
  return (
    <Router>
      <AuthProvider>  {/* Coloque o AuthProvider aqui */}
        <Rota />
      </AuthProvider>
    </Router>
  );
};

export default App;
