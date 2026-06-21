import type { User } from "../../api/users/users.types";
import { asideBarContainer } from "../../components/aside-bar";
import { headerContainer, initHeader } from "../../components/header";
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
  mainLayout.prepend(headerContainer);
  const secondaryLayout = document.getElementById(
    "secondary-layout",
  ) as HTMLDivElement;
  secondaryLayout.prepend(asideBarContainer);

  initHeader();
});

let pedidos = [
  {
    id: 1001,
    cliente: "Lucía Fernández",
    email: "lucia@email.com",
    fecha: "2026-06-18",
    items: 3,
    total: 25500,
    direccion: "Av. Corrientes 1234, CABA",
    estado: "pendiente",
  },
  {
    id: 1002,
    cliente: "Marcos Rodríguez",
    email: "marcos@email.com",
    fecha: "2026-06-17",
    items: 1,
    total: 12999,
    direccion: "San Martín 567, Rosario",
    estado: "en_camino",
  },
  {
    id: 1003,
    cliente: "Valentina López",
    email: "vale@email.com",
    fecha: "2026-06-16",
    items: 5,
    total: 47300,
    direccion: "Belgrano 890, Córdoba",
    estado: "entregado",
  },
  {
    id: 1004,
    cliente: "Diego Suárez",
    email: "diego@email.com",
    fecha: "2026-06-15",
    items: 2,
    total: 8700,
    direccion: "Mitre 321, Mendoza",
    estado: "cancelado",
  },
  {
    id: 1005,
    cliente: "Camila Torres",
    email: "cami@email.com",
    fecha: "2026-06-14",
    items: 4,
    total: 33200,
    direccion: "Independencia 456, La Plata",
    estado: "entregado",
  },
  {
    id: 1006,
    cliente: "Hernán Gómez",
    email: "hernan@email.com",
    fecha: "2026-06-13",
    items: 1,
    total: 3500,
    direccion: "9 de Julio 789, Tucumán",
    estado: "pendiente",
  },
];
let sigId = 1007,
  idVer = null,
  idDel = null;

const estadoConf = {
  pendiente: {
    label: "Pendiente",
    cls: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
  },
  en_camino: {
    label: "En camino",
    cls: "bg-indigo-50 text-indigo-700 border-indigo-200",
    dot: "bg-indigo-500",
  },
  entregado: {
    label: "Entregado",
    cls: "bg-teal-50 text-teal-700 border-teal-200",
    dot: "bg-teal-500",
  },
  cancelado: {
    label: "Cancelado",
    cls: "bg-red-50 text-red-600 border-red-200",
    dot: "bg-red-400",
  },
};

function fmt(n) {
  return "$" + Number(n).toLocaleString("es-AR");
}
function fmtFecha(f) {
  const [y, m, d] = f.split("-");
  return `${d}/${m}/${y}`;
}

function actualizarResumen() {
  document.getElementById("res-total").textContent = pedidos.length;
  document.getElementById("res-pendiente").textContent = pedidos.filter(
    (p) => p.estado === "pendiente",
  ).length;
  document.getElementById("res-camino").textContent = pedidos.filter(
    (p) => p.estado === "en_camino",
  ).length;
  document.getElementById("res-entregado").textContent = pedidos.filter(
    (p) => p.estado === "entregado",
  ).length;
}

