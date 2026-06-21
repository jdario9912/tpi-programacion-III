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

// Datos iniciales de ejemplo
let categorias = [
  {
    id: 1,
    nombre: "Electrónica",
    descripcion: "Dispositivos y gadgets tecnológicos",
    productos: 48,
    estado: "activo",
  },
  {
    id: 2,
    nombre: "Ropa",
    descripcion: "Indumentaria para hombre y mujer",
    productos: 95,
    estado: "activo",
  },
  {
    id: 3,
    nombre: "Hogar",
    descripcion: "Muebles y decoración del hogar",
    productos: 32,
    estado: "activo",
  },
  {
    id: 4,
    nombre: "Deportes",
    descripcion: "Equipamiento deportivo y fitness",
    productos: 27,
    estado: "inactivo",
  },
  {
    id: 5,
    nombre: "Alimentación",
    descripcion: "Productos de alimentos y bebidas",
    productos: 61,
    estado: "activo",
  },
];

let idEditando = null;
let idEliminar = null;
let siguienteId = 6;

// ---- RENDERIZADO ----
function renderTabla(lista) {
  const tbody = document.getElementById("tabla-body");
  const vacio = document.getElementById("estado-vacio");
  const contador = document.getElementById("contador");

  if (lista.length === 0) {
    tbody.innerHTML = "";
    vacio.classList.remove("hidden");
    contador.textContent = "";
    return;
  }

  vacio.classList.add("hidden");
  contador.textContent = `${lista.length} categoría${lista.length !== 1 ? "s" : ""} encontrada${lista.length !== 1 ? "s" : ""}`;

  tbody.innerHTML = lista
    .map(
      (c) => `
<tr class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
<td class="px-5 py-3.5 text-gray-400">${c.id}</td>
<td class="px-5 py-3.5 font-medium text-gray-800">${c.nombre}</td>
<td class="px-5 py-3.5 text-gray-500 max-w-xs truncate">${c.descripcion || "—"}</td>
<td class="px-5 py-3.5 text-gray-600">${c.productos}</td>
<td class="px-5 py-3.5">
<span class="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full
  ${
    c.estado === "activo"
      ? "bg-teal-50 text-teal-700 border border-teal-200"
      : "bg-gray-100 text-gray-500 border border-gray-200"
  }">
  <span class="w-1.5 h-1.5 rounded-full ${c.estado === "activo" ? "bg-teal-500" : "bg-gray-400"}"></span>
  ${c.estado === "activo" ? "Activo" : "Inactivo"}
</span>
</td>
<td class="px-5 py-3.5">
<div class="flex items-center justify-end gap-1">
  <!-- VER -->
  <button onclick="verCategoria(${c.id})"
    title="Ver detalle"
    class="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
    </svg>
  </button>
  <!-- EDITAR -->
  <button onclick="abrirModalEditar(${c.id})"
    title="Editar"
    class="p-1.5 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  </button>
  <!-- ELIMINAR -->
  <button onclick="abrirModalEliminar(${c.id})"
    title="Eliminar"
    class="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M3 7h18"/>
    </svg>
  </button>
</div>
</td>
</tr>
`,
    )
    .join("");
}

// ---- BÚSQUEDA ----
function filtrarTabla() {
  const q = document.getElementById("buscador").value.toLowerCase();
  const filtradas = categorias.filter(
    (c) =>
      c.nombre.toLowerCase().includes(q) ||
      c.descripcion.toLowerCase().includes(q),
  );
  renderTabla(filtradas);
}

// ---- MODAL CREAR ----
function abrirModal() {
  idEditando = null;
  document.getElementById("modal-titulo").textContent = "Nueva categoría";
  document.getElementById("campo-nombre").value = "";
  document.getElementById("campo-desc").value = "";
  document.getElementById("campo-estado").value = "activo";
  document.getElementById("error-nombre").classList.add("hidden");
  document.getElementById("modal").classList.remove("hidden");
  setTimeout(() => document.getElementById("campo-nombre").focus(), 50);
}

// ---- MODAL EDITAR ----
function abrirModalEditar(id) {
  const cat = categorias.find((c) => c.id === id);
  if (!cat) return;
  idEditando = id;
  document.getElementById("modal-titulo").textContent = "Editar categoría";
  document.getElementById("campo-nombre").value = cat.nombre;
  document.getElementById("campo-desc").value = cat.descripcion;
  document.getElementById("campo-estado").value = cat.estado;
  document.getElementById("error-nombre").classList.add("hidden");
  document.getElementById("modal").classList.remove("hidden");
  setTimeout(() => document.getElementById("campo-nombre").focus(), 50);
}

function cerrarModal() {
  document.getElementById("modal").classList.add("hidden");
}

// ---- GUARDAR (crear o editar) ----
function guardarCategoria() {
  const nombre = document.getElementById("campo-nombre").value.trim();
  const desc = document.getElementById("campo-desc").value.trim();
  const estado = document.getElementById("campo-estado").value;

  if (!nombre) {
    document.getElementById("error-nombre").classList.remove("hidden");
    document.getElementById("campo-nombre").focus();
    return;
  }
  document.getElementById("error-nombre").classList.add("hidden");

  if (idEditando !== null) {
    const idx = categorias.findIndex((c) => c.id === idEditando);
    categorias[idx] = {
      ...categorias[idx],
      nombre,
      descripcion: desc,
      estado,
    };
    mostrarToast("Categoría actualizada correctamente");
  } else {
    categorias.push({
      id: siguienteId++,
      nombre,
      descripcion: desc,
      productos: 0,
      estado,
    });
    mostrarToast("Categoría creada correctamente");
  }

  cerrarModal();
  renderTabla(categorias);
}

// ---- VER DETALLE ----
function verCategoria(id) {
  const cat = categorias.find((c) => c.id === id);
  if (!cat) return;
  alert(
    `📂 ${cat.nombre}\n\nDescripción: ${cat.descripcion || "—"}\nProductos: ${cat.productos}\nEstado: ${cat.estado}`,
  );
}

// ---- MODAL ELIMINAR ----
function abrirModalEliminar(id) {
  idEliminar = id;
  const cat = categorias.find((c) => c.id === id);
  document.getElementById("nombre-a-eliminar").textContent = cat.nombre;
  document.getElementById("modal-eliminar").classList.remove("hidden");
}

function cerrarModalEliminar() {
  document.getElementById("modal-eliminar").classList.add("hidden");
  idEliminar = null;
}

function confirmarEliminar() {
  categorias = categorias.filter((c) => c.id !== idEliminar);
  cerrarModalEliminar();
  renderTabla(categorias);
  mostrarToast("Categoría eliminada");
}

// ---- TOAST ----
function mostrarToast(msg) {
  const toast = document.getElementById("toast");
  document.getElementById("toast-msg").textContent = msg;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 3000);
}

// Cerrar modales con Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    cerrarModal();
    cerrarModalEliminar();
  }
});

// Inicio
renderTabla(categorias);
