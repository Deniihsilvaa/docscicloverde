import { useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate("/home"); // Redireciona após login bem-sucedido
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form className="p-6 bg-white rounded shadow-md" onSubmit={handleLogin}>
        <h1 className="mb-4 text-2xl font-bold">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-inputtext"
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
  );
};

export default Login;
