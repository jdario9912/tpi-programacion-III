import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";
import type { User } from "../users/users.types";
import type { AuthLoginDto } from "./auth.types";

export const authApi = {
  login: (data: AuthLoginDto) =>
    apiClient.post<User>(ENDPOINTS.AUTH.LOGIN, data),
};
