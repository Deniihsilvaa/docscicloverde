import { BrowserRouter as Router } from "react-router-dom";
import Rota from "./hooks/Rota";
import UserProvider from "./context/UserProvider";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Rota />
      </Router>
    </UserProvider>
  );
};

export default App;
  