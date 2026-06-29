import type { Category } from "../categories/categories.types";

export interface Product {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  stock: number;
  imagen: string;
  disponible: boolean;
  categoria: Category;
}

export type CreateProductDto = Omit<Product, "id" | "categoria"> & {
  idCategoria: string;
};
export type UpdateProductDto = Partial<CreateProductDto>;
