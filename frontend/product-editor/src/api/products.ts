import axios from "axios";
import { Product } from "../types/products";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const getProducts = async () => {
  return (await api.get('/products', {})).data as Product[]
}

export const postProduct = async (product : Product) => {
  await api.post('/products', product)
}
