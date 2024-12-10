import { Card } from "primereact/card";
import { supabase } from "../services/supabase";
import { useState, useEffect } from "react";

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
    setLoading(false);
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="card">
      <Card title="Pagina incial">
        <p className="m-0">
          {loading ? (
            "Carregando..."
          ) : (
            <>
              Bem vindo, <b>{user?.email}</b>
              
            </>
          )}
        </p>
      </Card>
    </div>
  );
};

export default Home;
