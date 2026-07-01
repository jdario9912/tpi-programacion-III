import type { Details, Estado, Order } from "../../api/orders/orders.types";
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

type EstadoPedido = "PENDIENTE" | "EN_CAMINO" | "ENTREGADO" | "CANCELADO";

const ESTADO_CONFIG: Record<
  EstadoPedido,
  { label: string; cls: string; dot: string }
> = {
  PENDIENTE: {
    label: "Pendiente",
    cls: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-400",
  },
  EN_CAMINO: {
    label: "En camino",
    cls: "bg-indigo-50 text-indigo-700 border-indigo-200",
    dot: "bg-indigo-500",
  },
  ENTREGADO: {
    label: "Entregado",
    cls: "bg-teal-50 text-teal-700 border-teal-200",
    dot: "bg-teal-500",
  },
  CANCELADO: {
    label: "Cancelado",
    cls: "bg-red-50 text-red-500 border-red-200",
    dot: "bg-red-400",
  },
};

const FORMA_PAGO_LABEL: Record<string, string> = {
  EFECTIVO: "Efectivo",
  TARJETA: "Tarjeta",
  TRANSFERENCIA: "Transferencia",
};

function fmt(n: number): string {
  return "$" + Number(n).toLocaleString("es-AR");
}

function getIdFromUrl(): number | null {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id") ?? "");
  return isNaN(id) ? null : id;
}

function getEl<T extends HTMLElement>(id: string): T {
  return document.getElementById(id) as T;
}

function renderEstado(estado: Estado): void {
  const conf = ESTADO_CONFIG[estado] ?? ESTADO_CONFIG.PENDIENTE;
  const el = getEl("pedido-estado");
  el.className = `inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${conf.cls}`;
  el.innerHTML = `<span class="w-1.5 h-1.5 rounded-full ${conf.dot}"></span>${conf.label}`;
}

function renderHeader(pedido: Order): void {
  const subtotal = pedido.detalles.reduce(
    (acc, d) => acc + d.cantidad * d.producto.precio,
    0,
  );
  const total = subtotal;
  const cantProd = pedido.detalles.reduce((acc, d) => acc + d.cantidad, 0);

  getEl("breadcrumb-id").textContent = `Pedido #${pedido.id}`;
  getEl("pedido-titulo").textContent = `Pedido #${pedido.id}`;
  getEl("pedido-fecha").textContent = pedido.fecha;
  getEl("pedido-pago").textContent =
    FORMA_PAGO_LABEL[pedido.formaPago] ?? pedido.formaPago;
  getEl("pedido-cantidad").textContent =
    `${cantProd} ítem${cantProd !== 1 ? "s" : ""}`;
  getEl("pedido-total").textContent = fmt(total);

  getEl("res-subtotal").textContent = fmt(subtotal);
  getEl("res-total").textContent = fmt(total);

  renderEstado(pedido.estado);
}

function renderDetalles(detalles: Details[]): void {
  const lista = getEl("lista-detalles");

  lista.innerHTML = detalles
    .map((item) => {
      const { producto, cantidad } = item;
      const imgSrc = `/imagenes/${producto.imagen}`;

      return `
      <div class="flex items-start gap-4 px-5 py-4">
        <div class="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src="${imgSrc}"
            alt="${producto.nombre}"
            class="w-full h-full object-cover"
            onerror="this.src='https://via.placeholder.com/80x80?text=Sin+imagen'"
          />
        </div>

        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-2">
            <div>
              <p class="text-sm font-medium text-gray-900 capitalize">${producto.nombre}</p>
              <p class="text-xs text-indigo-500 mt-0.5">${producto.categoria.nombre}</p>
              ${
                producto.descripcion
                  ? `<p class="text-xs text-gray-400 mt-1 line-clamp-2">${producto.descripcion}</p>`
                  : ""
              }
            </div>
            <p class="text-sm font-medium text-gray-900 flex-shrink-0">${item.cantidad * item.producto.precio}</p>
          </div>

          <div class="flex items-center gap-3 mt-2">
            <span class="text-xs text-gray-400">${fmt(producto.precio)} c/u</span>
            <span class="text-gray-300">·</span>
            <span class="text-xs text-gray-500 font-medium">× ${cantidad}</span>
          </div>
        </div>
      </div>
    `;
    })
    .join("");
}

function mostrarContenido(): void {
  getEl("skeleton").classList.add("hidden");
  getEl("contenido").classList.remove("hidden");
}

function mostrarError(): void {
  getEl("skeleton").classList.add("hidden");
  getEl("estado-error").classList.remove("hidden");
}

async function fetchPedido(id: number) {
  return ordersService.getById(id);
}
async function init(): Promise<void> {
  const id = getIdFromUrl();

  if (!id) {
    mostrarError();
    return;
  }

  try {
    const pedido = await fetchPedido(id);
    renderHeader(pedido);
    renderDetalles(pedido.detalles);
    mostrarContenido();
  } catch (error) {
    console.error("Error al cargar el pedido:", error);
    mostrarError();
  }
}

document.addEventListener("DOMContentLoaded", init);
