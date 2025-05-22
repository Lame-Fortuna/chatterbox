import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:9090/api",
  withCredentials: true,        // to send cookies
});