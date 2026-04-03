import type { IUser, IUserStoraged } from "../types/IUserStorage";
import type { Rol } from "../types/Rol";
import type { IUserSession } from "../types/IUserSession";

const userSessionKey = "userData";

export const saveUser = (user: IUserSession) => {
  const parseUser = JSON.stringify(user);
  localStorage.setItem(userSessionKey, parseUser);
};
export const getUSer = () => {
  return localStorage.getItem(userSessionKey);
};
export const removeUser = () => {
  localStorage.removeItem(userSessionKey);
};

const usersKey = "users";

const getUsersFromLocaleStorage = async (): Promise<IUserStoraged[]> => {
  const raw = localStorage.getItem(usersKey);
  return raw ? JSON.parse(raw) : [];
};

const ROLES: Rol[] = ["client", "admin"];

const getRandomRol = (): Rol => ROLES[Math.floor(Math.random() * ROLES.length)];

export const addUserToStorage = async (user: IUser) => {
  const usersSaved: IUserStoraged[] = await getUsersFromLocaleStorage();
  const role = getRandomRol();
  const usersParsedToSave = JSON.stringify([...usersSaved, { ...user, role }]);
  localStorage.setItem(usersKey, usersParsedToSave);

  return {
    email: user.email,
    role,
  };
};

export const getUsers = async () => await getUsersFromLocaleStorage();
