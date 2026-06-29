import { userApi } from "../api/users/users.api";
import type { User, UserRegisterDto } from "../api/users/users.types";

export const userService = {
  async register(dto: UserRegisterDto): Promise<User> {
    return userApi.register(dto);
  },
};
