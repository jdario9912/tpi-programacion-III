import type { User } from "../../api/users/users.types";
import { initHeader } from "../../components/header";
import { headerCliente } from "../../components/header-cliente";
import { productsService } from "../../services/products.service";
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
});

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const producto = await productsService.getById(Number(id));
let cantidad = 1;

const contenido = document.getElementById("contenido") as HTMLDivElement;
if (!producto) {
  contenido.innerHTML = `
        <div class="flex flex-col items-center justify-center py-24 text-center">
          <p class="text-gray-400 mb-4">Producto no encontrado</p>
          <a href="catalogo.html" class="text-sm text-indigo-600 hover:underline">Volver al catálogo</a>
        </div>`;
} else {
  contenido.innerHTML = `
        <!-- Breadcrumb -->
        <div class="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <a href="catalogo.html" class="hover:text-indigo-600 transition-colors">Catálogo</a>
          <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
          <span class="text-indigo-600">${producto.categoria.nombre}</span>
          <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
          <span class="text-gray-600 capitalize">${producto.nombre}</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

          <!-- Imagen -->
          <div class="rounded-2xl overflow-hidden bg-white border border-gray-200 aspect-square">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="w-full h-full object-cover"/>
          </div>

          <!-- Info -->
          <div class="flex flex-col gap-5">
            <div>
              <span class="text-xs text-indigo-600 font-medium">${producto.categoria.nombre}</span>
              <h1 class="text-2xl font-medium text-gray-900 mt-1 capitalize">${producto.nombre}</h1>
            </div>

            <div class="flex items-center gap-3">
              <span class="text-3xl font-medium text-gray-900">${producto.precio}</span>
              <span class="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full border
                ${producto.disponible ? "bg-teal-50 text-teal-700 border-teal-200" : "bg-red-50 text-red-500 border-red-200"}">
                <span class="w-1.5 h-1.5 rounded-full ${producto.disponible ? "bg-teal-500" : "bg-red-400"}"></span>
                ${producto.disponible ? "Disponible" : "No disponible"}
              </span>
            </div>

            <p class="text-sm text-gray-500 leading-relaxed capitalize">${producto.descripcion}</p>

            ${
              producto.stock > 0
                ? `
            <div>
              <p class="text-xs font-medium text-gray-600 mb-2">Cantidad</p>
              <div class="flex items-center gap-3">
                <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                  <button id="btn-menos"
                    class="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4"/></svg>
                  </button>
                  <span id="cantidad-display" class="w-10 text-center text-sm font-medium text-gray-900">1</span>
                  <button id="btn-mas"
                    class="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
                  </button>
                </div>
                <span class="text-xs text-gray-400">${producto.stock} disponibles</span>
              </div>
            </div>

            <!-- Total parcial -->
            <p class="text-xs text-gray-400">Total: <span id="total-parcial" class="font-medium text-gray-700">${producto.precio}</span></p>

            <!-- Botones -->
            <div class="flex flex-col gap-2 mt-1">
              <button id="btn-carrito"
                ${!producto.disponible ? "disabled" : ""}                class="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-3 rounded-xl transition-colors disabled:bg-gray-500">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z"/>
                </svg>
                Agregar al carrito
              </button>
              <a href="home.html"
                class="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium py-3 rounded-xl transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
                Volver al catálogo
              </a>
            </div>
            `
                : `
            <div class="flex flex-col gap-2">
              <p class="text-sm text-red-400 bg-red-50 border border-red-200 rounded-lg px-4 py-3">Este producto no tiene stock disponible.</p>
              <a href="catalogo.html"
                class="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium py-3 rounded-xl transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
                Volver al catálogo
              </a>
            </div>
            `
            }
          </div>
        </div>
      `;
}

const carritoBadge = document.getElementById(
  "carrito-badge",
) as HTMLSpanElement;
const cartCount = cartRepository.getCount();
if (cartCount > 0) {
  carritoBadge.classList.remove("hidden");
  carritoBadge.textContent = String(cartCount);
}

if (producto.stock > 0) {
  const display = document.getElementById(
    "cantidad-display",
  ) as HTMLSpanElement;
  const total = document.getElementById(
    "total-parcial",
  ) as HTMLParagraphElement;

  const btnMenos = document.getElementById("btn-menos") as HTMLButtonElement;
  btnMenos.addEventListener("click", () => {
    if (cantidad > 1) {
      cartRepository.update(producto.id, { cantidad: cantidad - 1 });
      cantidad--;
      display.textContent = String(cantidad);
      total.textContent = String(cantidad);
    }
  });

  const btnMas = document.getElementById("btn-mas") as HTMLButtonElement;
  btnMas.addEventListener("click", () => {
    if (cantidad < producto.stock) {
      cartRepository.update(producto.id, { cantidad: cantidad + 1 });
      cantidad++;
      display.textContent = String(cantidad);
      total.textContent = String(producto.precio * cantidad);
    }
  });

  const btnCarrito = document.getElementById(
    "btn-carrito",
  ) as HTMLButtonElement;
  btnCarrito.addEventListener("click", () => {
    cartRepository.add({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: cantidad,
      categoria: producto.categoria.nombre,
    });

    carritoBadge.textContent = String(cartRepository.getCount());

    btnCarrito.textContent = "✓ Agregado";
    btnCarrito.classList.replace("bg-indigo-600", "bg-teal-600");
    btnCarrito.classList.replace("hover:bg-indigo-700", "hover:bg-teal-700");
    setTimeout(() => {
      btnCarrito.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z"/></svg> Agregar al carrito`;
      btnCarrito.classList.replace("bg-teal-600", "bg-indigo-600");
      btnCarrito.classList.replace("hover:bg-teal-700", "hover:bg-indigo-700");
    }, 1500);
  });
}
