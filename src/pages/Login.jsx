import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logarUser } from "../api/ApiLogin";
import { useToast } from "../components/Toast/ToastContext";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from "primereact/button";
import { UserCircle2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (error) {
      showToast({
        severity: "error",
        summary: "Erro",
        detail: error,
        life: 5000,
      });
    } else if (success) {
      showToast({
        severity: "success",
        summary: success,
        detail: "Seja bem vindo!",
        life: 5000,
      });
    }
  }, [error, success, showToast]);

  const handleNavigate = () => {
    navigate("/v2");
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (!email || !password) {
        setLoading(false);
        setError("Preencha todos os campos.");
        return;
      }
      const userArry = { email, password };
      await logarUser(userArry);
      setSuccess("Login efetuado com sucesso!");
      handleNavigate();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4 login-container">
      <div className="w-full max-w-md p-3 glass-card rounded-xl">
      <div className="flex flex-col items-center mb-6">
          <div className="p-3 mb-4 bg-white rounded-full">
            <UserCircle2 size={40} className="text-blue-600" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-black">Login - Ciclo Verde</h1>
        </div>
        <div className="flex flex-col space-y-2">
          <form
          className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            {error && <p className="mb-4 text-center text-red-500">{error}</p>}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                 <i className="pi pi-envelope" />
                Email
              </label>
              <InputText
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-inputtext"
                required
              />
            </div>
            <div className="relative mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <div className="flex flex-col space-y-2">
                <Password
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  toggleMask
                  className="w-full"
                  inputClassName="w-full"
                  placeholder="Enter your password"
                  required

                />
              </div>
            </div>
            <Button
              type="submit"
              label={loading ? "Carregando..." : "Entrar"}
              className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              icon={loading ? "pi pi-spin pi-spinner" : undefined}
              loading={loading}
            />
          </form>
          </div>
      </div>
    </div>
  );
};

export default Login;
