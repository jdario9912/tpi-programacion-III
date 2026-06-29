import type { User } from "../../api/users/users.types";
import { loginPath } from "../../utils/const";
import { getUSer, removeUser } from "../../utils/localStorage";
import { navigate } from "../../utils/navigate";
import type { Product } from "../../api/products/products.types";
import { initHeader } from "../../components/header";
import { headerCliente } from "../../components/header-cliente";
import { categoriesService } from "../../services/categories.service";
import { productsService } from "../../services/products.service";
import type { Category } from "../../api/categories/categories.types";

const user = getUSer();
const parsedUser = JSON.parse(user!) as User;
if (parsedUser.rol !== "USUARIO") {
  removeUser();
  navigate(loginPath);
}

let productos: Product[] = [];
let categorias: Category[] = [];

function renderProductos(lista: Product[]) {
  const grid = document.getElementById("grid-productos") as HTMLDivElement;
  const vacio = document.getElementById("estado-vacio") as HTMLDivElement;
  const contador = document.getElementById("contador") as HTMLParagraphElement;
  contador.textContent = `${lista.length} producto${lista.length !== 1 ? "s" : ""}`;
  if (!lista.length) {
    grid.innerHTML = "";
    vacio.classList.remove("hidden");
    return;
  }
  vacio.classList.add("hidden");
  grid.innerHTML = lista
    .map(
      (p) => `
        <a href="producto.html?id=${p.id}"
          class="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col">
          <div class="aspect-video overflow-hidden bg-gray-100">
            <img src="${p.imagen}" alt="${p.nombre}" class="w-full h-full object-cover"/>
          </div>
          <div class="p-4 flex flex-col gap-2 flex-1">
            <span class="text-xs text-indigo-600 font-medium capitalize">${p.categoria.nombre}</span>
            <h3 class="text-sm font-medium text-gray-900 leading-snug capitalize">${p.nombre}</h3>
            <p class="text-xs text-gray-400 line-clamp-2 flex-1 capitalize">${p.descripcion}</p>
            <div class="flex items-center justify-between mt-1">
              <span class="text-base font-medium text-gray-900">${p.precio}</span>
              <span class="text-xs px-2 py-0.5 rounded-full font-medium ${p.stock > 0 ? "bg-teal-50 text-teal-700" : "bg-red-50 text-red-500"}">
                ${p.stock > 0 ? `${p.stock} en stock` : "Sin stock"}
              </span>
            </div>
          </div>
        </a>
      `,
    )
    .join("");
}

async function cargarProductos() {
  productos = await productsService.getAll();
  renderProductos(productos);
}

async function cargarCategorias() {
  categorias = await categoriesService.getAll();
}

async function cargarProductosPorCategoria(categoriaId: string) {
  if (categoriaId === "") {
    await cargarProductos();
  } else {
    productos = await productsService.getByCategoryId(Number(categoriaId));
    renderProductos(productos);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const mainLayout = document.getElementById("main-layout") as HTMLDivElement;
  mainLayout.prepend(headerCliente(parsedUser.nombre));
  initHeader();
});

await cargarCategorias();
await cargarProductos();

const containerCategorias = document.getElementById(
  "sidebar-categorias",
) as HTMLSelectElement;
categorias.forEach((cat) => {
  const containerCategoria = document.createElement("div") as HTMLDivElement;
  containerCategoria.innerHTML = `<button id="cat-${cat.id}">${cat.nombre}</button>`;
  const boton = containerCategoria.querySelector("button") as HTMLButtonElement;
  boton.addEventListener("click", async () => {
    await cargarProductosPorCategoria(String(cat.id));
  });

  containerCategorias.appendChild(containerCategoria);
});

const buscador = document.getElementById("buscador") as HTMLInputElement;
const formBuscador = document.getElementById(
  "form-buscador",
) as HTMLFormElement;
formBuscador.addEventListener("submit", async (e) => {
  e.preventDefault();
  productos = await productsService.getAll(
    buscador.value != "" ? buscador.value : undefined,
  );
  renderProductos(productos);
});

const verTodos = document.getElementById(
  "ver-productos-todos",
) as HTMLInputElement;
verTodos.addEventListener("click", async () => {
  await cargarProductos();
});
