const get = <T>(key: string): T | null => {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

const set = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

const remove = (key: string): void => {
  localStorage.removeItem(key);
};

const clear = (): void => {
  localStorage.clear();
};

export const storage = { get, set, remove, clear };
