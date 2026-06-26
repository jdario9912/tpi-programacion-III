import { authService } from "../../services/auth.service";
import { redirectByRole } from "../../utils/auth";
import { saveUser } from "../../utils/localStorage";

// const form = document.getElementById("login-form") as HTMLFormElement;
// const inputEmail = document.getElementById("email") as HTMLInputElement;
// const inputPassword = document.getElementById("password") as HTMLInputElement;
// const alert = document.getElementById("alert") as HTMLSpanElement;

// form?.addEventListener("submit", async (e: SubmitEvent) => {
//   e.preventDefault();
//   const valueEmail = inputEmail.value;
//   const valuePassword = inputPassword.value;

//   try {
//     const userLogged = await authService.login(valueEmail, valuePassword);
//     redirectByRole(userLogged.rol);
//     saveUser(userLogged);
//   } catch (error) {
//     alert.style.display = "block";
//     console.log(error);
//   }
// });

const loginForm = document.getElementById("login-form") as HTMLFormElement;

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email") as HTMLInputElement;
  email.value.trim();
  const password = document.getElementById("password") as HTMLInputElement;
  password.value.trim();

  const alert = document.getElementById("alert") as HTMLSpanElement;
  let ok = true;

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  const errEmail = document.getElementById("err-email") as HTMLParagraphElement;
  errEmail.classList.toggle("hidden", emailValido);
  if (!emailValido) ok = false;

  const passValida = password.value.length > 0;
  const errPass = document.getElementById("err-pass") as HTMLParagraphElement;
  errPass.classList.toggle("hidden", passValida);
  if (!passValida) ok = false;

  if (!ok) {
    alert.classList.add("hidden");
    return;
  }

  try {
    const userLogged = await authService.login(email.value, password.value);
    alert.classList.toggle("hidden", false);
    redirectByRole(userLogged.rol);
    saveUser(userLogged);
  } catch (error) {
    alert.style.display = "block";
    console.log(error);
  }
});

const togglePass = document.getElementById("toggle-pass") as HTMLButtonElement;
togglePass.addEventListener("click", () => {
  const input = document.getElementById("password") as HTMLInputElement;
  const show = document.getElementById("icon-show") as HTMLImageElement;
  const hide = document.getElementById("icon-hide") as HTMLImageElement;
  const esPassword = input.type === "password";
  input.type = esPassword ? "text" : "password";
  show.classList.toggle("hidden", esPassword);
  hide.classList.toggle("hidden", !esPassword);
});
