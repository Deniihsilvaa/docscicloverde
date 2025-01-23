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