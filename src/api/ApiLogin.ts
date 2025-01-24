// src/api/ApiLogin.ts
export const logarUser = async (userArray: any) => {
  try {
    const response = await fetch("https://newback-end-cicloverde.onrender.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userArray),
    });

    if (!response.ok) {
      throw new Error("Não foi possível carregar os dados dos colaboradores.");
    } else {
      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("authUser", JSON.stringify(data.user));
      return data; 
    }
  } catch (error) {
    console.error("Erro ao logar:", error);
    throw error; // Lançar o erro para tratamento posterior
  }
};

export const fetchCollaborators = async (token: string) => {

  try {
    if (!token) {
      return null;
    }
    const response = await fetch('https://newback-end-cicloverde.onrender.com/auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Erro ao carregar colaboradores');
    }
    const data = await response.json();
    console.log("Retorno da api", data);
    return data;
  } catch (err) {
    console.error('Erro ao buscar colaboradores:', err);
    throw new Error('Não foi possível carregar os dados dos colaboradores');
  }
};
export const logoutUser = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("Token não encontrado. O usuário não está autenticado.");
  }

  const response = await fetch("https://newback-end-cicloverde.onrender.com/auth/logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao fazer logout");
  }

  localStorage.removeItem("authToken");
  localStorage.removeItem("authUser");

  return response;
};
