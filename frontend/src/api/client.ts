const BASE_URL = import.meta.env.VITE_API_URL;

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { params, ...fetchOptions } = options;

  const url = new URL(`${BASE_URL}${endpoint}`);
  if (params)
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const response = await fetch(url.toString(), {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...fetchOptions.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message ?? `HTTP error ${response.status}`);
  }

  if (response.status === 204 || response.status === 205) return undefined as T;

  const text = await response.text();
  if (!text) return undefined as T;

  return JSON.parse(text) as Promise<T>;
}

export const apiClient = {
  get: <T>(url: string, options?: RequestOptions) =>
    request<T>(url, { ...options, method: "GET" }),

  post: <T>(url: string, body: unknown, options?: RequestOptions) =>
    request<T>(url, { ...options, method: "POST", body: JSON.stringify(body) }),

  put: <T>(url: string, body: unknown, options?: RequestOptions) =>
    request<T>(url, { ...options, method: "PUT", body: JSON.stringify(body) }),

  delete: <T>(url: string, options?: RequestOptions) =>
    request<T>(url, { ...options, method: "DELETE" }),
};
