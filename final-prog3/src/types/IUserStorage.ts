import type { Rol } from "./Rol";

export interface IUser {
  email: string;
  password: string;
}

export interface IUserStoraged extends IUser {
  role: Rol;
}
