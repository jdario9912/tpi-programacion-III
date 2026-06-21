import { logout } from "../utils/auth";

export const headerContainer = document.createElement("div") as HTMLDivElement;
headerContainer.innerHTML = `
  <header
      class="flex items-center justify-between px-6 h-14 bg-white border-b border-gray-200 shrink-0"
  >
      <div class="flex items-center gap-3">
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
                      d="M3 9l1-5h16l1 5M3 9h18M3 9v11a1 1 0 001 1h4v-5h8v5h4a1 1 0 001-1V9"
                  />
              </svg>
          </div>
          <div>
              <p
                  class="text-sm font-medium text-gray-900 leading-none"
              >
                  MiComercio
              </p>
              <p class="text-xs text-gray-400 mt-0.5">
                  Panel de control
              </p>
          </div>
      </div>

      <div class="flex items-center gap-3">
          <span class="text-sm text-indigo-600 hover:underline flex items-center gap-1">
              Usuario
          </span>
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

export function initHeader() {
  const logoutButton = document.getElementById(
    "logoutButton",
  ) as HTMLButtonElement;
  logoutButton?.addEventListener("click", () => {
    logout();
  });
}
