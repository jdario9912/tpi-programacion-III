import type { Estado, Order } from "../../api/orders/orders.types";
import type { User } from "../../api/users/users.types";
import { asideBarContainer } from "../../components/aside-bar";
import { FormDialog } from "../../components/form-dialog";
import { headerContainer, initHeader } from "../../components/header";
import { ordersService } from "../../services/orders.service";
import { loginPath } from "../../utils/const";
import { getUSer, removeUser } from "../../utils/localStorage";
import { navigate } from "../../utils/navigate";

const user = getUSer();
const parsedUser = JSON.parse(user!) as User;
if (parsedUser.rol !== "ADMIN") {
  removeUser();
  navigate(loginPath);
}

document.addEventListener("DOMContentLoaded", () => {
  const mainLayout = document.getElementById("main-layout") as HTMLDivElement;
  mainLayout.prepend(headerContainer(parsedUser.nombre));
  const secondaryLayout = document.getElementById(
    "secondary-layout",
  ) as HTMLDivElement;
  secondaryLayout.prepend(asideBarContainer);

  initHeader();

  interface PedidoForm {
    pedido_id_hidden: number;
    estado: string;
  }

  const dialogPedido = document.getElementById(
    "modal-ver-pedido",
  ) as HTMLDialogElement;

  const verPedidoDialog = new FormDialog<PedidoForm>(dialogPedido, {
    onSubmit: async (data) => {
      try {
        await ordersService.update(data.pedido_id_hidden, {
          estado: data.estado as unknown as Estado,
        });
        verPedidoDialog.close();
        await cargarPedidos();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const tbody = document.getElementById(
    "tabla-body",
  ) as HTMLTableSectionElement;
  tbody.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;
    const btn = target.closest<HTMLButtonElement>(
      "button[data-action='ver-pedido']",
    );
    if (!btn) return;

    const id = Number(btn.dataset.id);
    if (Number.isNaN(id)) return;
    const pedido = await ordersService.getById(id);
    const pedidoId = document.getElementById(
      "pedido-id",
    ) as HTMLParagraphElement;
    pedidoId.textContent = String(id);

    const pedidoFecha = document.getElementById(
      "pedido-fecha",
    ) as HTMLParagraphElement;
    pedidoFecha.textContent = fmtFecha(pedido.fecha);

    const pedidoPago = document.getElementById(
      "pedido-pago",
    ) as HTMLParagraphElement;
    pedidoPago.textContent = pedido.formaPago as unknown as string;

    const pedidoTotal = document.getElementById(
      "pedido-total",
    ) as HTMLParagraphElement;
    pedidoTotal.textContent = fmt(pedido.total);

    const tbody = document.getElementById(
      "detalle-productos",
    ) as HTMLTableSectionElement;

    tbody.innerHTML = pedido.detalles
      .map(
        (d) => `
          <tr class="border-t">
              <td class="px-3 py-2">
                  <div class="font-medium">${d.producto.nombre}</div>
                  <div class="text-xs text-gray-500">${d.producto.categoria.nombre}</div>
              </td>

              <td class="text-center">
                  ${d.cantidad}
              </td>

              <td class="text-right px-3">
                  $${d.producto.precio.toLocaleString("es-AR")}
              </td>

              <td class="text-right px-3 font-medium">
                  $${(d.producto.precio * d.cantidad).toLocaleString("es-AR")}
              </td>
          </tr>
          `,
      )
      .join("");
    verPedidoDialog.open({
      pedido_id_hidden: String(pedido.id),
      estado: pedido.estado as unknown as string,
    });
  });
});

const estadoConf = {
  PENDIENTE: {
    label: "Pendiente",
    cls: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
  },
  TERMINADO: {
    label: "Terminado",
    cls: "bg-indigo-50 text-indigo-700 border-indigo-200",
    dot: "bg-indigo-500",
  },
  CONFIRMADO: {
    label: "Confirmado",
    cls: "bg-teal-50 text-teal-700 border-teal-200",
    dot: "bg-teal-500",
  },
  CANCELADO: {
    label: "Cancelado",
    cls: "bg-red-50 text-red-600 border-red-200",
    dot: "bg-red-400",
  },
};

function fmt(n: string) {
  return "$" + Number(n).toLocaleString("es-AR");
}
function fmtFecha(f: string) {
  const [y, m, d] = f.split("-");
  return `${d}/${m}/${y}`;
}

let pedidos = await ordersService.getAll();

function render(lista: Order[]) {
  const tbody = document.getElementById(
    "tabla-body",
  ) as HTMLTableSectionElement;
  const vacio = document.getElementById("estado-vacio") as HTMLDivElement;
  const cnt = document.getElementById("contador") as HTMLParagraphElement;
  if (!lista.length) {
    tbody.innerHTML = "";
    vacio.classList.remove("hidden");
    cnt.textContent = "";
    return;
  }
  vacio.classList.add("hidden");
  cnt.textContent = `${lista.length} pedido${lista.length !== 1 ? "s" : ""} encontrado${lista.length !== 1 ? "s" : ""}`;
  tbody.innerHTML = lista
    .map((p) => {
      const e = estadoConf[p.estado];
      return `
        <tr class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
          <td class="px-5 py-3.5 font-medium text-indigo-600">#${p.id}</td>
          <td class="px-5 py-3.5 text-gray-500">${fmtFecha(p.fecha.toString())}</td>
          <td class="px-5 py-3.5 text-gray-600">${p.detalles.length} item${p.detalles.length !== 1 ? "s" : ""}</td>
          <td class="px-5 py-3.5 font-medium text-gray-800">${fmt(String(p.total))}</td>
          <td class="px-5 py-3.5">
          <span class="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${e.cls}">
            <span class="w-1.5 h-1.5 rounded-full ${e.dot}"></span>${p.estado}
          </span>
          </td>
          <td class="px-5 py-3.5">
            <div class="flex items-center justify-end gap-1">
              <button data-action="ver-pedido" data-id="${p.id}" title="Ver / cambiar estado" class="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </button>
            </div>
          </td>
        </tr>`;
    })
    .join("");
}

async function cargarPedidos() {
  pedidos = await ordersService.getAll();
  render(pedidos);
}

await cargarPedidos();
