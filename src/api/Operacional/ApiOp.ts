export const fetchCollaborators = async (searchTerm: string) => {

  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return null;
    }
    const response = await fetch(`https://newback-end-cicloverde.onrender.com/admin/colab?id=${searchTerm}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Erro ao carregar lista de colaboradores');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Erro ao buscar lista de colaboradores:', err);
    throw new Error('Não foi possível carregar a lista de dados dos colaboradores');
  }
};


export const fetchUser = async () => {
  const userID = localStorage.getItem("authUser");
  const token = localStorage.getItem('authToken');
  const user = userID ? JSON.parse(userID).id : null;

  try {

    if (!token || !user) {
      console.error("Token ou user_id inválido:", { token,user });
      return null;
    }
    const response = await fetch(`https://newback-end-cicloverde.onrender.com/op/colab/user?idUser=${user}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Erro ao carregar  dados do colaborador');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Erro ao buscar dados do colaborador:', err);
    throw new Error('Não foi possível carregar os dados do colaborador');
  }
};