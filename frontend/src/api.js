import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9000/api",
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

export const searchQuery = (q, token) =>
  API.get(`/search?q=${q}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getHistory = (token) =>
  API.get("/search/history", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getSuggestions = (q) =>
  API.get(`/search/suggest?q=${q}`);
