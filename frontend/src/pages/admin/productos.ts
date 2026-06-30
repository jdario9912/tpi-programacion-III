import type { Product } from "../../api/products/products.types";
import type { User } from "../../api/users/users.types";
import { asideBarContainer } from "../../components/aside-bar";
import { FormDialog } from "../../components/form-dialog";
import { headerContainer, initHeader } from "../../components/header";
import { categoriesService } from "../../services/categories.service";
import { productsService } from "../../services/products.service";
import { loginPath } from "../../utils/const";
import { getUSer, removeUser } from "../../utils/localStorage";
import { navigate } from "../../utils/navigate";
import { ModalDialog } from "../../components/modal-dialog";

const user = getUSer();
const parsedUser = JSON.parse(user!) as User;
if (parsedUser.rol !== "ADMIN") {
  removeUser();
  navigate(loginPath);
}

interface ProductoForm {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  disponible: string;
  imagen: string;
}

let productos: Product[];

document.addEventListener("DOMContentLoaded", () => {
  const mainLayout = document.getElementById("main-layout") as HTMLDivElement;
  mainLayout.prepend(headerContainer(parsedUser.nombre));
  const secondaryLayout = document.getElementById(
    "secondary-layout",
  ) as HTMLDivElement;
  secondaryLayout.prepend(asideBarContainer);

  initHeader();

  const dialogProducto = document.getElementById(
    "modal-crear-producto",
  ) as HTMLDialogElement;
  const btnModalProducto = document.getElementById(
    "btn-crear-producto",
  ) as HTMLButtonElement;

  const crearProductoDialog = new FormDialog<ProductoForm>(dialogProducto, {
    onSubmit: async (data) => {
      try {
        await productsService.create({
          ...data,
          idCategoria: data.categoria,
          disponible: data.disponible === "on" ? true : false,
          descripcion: data.descripcion,
        });
        await cargarProductos();
        crearProductoDialog.close();
      } catch (error) {
        console.log(error);
      }
    },
  });

  btnModalProducto.addEventListener("click", () => {
    crearProductoDialog.open();
  });
});

const categorias = await categoriesService.getAll();
await cargarProductos();

const selectCategorias = document.getElementById(
  "producto-categoria",
) as HTMLSelectElement;
categorias.forEach((cat) => {
  const itemCategoria = document.createElement("option");
  itemCategoria.value = String(cat.id);
  itemCategoria.classList.add("capitalize");
  itemCategoria.label = cat.nombre;
  selectCategorias.appendChild(itemCategoria);
});

function render(lista: Product[]) {
  const estadoConfig = {
    disponible: {
      label: "Disponible",
      cls: "bg-teal-50 text-teal-700 border-teal-200",
      dot: "bg-teal-500",
    },
    no_disponible: {
      label: "No disponible",
      cls: "bg-amber-50 text-amber-700 border-amber-200",
      dot: "bg-amber-500",
    },
  };

  const tbody = document.getElementById("tabla-body") as HTMLTableElement;
  const vacio = document.getElementById("estado-vacio") as HTMLDivElement;
  const cnt = document.getElementById("contador") as HTMLParagraphElement;

  if (!lista.length) {
    tbody.innerHTML = "";
    vacio.classList.remove("hidden");
    cnt.textContent = "";
    return;
  }

  vacio.classList.add("hidden");
  cnt.textContent = `${lista.length} producto${lista.length !== 1 ? "s" : ""} encontrado${lista.length !== 1 ? "s" : ""}`;
  tbody.innerHTML = lista
    .map((p) => {
      const e = estadoConfig[p.disponible ? "disponible" : "no_disponible"];
      return `
        <tr class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
          <td class="px-5 py-3.5 text-gray-400">${p.id}</td>
          <td class="px-5 py-3.5">
            <p class="font-medium text-gray-800 capitalize">${p.nombre}</p>
          </td>
          <td class="px-5 py-3.5 text-gray-500 max-w-36 text-nowrap overflow-hidden capitalize">${p.descripcion}</td>
          <td class="px-5 py-3.5 text-gray-500 capitalize">${p.categoria.nombre || "—"}</td>
          <td class="px-5 py-3.5 font-medium text-gray-800">${p.precio}</td>
          <td class="px-5 py-3.5 text-gray-600">${p.stock}</td>
          <td class="px-5 py-3.5">
            <span class="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${e.cls}">
              <span class="w-1.5 h-1.5 rounded-full ${e.dot}"></span>${e.label}
            </span>
          </td>
          <td class="px-5 py-3.5">
            <div class="flex items-center justify-end gap-1">
              <button data-action="editar" data-id="${p.id}" title="Editar" class="p-1.5 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button  data-action="eliminar" data-id="${p.id}" title="Eliminar" class="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M3 7h18"/></svg>
              </button>
            </div>
          </td>
        </tr>`;
    })
    .join("");
}

