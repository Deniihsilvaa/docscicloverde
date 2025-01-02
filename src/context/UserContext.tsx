import { createContext } from "react";

// Definindo o tipo do usuário
export interface User {
  role: string | null; // Pode ser string ou null
  user_id: string | null; // Pode ser string ou null
}

export interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
// Criando o contexto com um valor padrão undefined
export const UserContext = createContext<UserContextType | undefined>(undefined);
