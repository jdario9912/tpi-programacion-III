export type Rol = "ADMIN" | "USUARIO";

export interface User {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  celular: string;
  rol: Rol;
}
