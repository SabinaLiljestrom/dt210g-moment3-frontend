import axios from "axios";
import { Post } from "../types/blog";

const api = axios.create({
  baseURL: "http://localhost:3018",
  headers: { "Content-Type": "application/json" },
});

/* ---------- Token‑hjälp ---------- */
const TOKEN_KEY = "blog_token";

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  delete api.defaults.headers.common["Authorization"];
};

const existing = getToken();
if (existing) setToken(existing);

/* ---------- AUTH ---------- */
export const login = async (username: string, password: string): Promise<string> => {
  const res = await api.post<{ token: string }>("/login", { username, password });
  setToken(res.data.token);
  return res.data.token; // returnera token till AuthContext
};

/* ---------- BLOGG ---------- */
export const fetchPosts = async (): Promise<Post[]> => {
  const res = await api.get<Post[]>("/posts");
  return res.data;
};

export const fetchPostById = async (id: string): Promise<Post> => {
  const res = await api.get<Post>(`/posts/${id}`);
  return res.data;
};

export const createPost = async (data: { title: string; content: string }): Promise<Post> => {
  const res = await api.post<Post>("/posts", data);
  return res.data;
};

export const updatePost = async (id: string, data: Partial<{ title: string; content: string }>): Promise<Post> => {
  const res = await api.put<Post>(`/posts/${id}`, data);
  return res.data;
};

export const deletePost = async (id: string) => {
  await api.delete(`/posts/${id}`);
};

export default api;
