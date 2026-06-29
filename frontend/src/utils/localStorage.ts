import type { User } from "../api/users/users.types";

const userSessionKey = "userData";

export const saveUser = (user: User) => {
  const parseUser = JSON.stringify(user);
  localStorage.setItem(userSessionKey, parseUser);
};

export const getUSer = () => {
  return localStorage.getItem(userSessionKey);
};

export const removeUser = () => {
  localStorage.removeItem(userSessionKey);
};
