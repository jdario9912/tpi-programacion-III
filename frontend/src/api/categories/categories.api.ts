import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";
import type {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "./categories.types";

export const categoryApi = {
  getAll: () => apiClient.get<Category[]>(ENDPOINTS.CATEGORIES.BASE),

  getById: (id: number) =>
    apiClient.get<Category>(ENDPOINTS.CATEGORIES.BY_ID(id)),

  create: (data: CreateCategoryDto) =>
    apiClient.post<Category>(ENDPOINTS.CATEGORIES.BASE, data),

  update: (id: number, data: UpdateCategoryDto) =>
    apiClient.put<Category>(ENDPOINTS.CATEGORIES.BY_ID(id), data),

  delete: (id: number) =>
    apiClient.delete<void>(ENDPOINTS.CATEGORIES.BY_ID(id)),
};
