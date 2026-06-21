import { defineConfig } from "vite";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        //d:aplicaion/dist/
        index: resolve(root, "index.html"),
        login: resolve(root, "src/pages/auth/login/login.html"),
        registro: resolve(root, "src/pages/auth/registro/registro.html"),
        adminHome: resolve(root, "src/pages/admin/home.html"),
        clientHome: resolve(root, "src/pages/client/home.html"),
        productos: resolve(root, "src/pages/admin/productos.html"),
        pedidos: resolve(root, "src/pages/admin/pedidos.html"),
        categorias: resolve(root, "src/pages/admin/categorias.html"),
      },
    },
  },
  base: "./",
  plugins: [tailwindcss()],
});
