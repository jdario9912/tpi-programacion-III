import { userService } from "../../services/users.service";
import { clientPath } from "../../utils/const";
import { saveUser } from "../../utils/localStorage";
import { navigate } from "../../utils/navigate";

const togglePass = document.getElementById("toggle-pass") as HTMLButtonElement;
togglePass.addEventListener("click", () => {
  const input = document.getElementById("password") as HTMLInputElement;
  const show = document.getElementById("icon-show") as HTMLDivElement;
  const hide = document.getElementById("icon-hide") as HTMLDivElement;
  const esPass = input.type === "password";
  input.type = esPass ? "text" : "password";
  show.classList.toggle("hidden", esPass);
  hide.classList.toggle("hidden", !esPass);
});

const formRegistro = document.getElementById(
  "registro-form",
) as HTMLFormElement;
formRegistro.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre") as HTMLInputElement;
  nombre.value.trim();
  const apellido = document.getElementById("apellido") as HTMLInputElement;
  apellido.value.trim();
  const email = document.getElementById("email") as HTMLInputElement;
  email.value.trim();
  const password = document.getElementById("password") as HTMLInputElement;
  password.value.trim();
  const alertEl = document.getElementById("alert") as HTMLDivElement;
  let ok = true;

  const errNombre = document.getElementById(
    "err-nombre",
  ) as HTMLParagraphElement;
  errNombre.classList.toggle("hidden", nombre.value.length > 0);
  if (!nombre) ok = false;

  const errApellido = document.getElementById(
    "err-apellido",
  ) as HTMLParagraphElement;
  errApellido.classList.toggle("hidden", apellido.value.length > 0);
  if (!apellido) ok = false;

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  const errEmail = document.getElementById("err-email") as HTMLParagraphElement;
  errEmail.classList.toggle("hidden", emailValido);
  if (!emailValido) ok = false;

  const passValida = password.value.length >= 6;
  const errPass = document.getElementById("err-pass") as HTMLParagraphElement;
  errPass.classList.toggle("hidden", passValida);
  if (!passValida) ok = false;

  if (!ok) {
    alertEl.classList.add("hidden");
    return;
  }

  const usuarioRegisted = await userService.register({
    nombre: nombre.value,
    apellido: apellido.value,
    email: email.value,
    password: password.value,
  });
  saveUser(usuarioRegisted);
  navigate(clientPath);
});

// function mostrarAlert(msg) {
// const alertEl = document.getElementById("alert");
// document.getElementById("alert-msg").textContent = msg;
// alertEl.classList.remove("hidden");
// }
