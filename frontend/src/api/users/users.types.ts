export type Rol = "ADMIN" | "USUARIO";

export interface User {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  celular?: string;
  rol: Rol;
}

export type UserRegisterDto = Omit<User, "id" | "rol"> & { password: string };
