import type { IUserSession } from "../../../types/IUserSession";
import { roleBasedNavigation } from "../../../utils/auth";
import { getUsers, saveUser } from "../../../utils/localStorage";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;
const alert = document.getElementById("alert") as HTMLSpanElement;

form?.addEventListener("submit", async (e: SubmitEvent) => {
  e.preventDefault();
  const usersStoraged = await getUsers();
  const valueEmail = inputEmail.value;
  const valuePassword = inputPassword.value;

  const userFounded = usersStoraged.filter(
    (u) => u.email == valueEmail && u.password == valuePassword,
  )[0];

  if (!userFounded) {
    alert.style.display = "block";
    return;
  }

  const role = userFounded.role;

  const user: IUserSession = {
    email: valueEmail,
    role: role,
    loggedIn: true,
  };

  saveUser(user);

  roleBasedNavigation(user.role);
});
