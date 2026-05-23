import { checkAuhtUser, logout } from "./utils/auth";
import { adminPath, clientPath } from "./utils/const";

const buttonLogout = document.getElementById(
  "logoutButton",
) as HTMLButtonElement;
buttonLogout?.addEventListener("click", () => {
  logout();
});

checkAuhtUser(adminPath, clientPath);