function render(lista) {
  const tbody = document.getElementById("tabla-body");
  const vacio = document.getElementById("estado-vacio");
  const cnt = document.getElementById("contador");
  actualizarResumen();
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
<td class="px-5 py-3.5">
<p class="font-medium text-gray-800">${p.cliente}</p>
<p class="text-xs text-gray-400 mt-0.5">${p.email}</p>
</td>
<td class="px-5 py-3.5 text-gray-500">${fmtFecha(p.fecha)}</td>
<td class="px-5 py-3.5 text-gray-600">${p.items} item${p.items !== 1 ? "s" : ""}</td>
<td class="px-5 py-3.5 font-medium text-gray-800">${fmt(p.total)}</td>
<td class="px-5 py-3.5">
<span class="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${e.cls}">
  <span class="w-1.5 h-1.5 rounded-full ${e.dot}"></span>${e.label}
</span>
</td>
<td class="px-5 py-3.5">
<div class="flex items-center justify-end gap-1">
  <button onclick="verPedido(${p.id})" title="Ver / cambiar estado" class="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
  </button>
  <button onclick="abrirDel(${p.id})" title="Eliminar" class="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M3 7h18"/></svg>
  </button>
</div>
</td>
</tr>`;
    })
    .join("");
}

function filtrar() {
  const q = document.getElementById("buscador").value.toLowerCase();
  const fe = document.getElementById("filtro-estado").value;
  render(
    pedidos.filter(
      (p) =>
        (p.cliente.toLowerCase().includes(q) || String(p.id).includes(q)) &&
        (!fe || p.estado === fe),
    ),
  );
}

function verPedido(id) {
  const p = pedidos.find((x) => x.id === id);
  if (!p) return;
  idVer = id;
  const e = estadoConf[p.estado];
  document.getElementById("ver-body").innerHTML = `
<div class="flex items-start justify-between">
<div>
<p class="font-medium text-gray-900 text-base">${p.cliente}</p>
<p class="text-gray-400 text-xs mt-0.5">${p.email}</p>
</div>
<span class="text-sm font-medium text-indigo-600">#${p.id}</span>
</div>
<div class="grid grid-cols-3 gap-3">
<div class="bg-gray-50 rounded-lg p-3">
<p class="text-xs text-gray-400 mb-1">Fecha</p>
<p class="font-medium text-gray-800 text-sm">${fmtFecha(p.fecha)}</p>
</div>
<div class="bg-gray-50 rounded-lg p-3">
<p class="text-xs text-gray-400 mb-1">Total</p>
<p class="font-medium text-gray-800 text-sm">${fmt(p.total)}</p>
</div>
<div class="bg-gray-50 rounded-lg p-3">
<p class="text-xs text-gray-400 mb-1">Items</p>
<p class="font-medium text-gray-800 text-sm">${p.items}</p>
</div>
</div>
${
  p.direccion
    ? `
<div class="flex items-start gap-2 text-sm text-gray-500">
<svg class="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
<path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
<path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
</svg>
${p.direccion}
</div>`
    : ""
}
<div class="flex items-center gap-2">
<span class="text-xs text-gray-400">Estado actual:</span>
<span class="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${e.cls}">
<span class="w-1.5 h-1.5 rounded-full ${e.dot}"></span>${e.label}
</span>
</div>`;
  document.getElementById("nuevo-estado").value = p.estado;
  document.getElementById("modal-ver").classList.remove("hidden");
}

function cerrarVer() {
  document.getElementById("modal-ver").classList.add("hidden");
  idVer = null;
}

function cambiarEstado() {
  if (idVer === null) return;
  const nuevoEstado = document.getElementById("nuevo-estado").value;
  const i = pedidos.findIndex((x) => x.id === idVer);
  pedidos[i].estado = nuevoEstado;
  cerrarVer();
  filtrar();
  toast("Estado del pedido actualizado");
}

function abrirNuevo() {
  ["n-cliente", "n-email", "n-total", "n-items", "n-dir"].forEach(
    (id) => (document.getElementById(id).value = ""),
  );
  ["err-cliente", "err-total"].forEach((id) =>
    document.getElementById(id).classList.add("hidden"),
  );
  document.getElementById("modal-nuevo").classList.remove("hidden");
  setTimeout(() => document.getElementById("n-cliente").focus(), 50);
}
function cerrarNuevo() {
  document.getElementById("modal-nuevo").classList.add("hidden");
}

function crearPedido() {
  const cliente = document.getElementById("n-cliente").value.trim();
  const total = parseFloat(document.getElementById("n-total").value);
  let ok = true;
  if (!cliente) {
    document.getElementById("err-cliente").classList.remove("hidden");
    ok = false;
  } else {
    document.getElementById("err-cliente").classList.add("hidden");
  }
  if (!total || total <= 0) {
    document.getElementById("err-total").classList.remove("hidden");
    ok = false;
  } else {
    document.getElementById("err-total").classList.add("hidden");
  }
  if (!ok) return;
  pedidos.unshift({
    id: sigId++,
    cliente,
    email: document.getElementById("n-email").value.trim(),
    fecha: new Date().toISOString().split("T")[0],
    items: parseInt(document.getElementById("n-items").value) || 1,
    total,
    direccion: document.getElementById("n-dir").value.trim(),
    estado: "pendiente",
  });
  cerrarNuevo();
  filtrar();
  toast("Pedido creado correctamente");
}

function abrirDel(id) {
  idDel = id;
  document.getElementById("del-num").textContent = "#" + id;
  document.getElementById("modal-del").classList.remove("hidden");
}
function cerrarDel() {
  document.getElementById("modal-del").classList.add("hidden");
  idDel = null;
}
function confirmarDel() {
  pedidos = pedidos.filter((x) => x.id !== idDel);
  cerrarDel();
  filtrar();
  toast("Pedido eliminado");
}

function toast(msg) {
  document.getElementById("toast-msg").textContent = msg;
  const t = document.getElementById("toast");
  t.classList.remove("hidden");
  setTimeout(() => t.classList.add("hidden"), 3000);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    cerrarVer();
    cerrarNuevo();
    cerrarDel();
  }
});

render(pedidos);
