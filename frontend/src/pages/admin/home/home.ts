import type { IUserSession } from "../../../types/IUserSession";
import { checkRole } from "../../../utils/auth";
import { clientPath, loginPath } from "../../../utils/const";
import { getUSer } from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";

const user = getUSer();

if (!user) {
  navigate(loginPath);
} else {
  const parseUser: IUserSession = JSON.parse(user);
  checkRole(parseUser.role, "admin", clientPath);
}
