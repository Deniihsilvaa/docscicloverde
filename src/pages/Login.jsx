import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../context/types";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Mostra um alerta quando há um erro
  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <div className="relative z-10 max-w-md p-8 bg-blue-800 rounded-lg shadow-lg bg-opacity-80">
        <form
          className="p-6 bg-white rounded shadow-md"
          onSubmit={(e) => handleLogin(e, email, password, setError, navigate)} // Passa argumentos
        >
          <h1 className="mb-4 text-2xl font-bold">Login</h1>
          {/* Mensagem de erro exibida no formulário */}
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-inputtext"
              aria-label="Email"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-inputtext"
              aria-label="Senha"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer p-button p-button-primary"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
