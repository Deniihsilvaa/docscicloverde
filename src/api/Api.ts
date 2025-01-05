import axios from "axios";
export const viewTableRequestProduct = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/request-products"
  );
  return response.data
};

export const deleteTableRequestProduct = async (id: number) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/request-products/d/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Erro ao deletar item:", error);
    return false;
  }
};
export const listProdutc = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/products/list"
  );
  return response.data
};