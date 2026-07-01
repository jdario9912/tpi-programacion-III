export const headerCliente = (user: string) => {
  const div = document.createElement("div") as HTMLDivElement;

  div.innerHTML = `
    <header
      class="bg-white border-b border-gray-200 px-6 h-14 flex items-center justify-between sticky top-0 z-10"
    >
      <a class="flex items-center gap-3" href="home.html">
        <div
          class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center"
        >
          <svg
              class="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
          >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 5C8 3.5 16 3.5 20 5L12 21L4 5Z"
              />
              <circle cx="10" cy="9" r="1" />
              <circle cx="14" cy="11" r="1" />
              <circle cx="12" cy="7" r="1" />
          </svg>

        </div>
        <span class="text-sm font-medium text-gray-900">Food Store</span>
      </a>
      <div class="flex items-center gap-x-4">
        <div>${user}</div>
        <a href="home.html" class="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Inicio</a>
        <a href="pedidos.html" class="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Mis pedidos</a>
        <a
          href="carrito.html"
          class="relative flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z"
            />
          </svg>
          <span
            id="carrito-badge"
            class="hidden absolute -top-2.5 -right-2.5 size-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center"
            >mocorala</span
          >
        </a>
        <button
          class="text-sm text-red-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-red-50 flex items-center gap-1.5 transition-colors"
          id="logoutButton"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
            />
          </svg>
          Cerrar sesión
        </button>
      </div>
    </header>
  `;
  return div;
};
