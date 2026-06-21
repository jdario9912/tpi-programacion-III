import { authService } from "../../../services/auth.service";
import { redirectByRole } from "../../../utils/auth";
import { saveUser } from "../../../utils/localStorage";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;
const alert = document.getElementById("alert") as HTMLSpanElement;

form?.addEventListener("submit", async (e: SubmitEvent) => {
  e.preventDefault();
  const valueEmail = inputEmail.value;
  const valuePassword = inputPassword.value;

  try {
    const userLogged = await authService.login(valueEmail, valuePassword);
    redirectByRole(userLogged.rol);
    saveUser(userLogged);
  } catch (error) {
    alert.style.display = "block";
    console.log(error);
  }
});
