import type { Rol } from "../api/users/users.types";
import { adminPath, clientPath, loginPath, unauthorizedPath } from "./const";
import { removeUser } from "./localStorage";
import { navigate } from "./navigate";

export const logout = () => {
  removeUser();
  navigate(loginPath);
};

export const redirectByRole = (userRole: Rol) => {
  if (userRole === "ADMIN") {
    navigate(adminPath);
  } else if (userRole === "USUARIO") {
    navigate(clientPath);
  } else {
    navigate(unauthorizedPath);
  }
};
