import axios from "axios";

export const getProductsRequest = (search = "") =>
  axios.get(
    `https://690cdcfca6d92d83e84fba06.mockapi.io/productos?name=${encodeURIComponent(search)}`,
  );

export const getProductRequest = (id) =>
  axios.get(`https://690cdcfca6d92d83e84fba06.mockapi.io/productos/${id}`);

export const createProductRequest = (product) =>
  axios.post(`https://690cdcfca6d92d83e84fba06.mockapi.io/productos`, product);

export const editProductRequest = (id, product) =>
  axios.put(
    `https://690cdcfca6d92d83e84fba06.mockapi.io/productos/${id}`,
    product,
  );

export const deleteProductRequest = (id) =>
  axios.delete(`https://690cdcfca6d92d83e84fba06.mockapi.io/productos/${id}`);
