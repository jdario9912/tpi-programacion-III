const claseActiva = "bg-indigo-50 text-indigo-700 font-medium";
const claseNormal =
  "text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-colors";

const links = [
  {
    href: "home.html",
    label: "Dashboard",
    path: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  },
  {
    href: "categorias.html",
    label: "Categorías",
    path: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a2 2 0 012-2z",
  },
  {
    href: "productos.html",
    label: "Productos",
    path: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10",
  },
  {
    href: "pedidos.html",
    label: "Pedidos",
    path: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  },
];

function esActivo(href: string): boolean {
  return window.location.pathname.endsWith(href);
}

function renderLinks(): string {
  return links
    .map(
      ({ href, label, path }) => `
      <a
        href="${href}"
        class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm ${esActivo(href) ? claseActiva : claseNormal}"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="${path}" />
        </svg>
        ${label}
    </a>
  `,
    )
    .join("");
}

export const asideBarContainer = document.createElement(
  "div",
) as HTMLDivElement;
asideBarContainer.innerHTML = `
  <nav class="h-full w-52 bg-white border-r border-gray-200 flex flex-col p-3 gap-1 shrink-0">
      <p class="text-xs font-medium text-gray-400 uppercase tracking-widest px-3 py-2">Menú</p>
      ${renderLinks()}
  </nav>
`;
