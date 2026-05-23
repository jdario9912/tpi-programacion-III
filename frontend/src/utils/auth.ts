import type { IUserSession } from "../types/IUserSession";
import type { Rol } from "../types/Rol";
import { adminPath, clientPath, loginPath } from "./const";
import { getUSer, removeUser } from "./localStorage";
import { navigate } from "./navigate";

export const checkAuhtUser = (
  adminRedirection: string,
  clientRedirection: string,
) => {
  const user = getUSer();

  if (!user) {
    navigate(loginPath);
    return;
  } else {
    const parseUser: IUserSession = JSON.parse(user);
    if (!parseUser.loggedIn)
      if (parseUser.role === "admin") navigate(adminRedirection);
      else navigate(clientRedirection);
  }
};

export const logout = () => {
  removeUser();
  navigate(loginPath);
};

export const roleBasedNavigation = (role: Rol) => {
  if (role === "admin") navigate(adminPath);
  else if (role === "client") navigate(clientPath);
};

export const checkRole = (
  userRole: Rol,
  pageRole: Rol,
  redirectionPath: string,
) => {
  if (userRole !== pageRole) navigate(redirectionPath);
};
