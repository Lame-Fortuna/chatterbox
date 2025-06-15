import axios from "axios";

const baseURL = import.meta.env.MODE === "development"
    ? "http://localhost:9090/api"
    : "/api";

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,        // to send cookies
});