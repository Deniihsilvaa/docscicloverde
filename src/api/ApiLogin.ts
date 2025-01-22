export const logarUser = async (userArray) => {
  try {
    const response = await fetch("https://newback-end-cicloverde.onrender.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userArray),
    });

    if (!response.ok) {
      throw new Error("Não foi possível carregar os dados dos colaboradores.");
    } else {
      const data = await response.json();
      
      // Salvar o token no localStorage
      localStorage.setItem("authToken", data.token);
      
      // Salvar o objeto user no localStorage como string JSON
      localStorage.setItem("authUser", JSON.stringify(data.user));

      console.log("Retorno do backEnd: response", data);


    }
    return response;
  } catch (error) {
    console.error("Erro inesperado ao carregar colaboradores:", error);
    return []; // Retorna um array vazio em caso de falha
  }
};

const token = localStorage.getItem("authToken")
export const fetchCollaborators = async () => {

  try {
    const response = await fetch('https://newback-end-cicloverde.onrender.com/auth/user', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
// Authorization: `Bearer ${token}`,
    if (!response.ok) {
      throw new Error('Erro ao carregar colaboradores');
    }

    const data = await response.json();
    console.log("Apilogin:Data", data)
    return data.collaborators;
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



