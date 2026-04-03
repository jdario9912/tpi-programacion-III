import { defineConfig } from "vite";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        //d:aplicaion/dist/
        index: resolve(root, "index.html"),
        login: resolve(root, "src/pages/auth/login/login.html"),
        registro: resolve(root, "src/pages/auth/registro/registro.html"),
        adminHome: resolve(root, "src/pages/admin/home/home.html"),
        clientHome: resolve(root, "src/pages/client/home/home.html"),
      },
    },
  },
  base: "./",
});
