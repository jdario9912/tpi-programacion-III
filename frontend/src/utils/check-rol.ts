import type { Rol } from "../api/users/users.types";
import { navigate } from "./navigate";

export const checkRole = (userRole: Rol, pageRole: Rol) => {
  if (userRole !== pageRole) navigate("/auth/unauthorized.html"); // o navigate(-1)
};
