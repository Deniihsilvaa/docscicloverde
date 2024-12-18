// src/App.jsx
import { BrowserRouter as Router } from "react-router-dom";
import Rota from "./hooks/Rota";
import { AuthProvider } from "./hooks/AuthContext";  // Certifique-se de importar o AuthProvider corretamente

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
