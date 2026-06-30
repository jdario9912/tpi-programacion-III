import type { User } from "../../api/users/users.types";
import { initHeader } from "../../components/header";
import { headerCliente } from "../../components/header-cliente";
import { cartRepository } from "../../storage/repositories/cart.repository";
import type { ProductCartItem } from "../../storage/repositories/cart.types";
import { loginPath } from "../../utils/const";
import { getUSer, removeUser } from "../../utils/localStorage";
import { navigate } from "../../utils/navigate";

const user = getUSer();
const parsedUser = JSON.parse(user!) as User;
if (parsedUser.rol !== "USUARIO") {
  removeUser();
  navigate(loginPath);
}

document.addEventListener("DOMContentLoaded", async () => {
  const mainLayout = document.getElementById("main-layout") as HTMLDivElement;
  mainLayout.prepend(headerCliente(parsedUser.nombre));
  initHeader();

  const carritoBadge = document.getElementById(
    "carrito-badge",
  ) as HTMLSpanElement;
  const cartCount = cartRepository.getCount();
  if (cartCount > 0) {
    carritoBadge.classList.remove("hidden");
    carritoBadge.textContent = String(cartCount);
  }
  render();
});

const ENVIO_GRATIS_DESDE = 30000;
const COSTO_ENVIO = 3500;

function calcularTotales(carrito: ProductCartItem[]) {
  const subtotal = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0,
  );
  const cantTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const envio = subtotal >= ENVIO_GRATIS_DESDE ? 0 : COSTO_ENVIO;
  const total = subtotal + envio;
  return { subtotal, envio, total, cantTotal };
}

function render() {
  const carrito = cartRepository.getAll();
  const vacio = document.getElementById("carrito-vacio") as HTMLDivElement;
  const contenido = document.getElementById(
    "carrito-contenido",
  ) as HTMLDivElement;

  if (!carrito.length) {
    vacio.classList.remove("hidden");
    contenido.classList.add("hidden");
    return;
  }

  vacio.classList.add("hidden");
  contenido.classList.remove("hidden");

  const listaItems = document.getElementById("lista-items") as HTMLDivElement;
  listaItems.innerHTML = carrito
    .map(
      (item) => `
        <div class="bg-white border border-gray-200 rounded-xl p-4 flex gap-4 items-start" id="item-${item.id}">
          <a href="producto.html?id=${item.id}" class="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
            <img src="${item.imagen}" alt="${item.nombre}" class="w-full h-full object-cover"/>
          </a>

          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-2 w-full">
              <div class="flex items-start justify-between gap-2 w-full">
                <div>
                  <p class="capitalize text-xl">${item.nombre}</p>
                  <p class="text-sm text-gray-400 capitalize">${item.categoria}</p>
                </div>

              <button title="Eliminar" data-action="eliminar" data-id="${item.id}"
                class="flex-shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M3 7h18"/>
                </svg>
              </button>
              </div>
            </div>

            <div class="flex items-center justify-between mt-3">
              <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  data-action="disminuir" data-id="${item.id}"
                  class="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4"/></svg>
                </button>
                <span class="w-8 text-center text-sm font-medium text-gray-900">${item.cantidad}</span>
                <button
                  data-action="aumentar" data-id="${item.id}"
                  class="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
                </button>
              </div>

              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">${item.precio * item.cantidad}</p>
                <p class="text-xs text-gray-400">${item.precio} c/u</p>
              </div>
            </div>
          </div>
        </div>
      `,
    )
    .join("");

  const { subtotal, envio, total, cantTotal } = calcularTotales(carrito);
  const resCantidad = document.getElementById(
    "res-cantidad",
  ) as HTMLSpanElement;
  resCantidad.textContent = String(cantTotal);
  const resSubtotal = document.getElementById(
    "res-subtotal",
  ) as HTMLSpanElement;
  resSubtotal.textContent = String(subtotal);
  const resEnvio = document.getElementById("res-envio") as HTMLSpanElement;
  resEnvio.textContent = String(envio === 0 ? "Gratis" : envio);
  const resTotal = document.getElementById("res-total") as HTMLSpanElement;
  resTotal.textContent = String(total);
  const envioGratis = document.getElementById(
    "envio-gratis-banner",
  ) as HTMLDivElement;
  envioGratis.style.display = subtotal >= ENVIO_GRATIS_DESDE ? "flex" : "none";
}

function initTablaListener() {
  const listaItems = document.getElementById("lista-items") as HTMLDivElement;
  listaItems.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const btn = target.closest<HTMLButtonElement>("button[data-action]");
    if (!btn) return;

    const idAttr = btn.dataset.id;
    if (!idAttr) return;

    const id = Number(idAttr);
    const item = cartRepository.getById(id);
    if (!item) return;
    if (Number.isNaN(id)) return;

    switch (btn.dataset.action) {
      case "disminuir":
        cambiarCantidad(id, item?.cantidad - 1);
        break;
      case "aumentar":
        cambiarCantidad(id, item?.cantidad + 1);
        break;

      case "eliminar":
        eliminarItem(id);
        break;
    }
  });
}
initTablaListener();

function cambiarCantidad(id: number, delta: number) {
  const item = cartRepository.getById(id);
  if (!item || item.cantidad + delta <= 0) return;
  cartRepository.update(id, { cantidad: delta });
  render();
}

function eliminarItem(id: number) {
  cartRepository.remove(id);
  render();
}

const btnVaciarCarrito = document.getElementById(
  "vaciar-carrito",
) as HTMLButtonElement;
btnVaciarCarrito.addEventListener("click", () => {
  vaciarCarrito();
  const carritoBadge = document.getElementById(
    "carrito-badge",
  ) as HTMLSpanElement;
  carritoBadge.classList.add("hidden");
});

function vaciarCarrito() {
  cartRepository.clear();
  render();
}

render();
