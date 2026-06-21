const CATEGORIAS = "categorias";
const PRODUCTOS = "productos";
const PEDIDOS = "pedidos";
const USUARIOS = "usuarios";

export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
  },
  CATEGORIES: {
    BASE: `/${CATEGORIAS}`,
    BY_ID: (id: number) => `/${CATEGORIAS}/${id}`,
  },
  PRODUCTS: {
    BASE: `/${PRODUCTOS}`,
    BY_ID: (id: number) => `/${PRODUCTOS}/${id}`,
    BY_CATEGORY_ID: (id: number) => `/${PRODUCTOS}/categoria/${id}`,
  },
  ORDERS: {
    BASE: `/${PEDIDOS}`,
    BY_ID: (id: number) => `/${PEDIDOS}/${id}`,
    BY_USER_ID: (id: number) => `/${PEDIDOS}/usuario/${id}`,
  },
  USERS: {
    BASE: `/${USUARIOS}`,
    BY_ID: (id: number) => `/${USUARIOS}/${id}`,
  },
} as const;
