import { authApi } from "../api/auth/auth.api";
import type { User } from "../api/users/users.types";

export const authService = {
  async login(email: string, password: string): Promise<User> {
    return await authApi.login({ email, password });
  },
};
