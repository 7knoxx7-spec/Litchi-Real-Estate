import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProperties = async (filters: any = {}) => {
  const params = new URLSearchParams();
  if (filters.minPrice) params.append("minPrice", filters.minPrice);
  if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
  if (filters.type) params.append("type", filters.type);
  if (filters.bedrooms) params.append("bedrooms", filters.bedrooms);
  if (filters.location) params.append("location", filters.location);

  const response = await api.get(`/properties?${params.toString()}`);
  return response.data;
};

export const getProperty = async (id: string) => {
  const response = await api.get(`/properties/${id}`);
  return response.data;
};

export const login = async (credentials: any) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const register = async (data: any) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export default api;
