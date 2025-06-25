
import axios from "axios";
import { Post } from "../types/blog";


const api = axios.create({
  baseURL: "http://localhost:3018",
  headers: { "Content-Type": "application/json" },
});


export const fetchPosts = async (): Promise<Post[]> => {
  const res = await api.get<Post[]>("/posts");
  return res.data;
};

export default api;
