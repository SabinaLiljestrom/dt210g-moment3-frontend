import axios from "axios";
import { Post } from "../types/blog";


const api = axios.create({
  baseURL: "http://localhost:3018",
  headers: { "Content-Type": "application/json" },
});

/* ----------  Token  ---------- */
const TOKEN_KEY = "blog_token";

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
const getToken = () => localStorage.getItem(TOKEN_KEY);
const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  delete api.defaults.headers.common["Authorization"];
};

/*  Sätt ev. sparad token när appen laddas  */
const existing = getToken();
if (existing) setToken(existing);

/* ----------  AUTH-endpoint  ---------- */
export const login = async (username: string, password: string) => {
  const res = await api.post<{ token: string }>("/login", { username, password });
  setToken(res.data.token);               // spara & lägg i headers
};

/* ----------  BLOGG-endpoints  ---------- */
export const fetchPosts = async (): Promise<Post[]> => {
  const res = await api.get<Post[]>("/posts");
  return res.data;
};

export default api;
