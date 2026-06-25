export interface Category {
  id: number;
  nombre: string;
  descripcion?: string;
}

export type CreateCategoryDto = Omit<Category, "id">;
export type UpdateCategoryDto = Partial<CreateCategoryDto>;
