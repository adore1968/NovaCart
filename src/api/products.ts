import axios, { type AxiosResponse } from "axios";
import type { Product } from "../types/productsTypes";
const BASE_URL = "https://6aa861fd9b08676cd32c0283.mockapi.io/products";

export const getProductsRequest = (
  search: string = "",
): Promise<AxiosResponse<Product[]>> =>
  axios.get(`${BASE_URL}?name=${encodeURIComponent(search)}`);

export const getProductRequest = (
  id: string,
): Promise<AxiosResponse<Product>> => axios.get(`${BASE_URL}/${id}`);

export const createProductRequest = (product) => axios.post(BASE_URL, product);

export const editProductRequest = (id, product) =>
  axios.put(`${BASE_URL}/${id}`, product);

export const deleteProductRequest = (id) => axios.delete(`${BASE_URL}/${id}`);
