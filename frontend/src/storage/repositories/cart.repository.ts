import { storage } from "../storage";
import type { ProductCartItem } from "./cart.types";

const KEY = "cart";

const getAll = (): ProductCartItem[] =>
  storage.get<ProductCartItem[]>(KEY) ?? [];

const add = (item: ProductCartItem): void => {
  remove(item.id);
  const items = getAll();
  storage.set(KEY, [...items, item]);
};

const update = (id: number, changes: Partial<ProductCartItem>): void => {
  const updated = getAll().map((i) => (i.id == id ? { ...i, ...changes } : i));
  storage.set(KEY, updated);
};

const remove = (id: number): void => {
  storage.set(
    KEY,
    getAll().filter((i) => i.id !== id),
  );
};

const getCount = (): number => getAll().length;

const getById = (id: number): ProductCartItem | undefined =>
  getAll().find((i) => i.id === id);

const clear = (): void => storage.remove(KEY);

export const cartRepository = {
  getAll,
  add,
  update,
  remove,
  clear,
  getCount,
  getById,
};
