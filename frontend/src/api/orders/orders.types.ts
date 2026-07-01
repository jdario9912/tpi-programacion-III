import type { Product } from "../products/products.types";

export type Estado = {
  PENDIENTE: "PENDIENTE";
};

export type FormaPago = {
  EFECTIVO: "EFECTIVO";
  TARJETA: "TARJETA";
  TRASNFERENCIA: "TRASNFERENCIA";
};

type Details = {
  id: number;
  cantidad: number;
  producto: Product;
};

export interface Order {
  id: number;
  fecha: Date;
  estado: Estado;
  total: number;
  formaPago: FormaPago;
  detalles: Details[];
}

export type CreateOrderDto = {
  estado: Estado;
  formaPago: FormaPago;
  idUsuario: number;
  detallePedidos: {
    idProducto: number;
    cantidad: number;
  }[];
};

export type UpdateOrderDto = {
  estado?: Estado;
  formaPago?: FormaPago;
};
