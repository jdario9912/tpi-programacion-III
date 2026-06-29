import type { Category } from "../../api/categories/categories.types";
import type { User } from "../../api/users/users.types";
import { asideBarContainer } from "../../components/aside-bar";
import { FormDialog } from "../../components/form-dialog";
import { headerContainer, initHeader } from "../../components/header";
import { ModalDialog } from "../../components/modal-dialog";
import { categoriesService } from "../../services/categories.service";
import { loginPath } from "../../utils/const";
import { getUSer, removeUser } from "../../utils/localStorage";
import { navigate } from "../../utils/navigate";

const user = getUSer();
const parsedUser = JSON.parse(user!) as User;
if (parsedUser.rol !== "ADMIN") {
  removeUser();
  navigate(loginPath);
}

let categorias: Category[];

interface CategoriaForm {
  nombre: string;
  descripcion?: string;
}

document.addEventListener("DOMContentLoaded", async () => {
  const mainLayout = document.getElementById("main-layout") as HTMLDivElement;
  mainLayout.prepend(headerContainer(parsedUser.nombre));
  const secondaryLayout = document.getElementById(
    "secondary-layout",
  ) as HTMLDivElement;
  secondaryLayout.prepend(asideBarContainer);

  initHeader();

  const dialogCategoria = document.getElementById(
    "modal-crear-categoria",
  ) as HTMLDialogElement;
  const btnModalCategoria = document.getElementById(
    "btn-categoria",
  ) as HTMLButtonElement;

  const crearCategoriaDialog = new FormDialog<CategoriaForm>(dialogCategoria, {
    onSubmit: async (data) => {
      await categoriesService.create(data);
      crearCategoriaDialog.close();
      await cargarCategorias();
    },
  });

  btnModalCategoria.addEventListener("click", () => {
    crearCategoriaDialog.open();
  });
});

categorias = await categoriesService.getAll();

function renderTabla(categorias: Category[]) {
  const tbody = document.getElementById("tabla-body");
  const vacio = document.getElementById("estado-vacio");
  const contador = document.getElementById("contador");

  if (categorias.length === 0) {
    tbody.innerHTML = "";
    vacio.classList.remove("hidden");
    contador.textContent = "";
    return;
  }

  vacio.classList.add("hidden");
  contador.textContent = `${categorias.length} categoría${categorias.length !== 1 ? "s" : ""} encontrada${categorias.length !== 1 ? "s" : ""}`;

  tbody.innerHTML = categorias
    .map(
      (c) => `
          <tr class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
          <td class="px-5 py-3.5 font-medium text-gray-800 capitalize">${c.nombre}</td>
          <td class="px-5 py-3.5 text-gray-500 max-w-xs truncate first-letter:capitalize">${c.descripcion || "—"}</td>
          <td class="px-5 py-3.5">
          <div class="flex items-center justify-end gap-1">
            <button data-action="editar" data-id="${c.id}"
              title="Editar"
              class="p-1.5 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
            <button data-action="eliminar" data-id="${c.id}"
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

async function cargarCategorias(): Promise<void> {
  categorias = await categoriesService.getAll();
  renderTabla(categorias);
}

let categoriaEditandoId: number | null = null;

const dialogEditCategoria = document.getElementById(
  "modal-editar-categoria",
) as HTMLDialogElement;

const editarCategoriaModal = new FormDialog<CategoriaForm>(
  dialogEditCategoria,
  {
    onSubmit: async (data) => {
      if (categoriaEditandoId === null) return;
      await categoriesService.update(categoriaEditandoId, data);
      editarCategoriaModal.close();
      await cargarCategorias();
    },
  },
);

function abrirModalEditar(id: number): void {
  const categoria = categorias.find((c) => c.id === id);
  if (!categoria) {
    console.error(`Categoría ${id} no encontrada`);
    return;
  }
  categoriaEditandoId = id;
  editarCategoriaModal.open({
    nombre: categoria.nombre,
    descripcion: categoria.descripcion ?? "",
  });
}

const dialogEliminarCategoria = document.getElementById(
  "modal-eliminar-categoria",
) as HTMLDialogElement;
const btnConfirmarEliminar = document.getElementById(
  "btn-confirmar-eliminar",
) as HTMLButtonElement;
const nombreCategoriaEliminar = document.getElementById(
  "nombre-categoria-eliminar",
) as HTMLSpanElement;

let categoriaAEliminarId: number | null = null;

const eliminarCategoriaModal = new ModalDialog(dialogEliminarCategoria);

btnConfirmarEliminar.addEventListener("click", async () => {
  if (categoriaAEliminarId === null) return;

  try {
    categoriesService.delete(categoriaAEliminarId);
    eliminarCategoriaModal.close();
    await cargarCategorias();
  } catch (error) {
    console.log({ error });
  }
});

function abrirModalEliminar(id: number): void {
  const categoria = categorias.find((c) => c.id === id);
  if (!categoria) {
    console.error(`Categoría ${id} no encontrada`);
    return;
  }

  categoriaAEliminarId = id;
  nombreCategoriaEliminar.textContent = categoria.nombre;
  eliminarCategoriaModal.open();
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

renderTabla(categorias);
