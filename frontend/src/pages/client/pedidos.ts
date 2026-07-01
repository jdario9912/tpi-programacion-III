import type { User } from "../../api/users/users.types";
import { initHeader } from "../../components/header";
import { headerCliente } from "../../components/header-cliente";
import { ordersService } from "../../services/orders.service";
import { cartRepository } from "../../storage/repositories/cart.repository";
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
});

const estadoConf = {
  PENDIENTE: {
    label: "Pendiente",
    cls: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-400",
    filtro: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
  },
  EN_CAMINO: {
    label: "En camino",
    cls: "bg-indigo-50 text-indigo-700 border-indigo-200",
    dot: "bg-indigo-500",
    filtro:
      "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100",
  },
  ENTREGADO: {
    label: "Entregado",
    cls: "bg-teal-50 text-teal-700 border-teal-200",
    dot: "bg-teal-500",
    filtro: "bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100",
  },
  CANCELADO: {
    label: "Cancelado",
    cls: "bg-red-50 text-red-500 border-red-200",
    dot: "bg-red-400",
    filtro: "bg-red-50 text-red-500 border-red-200 hover:bg-red-100",
  },
};

async function renderPedidos() {
  const lista = document.getElementById("lista-pedidos") as HTMLDivElement;
  const vacio = document.getElementById("estado-vacio") as HTMLDivElement;
  const pedidos = await ordersService.getByUserId(parsedUser.id);
  vacio.classList.add("hidden");
  lista.innerHTML = pedidos
    .map((p) => {
      const e = estadoConf[p.estado as string];
      return `
        <div class="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center gap-4">

          <div class="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>

          <div class="min-w-0 flex-1">
            <p class="text-sm font-medium text-gray-900">#${p.id}</p>
            <p class="text-xs text-gray-400 mt-0.5">${p.fecha}</p>
          </div>

          <div class="text-center hidden sm:block">
            <p class="text-sm font-medium text-gray-800">${p.detalles.length}</p>
            <p class="text-xs text-gray-400">producto${p.detalles.length !== 1 ? "s" : ""}</p>
          </div>

          <span class="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${e.cls} flex-shrink-0">
            <span class="w-1.5 h-1.5 rounded-full ${e.dot}"></span>
            ${e.label}
          </span>

          <div class="text-right flex-shrink-0">
            <p class="text-sm font-medium text-gray-900">${p.total}</p>
            <p class="text-xs text-gray-400">total</p>
          </div>

          <a href="pedido.html?id=${p.id}"
            class="flex-shrink-0 flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
            Ver
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
        </div>`;
    })
    .join("");
}
renderPedidos();
