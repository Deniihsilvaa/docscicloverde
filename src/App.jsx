// src/App.jsx
import { BrowserRouter as Router } from "react-router-dom";
import Rota from "./hooks/Rota";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { AuthProvider } from "./hooks/AuthContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Rota />
      </AuthProvider>
    </Router>
  );
};

export default App;
