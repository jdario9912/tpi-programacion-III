import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";
import type {
  Product,
  CreateProductDto,
  UpdateProductDto,
} from "./products.types";

export const productsApi = {
  getAll: (searchParam?: string) =>
    apiClient.get<Product[]>(
      `${ENDPOINTS.PRODUCTS.BASE}?param=${encodeURIComponent(searchParam ? searchParam : "")}`,
    ),

  getById: (id: number) => apiClient.get<Product>(ENDPOINTS.PRODUCTS.BY_ID(id)),

  create: (data: CreateProductDto) =>
    apiClient.post<Product>(ENDPOINTS.PRODUCTS.BASE, data),

  update: (id: number, data: UpdateProductDto) =>
    apiClient.put<Product>(ENDPOINTS.PRODUCTS.BY_ID(id), data),

  delete: (id: number) => apiClient.delete<void>(ENDPOINTS.PRODUCTS.BY_ID(id)),

  getByCategoryId: (id: number) =>
    apiClient.get<Product[]>(ENDPOINTS.PRODUCTS.BY_CATEGORY_ID(id)),
};
