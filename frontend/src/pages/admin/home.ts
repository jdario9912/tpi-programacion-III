import type { User } from "../../api/users/users.types";
import { asideBarContainer } from "../../components/aside-bar";
import { headerContainer, initHeader } from "../../components/header";
import { categoriesService } from "../../services/categories.service";
import { ordersService } from "../../services/orders.service";
import { productsService } from "../../services/products.service";
import { loginPath } from "../../utils/const";
import { getUSer, removeUser } from "../../utils/localStorage";
import { navigate } from "../../utils/navigate";

const user = getUSer();
const parsedUser = JSON.parse(user!) as User;
if (parsedUser.rol !== "ADMIN") {
  removeUser();
  navigate(loginPath);
}

document.addEventListener("DOMContentLoaded", async () => {
  const mainLayout = document.getElementById("main-layout") as HTMLDivElement;
  mainLayout.prepend(headerContainer(parsedUser.nombre));
  const secondaryLayout = document.getElementById(
    "secondary-layout",
  ) as HTMLDivElement;
  secondaryLayout.prepend(asideBarContainer);

  initHeader();
  const catAct = await categoriesService.getAll();
  const categoriasActivasCount = document.getElementById(
    "categorias-activas-count",
  ) as HTMLParagraphElement;
  categoriasActivasCount.textContent = catAct.length.toString();

  const prodReg = await productsService.getAll();
  const productosRegistradosCount = document.getElementById(
    "productos-registrados-count",
  ) as HTMLParagraphElement;
  productosRegistradosCount.textContent = prodReg.length.toString();

  const pedPend = await ordersService.getAll();
  const pedidosPendientesCount = document.getElementById(
    "pedidos-pendientes-count",
  ) as HTMLParagraphElement;
  pedidosPendientesCount.textContent = pedPend
    .map((pro) => pro.estado == "PENDIENTE")
    .length.toString();

  const prodDisp = await productsService.getAll();
  const productosDisponiblesCount = document.getElementById(
    "productos-disponibles-count",
  ) as HTMLParagraphElement;
  productosDisponiblesCount.textContent = prodDisp
    .map((pro) => pro.disponible)
    .length.toString();
});
