import React, { useState, useEffect } from "react";
import { UserContext, User } from "./UserContext";
import { supabase } from "../services/supabase"; // Certifique-se de importar o Supabase corretamente
import PropTypes from "prop-types";

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const { user: currentUser } = session;
        const { data: userData, error } = await supabase
          .from("base_user")
          .select("role")
          .eq("user_id", currentUser.id);

        if (error) {
          console.error("Erro ao buscar dados do usuário:", error);
          return;
        }

        setUser({ role: userData[0].role });
      }
    };

    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
// Validando a propriedade children (se é um nó React)
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
