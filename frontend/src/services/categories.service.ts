import { categoryApi } from "../api/categories/categories.api";
import type {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "../api/categories/categories.types";

export const categoriesService = {
  async getAll(): Promise<Category[]> {
    return await categoryApi.getAll();
  },

  async getById(id: number): Promise<Category> {
    return await categoryApi.getById(id);
  },

  async create(data: CreateCategoryDto): Promise<Category> {
    return await categoryApi.create(data);
  },

  async update(id: number, data: UpdateCategoryDto): Promise<Category> {
    return await categoryApi.update(id, data);
  },

  async delete(id: number): Promise<void> {
    return await categoryApi.delete(id);
  },
};
