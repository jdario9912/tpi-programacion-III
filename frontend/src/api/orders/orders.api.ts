import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";
import type { Order, CreateOrderDto, UpdateOrderDto } from "./orders.types";

export const ordersApi = {
  getAll: () => apiClient.get<Order[]>(ENDPOINTS.ORDERS.BASE),

  getById: (id: number) => apiClient.get<Order>(ENDPOINTS.ORDERS.BY_ID(id)),

  create: (data: CreateOrderDto) =>
    apiClient.post<Order>(ENDPOINTS.ORDERS.BASE, data),

  update: (id: number, data: UpdateOrderDto) =>
    apiClient.put<Order>(ENDPOINTS.ORDERS.BY_ID(id), data),

  delete: (id: number) => apiClient.delete<Order>(ENDPOINTS.ORDERS.BY_ID(id)),

  getByUserId: (id: number) =>
    apiClient.get<Order[]>(ENDPOINTS.ORDERS.BY_USER_ID(id)),
};
