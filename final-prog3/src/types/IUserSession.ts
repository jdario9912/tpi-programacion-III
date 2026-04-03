import type { Rol } from "./Rol";

export interface IUserSession {
  email: string;
  loggedIn: boolean;
  role: Rol;
}