async function cargarProductos(): Promise<void> {
  productos = await productsService.getAll();
  render(productos);
}

let productoEditandoId: number | null = null;

const dialogEditProducto = document.getElementById(
  "modal-editar-producto",
) as HTMLDialogElement;

const editarProductoModal = new FormDialog<ProductoForm>(dialogEditProducto, {
  onSubmit: async (data) => {
    if (productoEditandoId === null) return;
    try {
      await productsService.update(productoEditandoId, {
        ...data,
        disponible: data.disponible == "on" ? true : false,
        idCategoria: data.categoria,
        descripcion: data.descripcion,
      });
      editarProductoModal.close();
      await cargarProductos();
    } catch (error) {
      console.log(error);
    }
  },
});

const selectCategoriasEditar = document.getElementById(
  "producto-categoria-editar",
) as HTMLSelectElement;
categorias.forEach((cat) => {
  const itemCategoria = document.createElement("option");
  itemCategoria.value = String(cat.id);
  itemCategoria.label = cat.nombre;
  selectCategoriasEditar.appendChild(itemCategoria);
});

function abrirModalEditar(id: number): void {
  const producto = productos.find((c) => c.id === id);
  if (!producto) {
    console.error(`Producto ${id} no encontrado`);
    return;
  }
  productoEditandoId = id;
  editarProductoModal.open({
    nombre: producto.nombre,
    descripcion: producto.descripcion ?? "",
    precio: JSON.stringify(producto.precio),
    stock: JSON.stringify(producto.stock),
    imagen: producto.imagen,
    idCategoria: JSON.stringify(producto.categoria.id),
    disponible: producto.disponible,
  });
}

const dialogEliminarProducto = document.getElementById(
  "modal-eliminar-producto",
) as HTMLDialogElement;
const btnConfirmarEliminar = document.getElementById(
  "btn-confirmar-eliminar",
) as HTMLButtonElement;
const nombreCategoriaEliminar = document.getElementById(
  "nombre-producto-eliminar",
) as HTMLSpanElement;

let productoEliminarId: number | null = null;

const eliminarProductoModal = new ModalDialog(dialogEliminarProducto);

btnConfirmarEliminar.addEventListener("click", async () => {
  if (productoEliminarId === null) return;

  try {
    await productsService.delete(productoEliminarId);
    eliminarProductoModal.close();
    await cargarProductos();
  } catch (error) {
    console.log({ error });
  }
});

function abrirModalEliminar(id: number): void {
  const producto = productos.find((c) => c.id === id);
  if (!producto) {
    console.error(`Producto ${id} no encontrado`);
    return;
  }

  productoEliminarId = id;
  nombreCategoriaEliminar.textContent = producto.nombre;
  eliminarProductoModal.open();
}

function initTablaListeners(): void {
  const tbody = document.getElementById(
    "tabla-body",
  ) as HTMLTableSectionElement;

  tbody.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const btn = target.closest<HTMLButtonElement>("button[data-action]");
    if (!btn) return;

    const idAttr = btn.dataset.id;
    if (!idAttr) return;

    const id = Number(idAttr);
    if (Number.isNaN(id)) return;

    switch (btn.dataset.action) {
      case "editar":
        abrirModalEditar(id);
        break;
      case "eliminar":
        abrirModalEliminar(id);
        break;
    }
  });
}

initTablaListeners();

const filtroCategoria = document.getElementById(
  "filtro-categoria",
) as HTMLSelectElement;
categorias.forEach((cat) => {
  const itemCategoria = document.createElement("option");
  itemCategoria.value = String(cat.id);
  itemCategoria.label = cat.nombre;
  itemCategoria.classList.add("capitalize");
  filtroCategoria.appendChild(itemCategoria);
});

filtroCategoria.addEventListener("change", async () => {
  const categoriaId = filtroCategoria.value;
  await cargarProductosPorCategoria(categoriaId);
});

async function cargarProductosPorCategoria(categoriaId: string) {
  if (categoriaId === "") {
    await cargarProductos();
  } else {
    productos = await productsService.getByCategoryId(Number(categoriaId));
    render(productos);
  }
}
