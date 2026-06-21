import { ordersApi } from "../api/orders/orders.api";
import type {
  Order,
  CreateOrderDto,
  UpdateOrderDto,
} from "../api/orders/orders.types";

export const ordersService = {
  async getAll(): Promise<Order[]> {
    return await ordersApi.getAll();
  },

  async getById(id: number): Promise<Order> {
    return await ordersApi.getById(id);
  },

  async create(data: CreateOrderDto): Promise<Order> {
    return await ordersApi.create(data);
  },

  async update(id: number, data: UpdateOrderDto): Promise<Order> {
    return await ordersApi.update(id, data);
  },

  async delete(id: number): Promise<Order> {
    return await ordersApi.delete(id);
  },

  async getByUserId(id: number): Promise<Order[]> {
    return await ordersApi.getByUserId(id);
  },
};
