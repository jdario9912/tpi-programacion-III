import type { CreateProductDto, Product } from "../api/products/products.types";
import { productsApi } from "../api/products/products.api";

export const productsService = {
  async getAll(): Promise<Product[]> {
    return await productsApi.getAll();
  },

  async getById(id: number): Promise<Product> {
    return await productsApi.getById(id);
  },

  async create(data: CreateProductDto): Promise<Product> {
    return await productsApi.create(data);
  },

  async update(id: number, data: CreateProductDto): Promise<Product> {
    return await productsApi.update(id, data);
  },

  async delete(id: number): Promise<void> {
    return await productsApi.delete(id);
  },

  async getByCategoryId(id: number): Promise<Product> {
    return await productsApi.getByCategoryId(id);
  },
};
