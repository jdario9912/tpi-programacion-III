import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";
import type { User, UserRegisterDto } from "./users.types";

export const userApi = {
  register: (user: UserRegisterDto) =>
    apiClient.post<User>(ENDPOINTS.USERS.BASE, user),
};
