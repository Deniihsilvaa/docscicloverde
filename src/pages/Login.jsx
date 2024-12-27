import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../context/types";
import {useToast} from "../components/Toast/ToastContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast(); // Usa o contexto do Toast
  
  useEffect(() => {
    if (error) {
      showToast({
        severity: "error",
        summary: "Erro",
        detail: error,
        life: 5000,
      })
    }else if(success){
      showToast({
        severity: "success",
        summary: success,
        detail: "Seja bem vindo!",
        life: 5000,
      })
    }
  }, [error,success,showToast]);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <div className="relative z-10 max-w-md p-8 bg-blue-800 rounded-lg shadow-lg bg-opacity-80">
        <form
          className="p-6 bg-white rounded shadow-md"
          onSubmit={(e) =>
            handleLogin(e, email, password, setError,setSuccess, navigate, setLoading)
          } // Passa argumentos
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
            className={`w-full flex items-center justify-center gap-2 py-2 px-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loader"></span>
                <span>Carregando...</span>
              </>
            ) : (
              "Entrar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
